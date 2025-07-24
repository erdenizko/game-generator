'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameMetrics {
  totalBets: number;
  totalWins: number;
  netRevenue: number;
  rtp: number;
  spinCount: number;
  playerCount: number;
}

interface MetricsCardsProps {
  metrics: GameMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (decimal: number): string => {
    return `${(decimal * 100).toFixed(2)}%`;
  };

  const getRTPBadgeVariant = (rtp: number) => {
    if (rtp >= 0.95) return 'default'; // Good RTP
    if (rtp >= 0.85) return 'secondary'; // Average RTP
    return 'destructive'; // Low RTP
  };

  const getRevenueColor = (revenue: number) => {
    return revenue >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Bets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M12 2v20m8-10H4" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalBets)}</div>
          <p className="text-xs text-muted-foreground">
            Total amount wagered by players
          </p>
        </CardContent>
      </Card>

      {/* Total Wins */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalWins)}</div>
          <p className="text-xs text-muted-foreground">
            Total amount paid out to players
          </p>
        </CardContent>
      </Card>

      {/* Net Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getRevenueColor(metrics.netRevenue)}`}>
            {formatCurrency(metrics.netRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total bets minus total wins
          </p>
        </CardContent>
      </Card>

      {/* RTP (Return to Player) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">RTP</CardTitle>
          <Badge variant={getRTPBadgeVariant(metrics.rtp)}>
            {formatPercentage(metrics.rtp)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(metrics.rtp)}</div>
          <p className="text-xs text-muted-foreground">
            Return to Player percentage
          </p>
        </CardContent>
      </Card>

      {/* Spin Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spins</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(metrics.spinCount)}</div>
          <p className="text-xs text-muted-foreground">
            Number of spins played
          </p>
        </CardContent>
      </Card>

      {/* Player Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Players</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(metrics.playerCount)}</div>
          <p className="text-xs text-muted-foreground">
            Unique players engaged
          </p>
        </CardContent>
      </Card>
    </div>
  );
}