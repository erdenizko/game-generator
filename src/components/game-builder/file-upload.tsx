'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, File, ImageIcon, Music, Video, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image'

interface FileUploadProps {
  gameId: string;
  assetType: string;
  value?: string;
  onChange: (value: string) => void;
  accept?: string;
  maxSize?: number;
  description?: string;
  className?: string;
}

export function FileUpload({
  gameId,
  assetType,
  value,
  onChange,
  accept = '*/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  description,
  className
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Create FormData for server-side upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('gameId', gameId);
      formData.append('assetType', assetType);

      // Use XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        // Handle response
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              setUploadProgress(100);
              console.log('File uploaded successfully:', data.data.key);
              resolve(data.data.key);
            } catch (err) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              reject(new Error(errorData.error?.message || 'Upload failed'));
            } catch (err) {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        });

        // Handle errors
        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload was aborted'));
        });

        // Open and send request
        xhr.open('POST', '/api/s3/upload');
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
        xhr.send(formData);
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const key = await uploadFile(file);
      onChange(key);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => {
      acc[type.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    onChange('');
    setError(null);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return <ImageIcon className="h-8 w-8" />;
    }

    if (['mp3', 'wav', 'ogg', 'aac'].includes(extension || '')) {
      return <Music className="h-8 w-8" />;
    }

    if (['mp4', 'webm', 'avi', 'mov'].includes(extension || '')) {
      return <Video className="h-8 w-8" />;
    }

    return <File className="h-8 w-8" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileUrl = (key: string) => {
    // Use the S3 bucket URL from environment
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${key}`;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {!value ? (
        <Card
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed cursor-pointer transition-colors hover:border-primary/50',
            isDragActive && 'border-primary bg-primary/5',
            error && 'border-destructive',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
                {uploadProgress > 0 && (
                  <div className="w-full max-w-xs mt-2">
                    <div className="bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop file here' : 'Click to upload or drag and drop'}
                </p>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: {formatFileSize(maxSize)}
                </p>
              </>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(value)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {value.split('/').pop() || value}
                </p>
                <p className="text-xs text-muted-foreground">
                  Uploaded successfully
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Error display */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* File rejection errors */}
      {fileRejections.length > 0 && (
        <div className="space-y-1">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              {errors.map(error => (
                <p key={error.code} className="text-sm text-destructive">
                  {error.message}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}