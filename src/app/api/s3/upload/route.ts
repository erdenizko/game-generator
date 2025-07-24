import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { verifyJWT } from '@/lib/auth';
import prisma from '@/lib/database';
import { validateFileSize, AssetType, generateAssetKey } from '@/lib/s3';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Request validation schema
const UploadRequestSchema = z.object({
  gameId: z.string().uuid(),
  assetType: z.enum(['image', 'audio', 'mascot']),
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

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const gameId = formData.get('gameId') as string;
    const assetType = formData.get('assetType') as string;

    if (!file) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'No file provided' } },
        { status: 400 }
      );
    }

    // Validate request data
    const validatedData = UploadRequestSchema.parse({
      gameId,
      assetType,
    });

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

    // Validate file size for the asset type
    if (!validateFileSize(file.size, validatedData.assetType as AssetType)) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'File size exceeds limit for this asset type' } },
        { status: 400 }
      );
    }

    // Generate unique S3 key
    const key = generateAssetKey(validatedData.gameId, validatedData.assetType as AssetType, file.name);

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        gameId: validatedData.gameId,
        assetType: validatedData.assetType,
        originalFileName: file.name,
      },
    });

    await s3Client.send(command);

    // Store asset metadata in database
    const gameAsset = await prisma.gameAsset.create({
      data: {
        gameId: validatedData.gameId,
        type: validatedData.assetType,
        s3Key: key,
        fileSize: file.size,
        mimeType: file.type,
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
    console.error('Error uploading file:', error);

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
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to upload file' } },
      { status: 500 }
    );
  }
} 