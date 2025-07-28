'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export type VisualAssetType = 'cover' | 'background' | 'frame';

interface CreateWithAIDialogProps {
  gameId: string;
  onAssetGenerated?: (assetType: VisualAssetType, key: string) => void;
  className?: string;
}

export function CreateWithAIDialog({ gameId, onAssetGenerated, className }: CreateWithAIDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [assetType, setAssetType] = useState<VisualAssetType>('background');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset internal state whenever the dialog closes
  const resetState = () => {
    setTheme('');
    setAssetType('background');
    setImageUrl(null);
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast({ title: 'Theme required', description: 'Please enter a theme before generating.' });
      return;
    }

    try {
      setIsGenerating(true);
      setImageUrl(null);

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
        body: JSON.stringify({ theme, assetType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate image');
      }

      setImageUrl(data.data.imageUrl as string);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({ title: 'Error', description: message });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseImage = async () => {
    if (!imageUrl) return;

    try {
      toast({ title: 'Uploading image…' });

      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const fileExtension = blob.type.split('/')[1] || 'png';
      const file = new File([blob], `ai-${assetType}-${Date.now()}.${fileExtension}`, { type: blob.type });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('gameId', gameId);
      formData.append('assetType', 'image');

      const uploadRes = await fetch('/api/s3/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || 'Failed to upload image');
      }

      if (onAssetGenerated) {
        onAssetGenerated(assetType, uploadData.data.key as string);
      }

      toast({ title: 'Image added', description: 'The generated image has been added to your game.' });
      setOpen(false);
      resetState();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({ title: 'Error', description: message });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          resetState();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className={cn('ml-auto', className)}>
          Create with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle>Create Visual Asset with AI</DialogTitle>
          <DialogDescription>
            Generate a high-quality visual asset using AI. You have 5 free generations per day.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label htmlFor="ai-theme">Theme</Label>
            <Input id="ai-theme" placeholder="e.g. Futuristic neon city" value={theme} onChange={(e) => setTheme(e.target.value)} />
          </div>

          {/* Asset type selection */}
          <div className="space-y-2">
            <Label>Asset Type</Label>
            <div className="flex gap-2">
              {(['cover', 'background', 'frame'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-sm font-medium capitalize transition-colors',
                    assetType === type ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white' : 'bg-slate-200 hover:bg-slate-300'
                  )}
                  onClick={() => setAssetType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Status & preview */}
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="size-4 animate-spin" /> Generating image…
            </div>
          )}

          {imageUrl && (
            <div className="flex flex-col items-center gap-4">
              <Image
                src={imageUrl}
                alt="Generated preview"
                width={400}
                height={400}
                className="rounded-md object-cover"
                unoptimized
              />
              <Button onClick={handleUseImage}>Use this image</Button>
            </div>
          )}
        </div>

        <DialogFooter>
          {!imageUrl && (
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating && <Loader2 className="size-4 animate-spin mr-2" />}Generate
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}