'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GameMetrics {
  totalBets: number;
  totalWins: number;
  netRevenue: number;
  rtp: number;
  spinCount: number;
  playerCount: number;
}

interface RealtimeStats {
  currentHour: GameMetrics;
  last24Hours: GameMetrics;
  trend: {
    betsChange: number;
    winsChange: number;
    revenueChange: number;
  };
}

interface AnalyticsChartsProps {
  metrics: GameMetrics;
  gameId?: string;
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
}

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

export function AnalyticsCharts({ metrics, gameId, dateRange }: AnalyticsChartsProps) {
  const [chartType, setChartType] = useState<'revenue' | 'activity' | 'performance'>('revenue');
  const [realtimeData, setRealtimeData] = useState<RealtimeStats | null>(null);



  // Load real-time data if gameId is provided
  useEffect(() => {
    if (gameId) {
      const loadRealtimeData = async () => {
        if (!gameId) return;
    
        try {
          const response = await fetch(`/api/metrics/realtime?gameId=${gameId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setRealtimeData(data.data.stats);
          }
        } catch (error) {
          console.error('Error loading real-time data:', error);
        }
      };
      loadRealtimeData();
      
      // Set up polling for real-time updates
      const interval = setInterval(loadRealtimeData, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [gameId]);

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

  // Prepare chart data based on selected type
  const getChartData = (): ChartData[] => {
    switch (chartType) {
      case 'revenue':
        const totalRevenue = metrics.totalBets;
        return [
          {
            label: 'Total Bets',
            value: metrics.totalBets,
            percentage: 100,
          },
          {
            label: 'Total Wins',
            value: metrics.totalWins,
            percentage: totalRevenue > 0 ? (metrics.totalWins / totalRevenue) * 100 : 0,
          },
          {
            label: 'Net Revenue',
            value: metrics.netRevenue,
            percentage: totalRevenue > 0 ? (metrics.netRevenue / totalRevenue) * 100 : 0,
          },
        ];

      case 'activity':
        const maxSpins = Math.max(metrics.spinCount, 1);
        return [
          {
            label: 'Total Spins',
            value: metrics.spinCount,
            percentage: 100,
          },
          {
            label: 'Players',
            value: metrics.playerCount,
            percentage: (metrics.playerCount / maxSpins) * 100,
          },
          {
            label: 'Avg Spins/Player',
            value: metrics.playerCount > 0 ? Math.round(metrics.spinCount / metrics.playerCount) : 0,
            percentage: metrics.playerCount > 0 ? ((metrics.spinCount / metrics.playerCount) / maxSpins) * 100 : 0,
          },
        ];

      case 'performance':
        return [
          {
            label: 'RTP',
            value: metrics.rtp * 100,
            percentage: metrics.rtp * 100,
          },
          {
            label: 'House Edge',
            value: (1 - metrics.rtp) * 100,
            percentage: (1 - metrics.rtp) * 100,
          },
        ];

      default:
        return [];
    }
  };

  const chartData = getChartData();

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      {realtimeData && (
        <Card>
          <CardHeader>
            <CardTitle>Real-time Statistics</CardTitle>
            <CardDescription>
              Live data updates every 30 seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(realtimeData.currentHour.totalBets)}
                </div>
                <div className="text-sm text-blue-600">Current Hour Bets</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(realtimeData.currentHour.spinCount)}
                </div>
                <div className="text-sm text-green-600">Current Hour Spins</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(realtimeData.last24Hours.netRevenue)}
                </div>
                <div className="text-sm text-purple-600">24h Revenue</div>
              </div>
            </div>

            {/* Trend Indicators */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Bets Trend (24h)</span>
                <span className={`text-sm font-medium ${
                  realtimeData.trend.betsChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {realtimeData.trend.betsChange >= 0 ? '+' : ''}{realtimeData.trend.betsChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Wins Trend (24h)</span>
                <span className={`text-sm font-medium ${
                  realtimeData.trend.winsChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {realtimeData.trend.winsChange >= 0 ? '+' : ''}{realtimeData.trend.winsChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Revenue Trend (24h)</span>
                <span className={`text-sm font-medium ${
                  realtimeData.trend.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {realtimeData.trend.revenueChange >= 0 ? '+' : ''}{realtimeData.trend.revenueChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Charts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Visual breakdown of your game metrics
              </CardDescription>
            </div>
            <Select value={chartType} onValueChange={(value: string) => setChartType(value as 'revenue' | 'activity' | 'performance')}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue Analysis</SelectItem>
                <SelectItem value="activity">Player Activity</SelectItem>
                <SelectItem value="performance">Game Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-gray-600">
                    {chartType === 'performance' 
                      ? `${item.value.toFixed(2)}%`
                      : chartType === 'revenue'
                      ? formatCurrency(item.value)
                      : formatNumber(item.value)
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.max(item.percentage, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Chart Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Summary</h4>
            {chartType === 'revenue' && (
              <p className="text-sm text-gray-600">
                Your game has generated {formatCurrency(metrics.totalBets)} in total bets, 
                with {formatCurrency(metrics.totalWins)} paid out to players, 
                resulting in {formatCurrency(metrics.netRevenue)} net revenue.
              </p>
            )}
            {chartType === 'activity' && (
              <p className="text-sm text-gray-600">
                {formatNumber(metrics.playerCount)} players have played {formatNumber(metrics.spinCount)} spins, 
                averaging {metrics.playerCount > 0 ? Math.round(metrics.spinCount / metrics.playerCount) : 0} spins per player.
              </p>
            )}
            {chartType === 'performance' && (
              <p className="text-sm text-gray-600">
                Your game has an RTP of {(metrics.rtp * 100).toFixed(2)}% and a house edge of {((1 - metrics.rtp) * 100).toFixed(2)}%.
                {metrics.rtp >= 0.95 ? ' This is an excellent RTP rate.' : 
                 metrics.rtp >= 0.85 ? ' This is a reasonable RTP rate.' : 
                 ' Consider reviewing your game balance.'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Date Range Info */}
      {dateRange && (dateRange.startDate || dateRange.endDate) && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              Data shown for period: {' '}
              {dateRange.startDate && new Date(dateRange.startDate).toLocaleDateString()} 
              {dateRange.startDate && dateRange.endDate && ' to '}
              {dateRange.endDate && new Date(dateRange.endDate).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}