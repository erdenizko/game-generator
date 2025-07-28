
import React from 'react';
import { SlotItem } from '@/types/SlotItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { PencilIcon, XCircle, XIcon } from 'lucide-react';

interface SlotItemPreviewProps {
  item: SlotItem;
  onRemove: () => void;
  onEdit: () => void;
}

export function SlotItemPreview({ item, onRemove, onEdit }: SlotItemPreviewProps) {
  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-4">
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
        <div className='text-sm flex flex-col'>
          <strong className='text-base'>{item.name || 'Unnamed'}</strong>
          <p className="text-sm">Prob: {(item.probability * 100).toFixed(1)}%</p>
          <p className="text-sm">Rev: {item.revenue}</p>
          <p className="text-sm">Min Count: {item.minimumCount}</p>
          <p className="text-sm">Diagonal: {item.diagonalPrize ? 'Yes' : 'No'}</p>
        </div>
        <div className='flex flex-col gap-2 ml-auto'>
          <Button
            size="icon"
            type="button"
            variant="destructive"
            onClick={onRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            type="button"
            onClick={onRemove}
          >
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
