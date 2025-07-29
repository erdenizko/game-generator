'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { PaginatedResponse, EditGameConfig } from '@/lib/types';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { GameCard } from '@/components/game-builder/game-card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/header';

// Constants
const ITEMS_PER_PAGE = 12;

async function fetchGames(page: number, limit: number, sortBy: string, sortOrder: string): Promise<PaginatedResponse<EditGameConfig>> {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());
  searchParams.set('limit', limit.toString());
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

  return response.json();
}

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
  const { data } = useQuery<PaginatedResponse<EditGameConfig>>({
    queryKey: ['games', pagination.page, pagination.limit, sortBy, sortOrder],
    queryFn: () => fetchGames(pagination.page, pagination.limit, sortBy, sortOrder),
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

  // Handle remove from marketplace
  const handleRemoveFromMarketplace = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/marketplace/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          gameId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove game from marketplace');
      }

      toast({
        title: 'Success',
        description: 'Game removed from marketplace successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['games'] });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to remove game from marketplace',
      });
    }
  }, [queryClient, toast]);

  // Handle sort change
  const handleSortChange = useCallback((sort: string, order: 'asc' | 'desc') => {
    setSortBy(sort);
    setSortOrder(order);
    setPagination(prev => ({ ...prev, page: 1 }));
    queryClient.invalidateQueries({ queryKey: ['games'] });
  }, [queryClient]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  return (
    <ProtectedRoute>
      <Header title="Published Games" description="Manage your published slot games and track their performance" />

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

        <Link href="/games/new" className="text-center py-12 backdrop-blur-2xl mix-blend-color-burn bg-slate-400/5 border border-pink-500 rounded-lg flex flex-col items-center justify-center hover:bg-pink-400/5 transition-all duration-300">
          <span className='flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-clip text-transparent bg-clip-text'>
            <Plus className="w-24 h-24 text-pink-500" />
            <span className='text-2xl text-pink-500/80'>Create New Game</span>
          </span>
        </Link>
        {data?.data?.map((game: EditGameConfig) => (
          <GameCard
            key={game.id}
            game={game}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            onRemoveFromMarketplace={handleRemoveFromMarketplace}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ['games'] })}
          />
        ))}
      </div>

      {/* Pagination */}
      {data?.pagination?.totalPages && data.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>

          <span className="text-slate-400">
            Page {pagination.page} of {data.pagination.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= data.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </ProtectedRoute>
  );
}
