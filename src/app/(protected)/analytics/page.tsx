'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, TrendingUp, Trophy, Filter } from 'lucide-react';
import { DashboardStatsCards } from '@/components/analytics/dashboard-stats-cards';
import { TopGamesCharts } from '@/components/analytics/top-games-charts';
import { CountryStatsCharts } from '@/components/analytics/country-stats-charts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalRevenue: number;
  totalPlayers: number;
  totalSpins: number;
  totalGames: number;
  avgRtp: number;
  avgBet: number;
  revenueChange24h: number;
  playersChange24h: number;
  spinsChange24h: number;
  topPerformingGame: {
    id: string;
    title: string;
    revenue: number;
    players: number;
  } | null;
  recentActivity: {
    date: string;
    revenue: number;
    players: number;
    spins: number;
  }[];
}

interface TopGame {
  gameId: string;
  title: string;
  totalRevenue: number;
  totalSpins: number;
  totalPlayers: number;
  rtp: number;
  avgBet: number;
}

interface TopGamesData {
  byRevenue: TopGame[];
  byUsage: TopGame[];
  byPlayers: TopGame[];
}

interface CountryStats {
  country: string;
  countryName: string;
  totalRevenue: number;
  totalSpins: number;
  totalPlayers: number;
  avgBet: number;
  rtp: number;
  playerCount: number;
}

interface CountryStatsData {
  byRevenue: CountryStats[];
  byPlayers: CountryStats[];
  bySpins: CountryStats[];
  summary: {
    totalCountries: number;
    totalRevenue: number;
    totalPlayers: number;
    totalSpins: number;
  };
}

interface Game {
  id: string;
  title: string;
  description?: string;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedGameId, setSelectedGameId] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  // Dashboard data states
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [topGamesData, setTopGamesData] = useState<TopGamesData | null>(null);
  const [countryStatsData, setCountryStatsData] = useState<CountryStatsData | null>(null);

  const fetchAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('period', period);
      if (selectedGameId !== 'all') {
        params.append('gameId', selectedGameId);
      }

      // Fetch dashboard stats
      const statsResponse = await fetch(`/api/metrics/dashboard?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!statsResponse.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const statsData = await statsResponse.json();
      setDashboardStats(statsData.data);

      // Fetch top games data
      const topGamesResponse = await fetch(`/api/metrics/top-games?${params.toString()}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!topGamesResponse.ok) {
        throw new Error('Failed to fetch top games data');
      }

      const topGamesData = await topGamesResponse.json();
      setTopGamesData(topGamesData.data);

      // Fetch country stats data
      const countryStatsResponse = await fetch(`/api/metrics/country-stats?${params.toString()}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!countryStatsResponse.ok) {
        throw new Error('Failed to fetch country stats data');
      }

      const countryStatsData = await countryStatsResponse.json();
      setCountryStatsData(countryStatsData.data);

    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [period, selectedGameId]);

  // Load user's games on component mount
  useEffect(() => {
    loadGames();
  }, []);

  // Fetch analytics data when filters change
  useEffect(() => {
    if (games.length > 0) {
      fetchAnalyticsData();
    }
  }, [period, selectedGameId, games, fetchAnalyticsData]);

  const loadGames = async () => {
    try {
      const response = await fetch('/api/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGames(data.data || []);
      }
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const selectedGame = games.find(game => game.id === selectedGameId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchAnalyticsData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your game performance and player engagement metrics
            {selectedGame && selectedGameId !== 'all' && (
              <span className="ml-2 text-blue-600">
                • Filtering by: {selectedGame.title}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={(value: string) => setPeriod(value as '7d' | '30d' | '90d' | 'all')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAnalyticsData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Filter your analytics data by game and time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Game Selection */}
            <div className="space-y-2">
              <Label htmlFor="game-select">Game</Label>
              <Select
                value={selectedGameId}
                onValueChange={setSelectedGameId}
              >
                <SelectTrigger id="game-select">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Period */}
            <div className="space-y-2">
              <Label htmlFor="period-select">Time Period</Label>
              <Select
                value={period}
                onValueChange={(value: string) => setPeriod(value as '7d' | '30d' | '90d' | 'all')}
              >
                <SelectTrigger id="period-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Game Info */}
      {selectedGame && selectedGameId !== 'all' && (
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

      {/* Stats Cards */}
      {dashboardStats && (
        <div className="mb-8">
          <DashboardStatsCards stats={dashboardStats} />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Games Charts */}
        {topGamesData && (
          <div>
            <TopGamesCharts data={topGamesData} />
          </div>
        )}

        {/* Country Statistics */}
        {countryStatsData && (
          <div>
            <CountryStatsCharts data={countryStatsData} />
          </div>
        )}
      </div>

      {/* Recent Activity Chart */}
      {dashboardStats?.recentActivity && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity (Last 7 Days)
              </CardTitle>
              <CardDescription>
                Daily trends for revenue, players, and spins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardStats.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value: number, name: string) => [
                        name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                        name.charAt(0).toUpperCase() + name.slice(1)
                      ]}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="players"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Players"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="spins"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Spins"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Performing Game */}
      {dashboardStats?.topPerformingGame && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Performing Game
              </CardTitle>
              <CardDescription>
                Your best performing game this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div>
                  <h3 className="text-xl font-bold">{dashboardStats.topPerformingGame.title}</h3>
                  <p className="text-muted-foreground">Game ID: {dashboardStats.topPerformingGame.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(dashboardStats.topPerformingGame.revenue)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(dashboardStats.topPerformingGame.players)} players
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!dashboardStats && !isLoading && !error && games.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">No games found. Create a game first to view analytics.</p>
            <Button onClick={() => window.location.href = '/builder?create=true'}>
              Create Your First Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}