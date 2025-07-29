'use client';

import Image from 'next/image';
import {
  MoreHorizontal,
  Trash2,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { EditGameConfig } from '@/lib/types';
import { MarketplaceSettingsDialog } from '@/components/marketplace/marketplace-settings-dialog';

// Utility functions
const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

interface GameCardProps {
  game: EditGameConfig;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, publish: boolean) => void;
  onRemoveFromMarketplace?: (id: string) => void;
  onRefresh?: () => void;
}

export const GameCard = ({
  game,
  onDelete,
  onTogglePublish,
  onRemoveFromMarketplace,
  onRefresh,
}: GameCardProps) => {

  // drafts version
  const imageUrl = `https://placehold.co/400x600?text=${game.title}`;
  return (
    <Card className='p-0'>
      <CardHeader className='p-0 bg-transparent'>
        <Image onClick={() => window.location.href = `/games/${game.id}`} src={imageUrl} alt={game.title} width={400} height={600} className='w-full' />
      </CardHeader>
      <CardContent className='p-4 pt-60 text-white bg-gradient-to-b from-transparent via-black/60 to-black/80 absolute left-0 right-0 z-20 -translate-y-full'>
        <div className="flex justify-between items-start">
          <div onClick={() => window.location.href = `/games/${game.id}`}>
            <CardTitle className="text-base flex flex-row gap-4">{game.title}
              {game.isAvailableForSale && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  For Sale
                </Badge>
              )}
              {game.isFeatured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mb-4">
              Last updated: {formatDate(game.updatedAt)}
              {game.isAvailableForSale && game.marketplacePrice && (
                <span className="ml-2 font-semibold text-green-600">
                  ${game.marketplacePrice}
                </span>
              )}
            </CardDescription>
          </div>

          {game.id && <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onTogglePublish(game.id as string, !game.isPublished)}>
                  {game.isPublished ? 'Unpublish' : 'Publish'}
                </DropdownMenuItem>

                {onRefresh && <MarketplaceSettingsDialog
                  game={game}
                  onSettingsUpdate={onRefresh}
                />}

                {game.isAvailableForSale && onRemoveFromMarketplace && (
                  <DropdownMenuItem onClick={() => onRemoveFromMarketplace(game.id as string)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Remove from Marketplace
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onDelete(game.id as string)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
          }
        </div>
        <div className="space-y-1 text-sm" onClick={() => window.location.href = `/games/${game.id}`} >
          <div className="flex justify-between">
            <span>Columns</span>
            <span>{game.columns || 5}</span>
          </div>
          <div className="flex justify-between">
            <span>Rows</span>
            <span>{game.rows || 3}</span>
          </div>
          <div className="flex justify-between">
            <span>Slot Items</span>
            <span>{game.slotItems.length || 20}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};
