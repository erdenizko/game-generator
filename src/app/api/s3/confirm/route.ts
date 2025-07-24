import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyJWT } from '@/lib/auth';
import prisma from '@/lib/database';


// Request validation schema for confirming upload
const ConfirmUploadSchema = z.object({
  key: z.string().min(1),
  gameId: z.string().uuid(),
  assetType: z.enum(['image', 'audio', 'mascot']),
  fileName: z.string().min(1).max(255),
  fileSize: z.number().positive(),
  mimeType: z.string().min(1),
});

export async function POST(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();
    const validatedData = ConfirmUploadSchema.parse(body);

    // Verify user owns the game
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

    // Store asset metadata in database
    const gameAsset = await prisma.gameAsset.create({
      data: {
        gameId: validatedData.gameId,
        type: validatedData.assetType,
        s3Key: validatedData.key,
        fileSize: validatedData.fileSize,
        mimeType: validatedData.mimeType,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        assetId: gameAsset.id,
        key: gameAsset.s3Key,
        type: gameAsset.type,
        createdAt: gameAsset.createdAt,
      },
    });

  } catch (error) {
    console.error('Error confirming asset upload:', error);

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

    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to store asset metadata' } },
      { status: 500 }
    );
  }
}