'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AnalyticsCharts } from '@/components/analytics/analytics-charts';
import { MetricsCards } from '@/components/analytics/metrics-cards';

interface GameMetrics {
  totalBets: number;
  totalWins: number;
  netRevenue: number;
  rtp: number;
  spinCount: number;
  playerCount: number;
}

interface MetricsFilter {
  gameId?: string;
  country?: string;
  currency?: string;
  startDate?: string;
  endDate?: string;
}

interface Game {
  id: string;
  title: string;
  description?: string;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<GameMetrics | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<MetricsFilter>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 7 days
    endDate: new Date().toISOString().split('T')[0],
  });

  // Load user's games on component mount
  useEffect(() => {
    loadGames();
  }, []);

  // Load metrics when filters change
  useEffect(() => {
    if (filters.gameId || (!filters.gameId && games.length > 0)) {

      const loadMetrics = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const params = new URLSearchParams();
          
          if (filters.gameId) params.append('gameId', filters.gameId);
          if (filters.country) params.append('country', filters.country);
          if (filters.currency) params.append('currency', filters.currency);
          if (filters.startDate) params.append('startDate', new Date(filters.startDate).toISOString());
          if (filters.endDate) params.append('endDate', new Date(filters.endDate).toISOString());
    
          const response = await fetch(`/api/metrics?${params.toString()}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setMetrics(data.data.metrics);
          } else {
            const errorData = await response.json();
            setError(errorData.error?.message || 'Failed to load metrics');
          }
        } catch (error) {
          console.error('Error loading metrics:', error);
          setError('Failed to load metrics');
        } finally {
          setLoading(false);
        }
      };

      loadMetrics();
    }
  }, [filters, games]);

  const loadGames = async () => {
    try {
      const response = await fetch('/api/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGames(data.data || []);
        
        // Auto-select first game if available
        if (data.data && data.data.length > 0) {
          setFilters(prev => ({ ...prev, gameId: data.data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const handleFilterChange = (key: keyof MetricsFilter, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const resetFilters = () => {
    setFilters({
      gameId: games.length > 0 ? games[0].id : undefined,
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    });
  };

  const selectedGame = games.find(game => game.id === filters.gameId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Monitor your game performance and player engagement metrics
        </p>
      </div>

      {/* Filters Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter your analytics data by game, region, currency, and date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Game Selection */}
            <div className="space-y-2">
              <Label htmlFor="game-select">Game</Label>
              <Select
                value={filters.gameId || ''}
                onValueChange={(value) => handleFilterChange('gameId', value)}
              >
                <SelectTrigger id="game-select">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <Label htmlFor="country-input">Country</Label>
              <Input
                id="country-input"
                placeholder="e.g., USA"
                value={filters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                maxLength={3}
              />
            </div>

            {/* Currency Filter */}
            <div className="space-y-2">
              <Label htmlFor="currency-input">Currency</Label>
              <Input
                id="currency-input"
                placeholder="e.g., USD"
                value={filters.currency || ''}
                onChange={(e) => handleFilterChange('currency', e.target.value)}
                maxLength={3}
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Game Info */}
      {selectedGame && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Selected Game</Badge>
            <span className="font-medium">{selectedGame.title}</span>
            {selectedGame.description && (
              <span className="text-gray-500">- {selectedGame.description}</span>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Metrics Display */}
      {metrics && !loading && (
        <>
          {/* Metrics Cards */}
          <MetricsCards metrics={metrics} />

          {/* Charts */}
          <AnalyticsCharts 
            metrics={metrics} 
            gameId={filters.gameId}
            dateRange={{
              startDate: filters.startDate,
              endDate: filters.endDate,
            }}
          />
        </>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!metrics && !loading && !error && games.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">No games found. Create a game first to view analytics.</p>
            <Button onClick={() => window.location.href = '/builder'}>
              Create Your First Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}