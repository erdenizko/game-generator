'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { GameConfig, PaginatedResponse } from '@/lib/types';
import {
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

// Constants
const ITEMS_PER_PAGE = 12;

// Utility functions
const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};



// Loading skeleton component
const GameCardSkeleton = () => (
  <Card className="bg-slate-100/50 border-slate-400/50">
    <CardHeader>
      {/* Image skeleton */}
      <div className="w-full aspect-[3/4] bg-slate-200 rounded-lg mb-4 animate-pulse"></div>

      {/* Title and description skeleton */}
      <div className="flex justify-between items-start -mt-8">
        <div className="flex-1">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Menu button skeleton */}
        <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
      </div>
    </CardHeader>
    <CardContent>
      {/* Stats skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-8 animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-12 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-6 animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-20 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-10 animate-pulse"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Header skeleton component
const HeaderSkeleton = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div className="flex flex-col">
      <div className="h-12 bg-slate-200 rounded w-64 mb-2 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded w-80 animate-pulse"></div>
    </div>
  </div>
);

// Controls skeleton component
const ControlsSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4 mb-6">
    <div className="flex-1">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-10 bg-slate-200 rounded pl-10 animate-pulse"></div>
      </div>
    </div>
    <div className="flex gap-2">
      <div className="flex flex-row gap-1">
        <div className="h-9 bg-slate-200 rounded w-32 animate-pulse"></div>
        <div className="h-9 bg-slate-200 rounded w-32 animate-pulse"></div>
        <div className="h-9 bg-slate-200 rounded w-24 animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Create New Game card skeleton
const CreateGameCardSkeleton = () => (
  <div className="text-center py-12 backdrop-blur-2xl mix-blend-color-burn bg-slate-400 border border-slate-800 rounded-lg flex flex-col items-center justify-center">
    <div className="w-32 h-32 bg-slate-200 rounded-full animate-pulse mb-4"></div>
    <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
  </div>
);

// Game card component
const GameCard = ({ game, onDelete, onTogglePublish }: {
  game: GameConfig;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, publish: boolean) => void;
}) => {
  return (
    <Card onClick={() => window.location.href = `/builder?gameId=${game.id}`}>
      <CardHeader>
        <Image src={`https://game-manager-dakik.s3.eu-north-1.amazonaws.com/${game.coverImageKey}` || 'https://placehold.co/600x400'} alt={game.title} width={100} height={100} className='w-full aspect-3/4 ' />
        <div className="flex justify-between items-start -mt-8">
          <div>
            <CardTitle className="flex flex-row gap-4">{game.title}</CardTitle>
            <CardDescription className="mt-2 mb-4">
              Last updated: {formatDate(game.updatedAt)}
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
                <DropdownMenuItem onClick={() => onDelete(game.id as string)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
          }
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
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
  );
};

// Main component
export default function GamesPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPages: 0,
  });
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.set('page', pagination.page.toString());
      searchParams.set('limit', pagination.limit.toString());
      searchParams.set('sortBy', sortBy);
      searchParams.set('sortOrder', sortOrder);
      searchParams.set('published', 'true');

      const response = await fetch(`/api/games?${searchParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data: PaginatedResponse<GameConfig> = await response.json();
      return data;
    }
  });

  const { toast } = useToast();

  // Handle delete
  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete game');
      }

      toast({
        title: 'Success',
        description: 'Game deleted successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['games'] });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to delete game',
      });
    }
  }, [queryClient, toast]);

  // Handle toggle publish
  const handleTogglePublish = useCallback(async (id: string, publish: boolean) => {
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ isPublished: publish }),
      });

      if (!response.ok) {
        throw new Error('Failed to update game');
      }

      toast({
        title: 'Success',
        description: `Game ${publish ? 'published' : 'unpublished'} successfully`,
      });

      queryClient.invalidateQueries({ queryKey: ['games'] });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update game',
      });
    }
  }, [queryClient, toast]);

  // Handle sort change
  const handleSortChange = useCallback((sort: string, order: 'asc' | 'desc') => {
    console.log('sort', sort);
    console.log('order', order);
    setSortBy(sort);
    setSortOrder(order);
    setPagination(prev => ({ ...prev, page: 1 }));
    queryClient.invalidateQueries({ queryKey: ['games'] });
  }, [queryClient]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <HeaderSkeleton />
              <ControlsSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                <CreateGameCardSkeleton />
                {Array.from({ length: 7 }).map((_, i) => (
                  <GameCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Render error state
  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
                <p className="text-slate-400 mb-4">{error instanceof Error ? error.message : 'Failed to fetch games'}</p>
                <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['games'] })}>Retry</Button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (data?.data && data.data.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <HeaderSkeleton />
              <ControlsSkeleton />
              <CreateGameCardSkeleton />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
        <div className='flex flex-col gap-1'>
          <h1 className="text-4xl tracking-tighter font-bold leading-none text-slate-600">Draft Games</h1>
          <p className="text-xl tracking-tight opacity-80 text-slate-600">Manage your draft slot games and track their performance</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex gap-2">
          <div className='flex flex-row gap-1'>
            <Button variant={sortBy === 'createdAt' ? 'default' : 'outline'} size="sm" onClick={() => handleSortChange('createdAt', 'desc')}>Newest Created</Button>
            <Button variant={sortBy === 'updatedAt' ? 'default' : 'outline'} size="sm" onClick={() => handleSortChange('updatedAt', 'desc')}>Latest Updated</Button>
            <Button variant={sortBy === 'title' ? 'default' : 'outline'} size="sm" onClick={() => handleSortChange('title', 'asc')}>Title A-Z</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">

        <Link href="/builder?create=true" className="text-center py-12 backdrop-blur-2xl mix-blend-color-burn bg-slate-400/5 border border-pink-500 rounded-lg flex flex-col items-center justify-center hover:bg-pink-400/5 transition-all duration-300">
          <span className='flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-clip text-transparent bg-clip-text'>
            <Plus className="w-24 h-24 text-pink-500" />
            <span className='text-2xl text-pink-500/80'>Create New Game</span>
          </span>
        </Link>
        {data?.data?.map((game: GameConfig) => (
          <GameCard
            key={game.id}
            game={game}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="border-slate-700"
          >
            Previous
          </Button>

          <span className="text-slate-400">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="border-slate-700"
          >
            Next
          </Button>
        </div>
      )}
    </ProtectedRoute>
  );
}