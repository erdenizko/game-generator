'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trophy, Filter } from 'lucide-react';
import { DashboardStatsCards } from '@/components/analytics/dashboard-stats-cards';
import { TopGamesCharts } from '@/components/analytics/top-games-charts';
import { CountryStatsCharts } from '@/components/analytics/country-stats-charts';
import { ProtectedRoute } from '@/components/auth/protected-route';
import Header from '@/components/layout/header';

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

async function fetchAnalyticsData(period: string, selectedGameId: string): Promise<{
  dashboardStats: DashboardStats;
  topGamesData: TopGamesData;
  countryStatsData: CountryStatsData;
}> {
  const params = new URLSearchParams();
  params.append('period', period);
  if (selectedGameId !== 'all') {
    params.append('gameId', selectedGameId);
  }
  const headers = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  const [statsResponse, topGamesResponse, countryStatsResponse] = await Promise.all([
    fetch(`/api/metrics/dashboard?${params.toString()}`, { headers }),
    fetch(`/api/metrics/top-games?${params.toString()}&limit=10`, { headers }),
    fetch(`/api/metrics/country-stats?${params.toString()}&limit=10`, { headers }),
  ]);

  if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
  if (!topGamesResponse.ok) throw new Error('Failed to fetch top games data');
  if (!countryStatsResponse.ok) throw new Error('Failed to fetch country stats data');

  const statsData = await statsResponse.json();
  const topGamesData = await topGamesResponse.json();
  const countryStatsData = await countryStatsResponse.json();

  return {
    dashboardStats: statsData.data,
    topGamesData: topGamesData.data,
    countryStatsData: countryStatsData.data,
  };
}

async function fetchGames(): Promise<Game[]> {
  const response = await fetch('/api/games', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
  });
  if (!response.ok) throw new Error('Failed to fetch games');
  const data = await response.json();
  return data.data || [];
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedGameId, setSelectedGameId] = useState<string>('all');

  const { data: games = [], isSuccess: gamesLoaded } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  const { data: analyticsData } = useQuery({
    queryKey: ['analyticsData', period, selectedGameId],
    queryFn: () => fetchAnalyticsData(period, selectedGameId),
    enabled: games.length > 0,
  });

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

  return (
    <ProtectedRoute>
      <Header title="Analytics" description="Track your game performance and player engagement" />

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
      {analyticsData?.dashboardStats && (
        <div className="mb-8">
          <DashboardStatsCards stats={analyticsData.dashboardStats} />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Games Charts */}
        {analyticsData?.topGamesData && (
          <div>
            <TopGamesCharts data={analyticsData.topGamesData} />
          </div>
        )}

        {/* Country Statistics */}
        {analyticsData?.countryStatsData && (
          <div>
            <CountryStatsCharts data={analyticsData.countryStatsData} />
          </div>
        )}
      </div>

      {/* Top Performing Game */}
      {analyticsData?.dashboardStats?.topPerformingGame && (
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
                  <h3 className="text-xl font-bold">{analyticsData.dashboardStats.topPerformingGame.title}</h3>
                  <p className="text-muted-foreground">Game ID: {analyticsData.dashboardStats.topPerformingGame.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(analyticsData.dashboardStats.topPerformingGame.revenue)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(analyticsData.dashboardStats.topPerformingGame.players)} players
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {gamesLoaded && games.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">No games found. Create a game first to view analytics.</p>
            <Button onClick={() => window.location.href = '/games/new'}>
              Create Your First Game
            </Button>
          </CardContent>
        </Card>
      )}
    </ProtectedRoute>
  );
}