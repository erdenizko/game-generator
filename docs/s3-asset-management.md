# S3 Asset Management System

This document describes the S3 asset management system implemented for the Slot Game Builder platform.

## Overview

The asset management system provides secure file upload capabilities for game assets including images, audio files, and mascot graphics. It uses AWS S3 for storage with CloudFront for global content delivery.

## API Endpoints

### GET /api/s3/presign

Generates a presigned URL for secure file upload to S3.

**Authentication**: Required (Bearer token)

**Query Parameters**:
- `fileName` (string): Original filename
- `fileType` (string): MIME type (e.g., 'image/jpeg', 'audio/mp3')
- `fileSize` (number): File size in bytes
- `gameId` (string): UUID of the game
- `assetType` (string): Type of asset ('image', 'audio', 'mascot')

**Response**:
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://s3.amazonaws.com/...",
    "key": "games/game-id/image/timestamp_random_filename.jpg",
    "expiresIn": 900
  }
}
```

**Example Usage**:
```bash
curl -X GET "http://localhost:3001/api/s3/presign?fileName=logo.jpg&fileType=image/jpeg&fileSize=1024000&gameId=123e4567-e89b-12d3-a456-426614174000&assetType=image" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### POST /api/s3/confirm

Confirms successful upload and stores asset metadata in the database.

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "key": "games/game-id/image/timestamp_random_filename.jpg",
  "gameId": "123e4567-e89b-12d3-a456-426614174000",
  "assetType": "image",
  "fileName": "logo.jpg",
  "fileSize": 1024000,
  "mimeType": "image/jpeg"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "assetId": "asset-uuid",
    "key": "games/game-id/image/timestamp_random_filename.jpg",
    "type": "image",
    "createdAt": "2025-07-16T10:00:00.000Z"
  }
}
```

## File Type Validation

### Supported File Types

**Images** (max 5MB):
- image/jpeg
- image/jpg  
- image/png
- image/webp

**Audio** (max 10MB):
- audio/mpeg
- audio/mp3
- audio/wav
- audio/ogg

**Mascot** (max 5MB):
- image/jpeg
- image/jpg
- image/png
- image/webp

## Upload Workflow

1. **Request Presigned URL**: Call `/api/s3/presign` with file details
2. **Upload to S3**: Use the returned presigned URL to upload the file directly to S3
3. **Confirm Upload**: Call `/api/s3/confirm` to store metadata in the database

## Security Features

- **JWT Authentication**: All endpoints require valid authentication
- **File Type Validation**: Only allowed MIME types are accepted
- **File Size Limits**: Enforced per asset type
- **Game Ownership**: Users can only upload assets for their own games
- **Presigned URL Expiration**: URLs expire after 15 minutes
- **Public Read Access**: Assets are publicly accessible via CloudFront

## Error Handling

Common error responses:

- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Game not found or access denied
- `400 Bad Request`: Invalid file type, size exceeds limit, or validation errors
- `500 Internal Server Error`: S3 or database errors

## Environment Variables

Required environment variables:

```env
S3_BUCKET_NAME=your-bucket-name
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_S3_BUCKET_URL=https://your-bucket.s3.region.amazonaws.com
```

## Database Schema

Assets are stored in the `game_assets` table:

```sql
CREATE TABLE game_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'image', 'audio', 'mascot'
    s3_key VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## S3 Key Structure

Assets are organized in S3 with the following key structure:

```
games/{gameId}/{assetType}/{timestamp}_{randomSuffix}_{sanitizedFileName}
```

Example: `games/123e4567-e89b-12d3-a456-426614174000/image/1642345678901_abc123_logo.jpg`

## CDN Integration

All assets are served through CloudFront for optimal performance and global distribution. The public URL format is:

```
https://your-bucket.s3.region.amazonaws.com/{s3Key}
```