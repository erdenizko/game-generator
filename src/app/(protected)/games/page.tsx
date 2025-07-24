'use client';

import { useState, useEffect } from 'react';
import { GamesDashboard } from '@/components/game-builder/games-dashboard';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { GameConfig, PaginatedResponse } from '@/lib/types';

export default function GamesPage() {
  const [games, setGames] = useState<GameConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchGames = async (params: {
    page?: number;
    search?: string;
    published?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', params.page.toString());
      if (params.search) searchParams.set('search', params.search);
      if (params.published !== undefined) searchParams.set('published', params.published.toString());
      if (params.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      searchParams.set('limit', pagination.limit.toString());

      const response = await fetch(`/api/games?${searchParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data: PaginatedResponse<GameConfig> = await response.json();

      if (data.success && data.data) {
        setGames(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        throw new Error(data.error?.message || 'Failed to fetch games');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchGames({ page: pagination.page });
  };

  const handleSearch = (search: string) => {
    fetchGames({ search, page: 1 });
  };

  const handleFilter = (published?: boolean) => {
    fetchGames({ published, page: 1 });
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    fetchGames({ sortBy, sortOrder, page: pagination.page });
  };

  const handlePageChange = (page: number) => {
    fetchGames({ page });
  };

  const handleBulkAction = async (gameIds: string[], action: 'publish' | 'unpublish' | 'delete') => {
    try {
      setLoading(true);

      // Handle bulk actions
      const promises = gameIds.map(async (gameId) => {
        if (action === 'delete') {
          return fetch(`/api/games/${gameId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else {
          return fetch(`/api/games/${gameId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
            body: JSON.stringify({
              isPublished: action === 'publish',
            }),
          });
        }
      });

      await Promise.all(promises);

      // Refresh the games list
      await fetchGames({ page: pagination.page });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bulk action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="">
        <GamesDashboard
          games={games}
          loading={loading}
          error={error}
          pagination={pagination}
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onBulkAction={handleBulkAction}
        />
      </div>
    </ProtectedRoute>
  );
}