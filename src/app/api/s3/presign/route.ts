import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generatePresignedUploadUrl, validateFileSize, AssetType } from '@/lib/s3';
import { verifyJWT } from '@/lib/auth';
import prisma from '@/lib/database';

// Request validation schema
const PresignRequestSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileType: z.string().regex(/^(image|audio)\/(jpeg|jpg|png|webp|mpeg|mp3|wav|ogg)$/),
  fileSize: z.number().positive().max(10 * 1024 * 1024), // 10MB max
  gameId: z.string().uuid(),
  assetType: z.enum(['image', 'audio', 'mascot']),
});

export async function GET(request: NextRequest) {
  try {
    // Extract and verify JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header' } },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = await verifyJWT(token);
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } },
        { status: 401 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const requestData = {
      fileName: searchParams.get('fileName'),
      fileType: searchParams.get('fileType'),
      fileSize: parseInt(searchParams.get('fileSize') || '0'),
      gameId: searchParams.get('gameId'),
      assetType: searchParams.get('assetType'),
    };

    // Validate request data
    const validatedData = PresignRequestSchema.parse(requestData);

    // Verify user owns the game or has access to it
    const game = await prisma.game.findFirst({
      where: {
        id: validatedData.gameId,
        userId: user.id,
      },
    });

    if (!game) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Game not found or access denied' } },
        { status: 403 }
      );
    }

    // Validate file size for the asset type
    if (!validateFileSize(validatedData.fileSize, validatedData.assetType as AssetType)) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'File size exceeds limit for this asset type' } },
        { status: 400 }
      );
    }

    // Generate presigned URL
    const presignedUrl = await generatePresignedUploadUrl({
      fileName: validatedData.fileName,
      fileType: validatedData.fileType,
      gameId: validatedData.gameId,
      assetType: validatedData.assetType as AssetType,
    });

    return NextResponse.json({
      success: true,
      data: presignedUrl,
    });

  } catch (error) {
    console.error('Error generating presigned URL:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid request parameters',
            details: error.issues 
          } 
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Invalid file type')) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: error.message } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to generate presigned URL' } },
      { status: 500 }
    );
  }
}