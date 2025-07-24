import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// File type validation
const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  audio: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
  mascot: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

// File size limits (in bytes)
const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  audio: 10 * 1024 * 1024, // 10MB
  mascot: 5 * 1024 * 1024, // 5MB
} as const;

export type AssetType = keyof typeof ALLOWED_FILE_TYPES;

export interface PresignedUrlRequest {
  fileType: string;
  fileName: string;
  gameId: string;
  assetType: AssetType;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  key: string;
  expiresIn: number;
}

export interface AssetMetadata {
  key: string;
  type: AssetType;
  mimeType: string;
  fileSize: number;
  gameId: string;
}

/**
 * Validates file type against allowed types for the asset category
 */
export function validateFileType(mimeType: string, assetType: AssetType): boolean {
  const allowedTypes = ALLOWED_FILE_TYPES[assetType];
  return (allowedTypes as readonly string[]).includes(mimeType);
}

/**
 * Validates file size against limits for the asset category
 */
export function validateFileSize(fileSize: number, assetType: AssetType): boolean {
  return fileSize <= FILE_SIZE_LIMITS[assetType];
}

/**
 * Generates a unique S3 key for the asset
 */
export function generateAssetKey(gameId: string, assetType: AssetType, fileName: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  return `games/${gameId}/${assetType}/${timestamp}_${randomSuffix}_${cleanFileName}`;
}

/**
 * Generates a presigned URL for S3 upload
 */
export async function generatePresignedUploadUrl(
  request: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  // Validate file type
  if (!validateFileType(request.fileType, request.assetType)) {
    throw new Error(`Invalid file type ${request.fileType} for asset type ${request.assetType}`);
  }

  // Generate unique S3 key
  const key = generateAssetKey(request.gameId, request.assetType, request.fileName);

  // Create the S3 command
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: request.fileType,
    // Add metadata
    Metadata: {
      gameId: request.gameId,
      assetType: request.assetType,
      originalFileName: request.fileName,
    },
  });

  // Generate presigned URL with 15-minute expiration
  const expiresIn = 15 * 60; // 15 minutes in seconds
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });

  return {
    uploadUrl,
    key,
    expiresIn,
  };
}

/**
 * Gets the public URL for an asset via CloudFront
 */
export function getAssetUrl(key: string): string {
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL!;
  return `${bucketUrl}/${key}`;
}

export { s3Client };