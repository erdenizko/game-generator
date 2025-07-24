
import React from 'react';
import { SlotItem } from '@/types/SlotItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { XCircle } from 'lucide-react';

interface SlotItemPreviewProps {
  item: SlotItem;
  onRemove: () => void;
  onEdit: () => void;
}

export function SlotItemPreview({ item, onRemove, onEdit }: SlotItemPreviewProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-md mx-auto">{item.name || 'Unnamed'}</CardTitle>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
        >
          <XCircle className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2">
        {item.imageKey ? (
          <div className="relative w-24 h-24">
            <Image
              src={`https://d3e1z40c40c40c.cloudfront.net/${item.imageKey}`} // Assuming CloudFront URL
              alt={item.name || 'Slot Item'}
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md text-sm text-gray-500">
            No Image
          </div>
        )}
        <p className="text-sm">Prob: {(item.probability * 100).toFixed(1)}%</p>
        <p className="text-sm">Rev: {item.revenue}</p>
        <p className="text-sm">Min Count: {item.minimumCount}</p>
        <p className="text-sm">Diagonal: {item.diagonalPrize ? 'Yes' : 'No'}</p>
      </CardContent>
    </Card>
  );
}
