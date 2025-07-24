import prisma from '@/lib/database';
import { cacheService } from '@/lib/redis';
import { Decimal } from '@prisma/client/runtime/library';

// Interfaces for metrics data
export interface SpinMetricsData {
  sessionId: string;
  gameId: string;
  playerRef: string;
  bet: string;
  win: string;
  isWin: string;
  timestamp: string;
  country: string;
}

export interface MetricsFilter {
  gameId?: string;
  country?: string;
  currency?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GameMetrics {
  totalBets: number;
  totalWins: number;
  netRevenue: number;
  rtp: number;
  spinCount: number;
  playerCount: number;
}

export interface RealtimeStats {
  currentHour: GameMetrics;
  last24Hours: GameMetrics;
  trend: {
    betsChange: number;
    winsChange: number;
    revenueChange: number;
  };
}

// Metrics aggregation service
export class MetricsService {
  // Get metrics with filtering
  static async getMetrics(filters: MetricsFilter): Promise<GameMetrics> {
    try {
      const cacheKey = `metrics:${JSON.stringify(filters)}`;
      
      // Try to get from cache first
      const cached = await cacheService.get<GameMetrics>(cacheKey);
      if (cached) {
        return cached;
      }

      // Build where clause
      const where: Record<string, unknown> = {};
      
      if (filters.gameId) {
        where.gameId = filters.gameId;
      }
      
      if (filters.country) {
        where.country = filters.country;
      }
      
      if (filters.currency) {
        where.currency = filters.currency;
      }

      if (filters.startDate || filters.endDate) {
        where.date = {};
        if (filters.startDate) {
          (where.date as Record<string, unknown>).gte = filters.startDate;
        }
        if (filters.endDate) {
          (where.date as Record<string, unknown>).lte = filters.endDate;
        }
      }

      // Query daily metrics
      const dailyMetrics = await prisma.dailyMetric.findMany({
        where,
        orderBy: {
          date: 'desc'
        }
      });

      // Aggregate results
      const metrics: GameMetrics = {
        totalBets: 0,
        totalWins: 0,
        netRevenue: 0,
        rtp: 0,
        spinCount: 0,
        playerCount: 0,
      };

      for (const daily of dailyMetrics) {
        metrics.totalBets += daily.totalBets.toNumber();
        metrics.totalWins += daily.totalWins.toNumber();
        metrics.netRevenue += daily.netRevenue.toNumber();
        metrics.spinCount += daily.spinCount;
        metrics.playerCount = Math.max(metrics.playerCount, daily.playerCount);
      }

      // Calculate RTP
      metrics.rtp = metrics.totalBets > 0 ? metrics.totalWins / metrics.totalBets : 0;

      // Cache for 15 minutes
      await cacheService.set(cacheKey, metrics, 15 * 60);

      return metrics;

    } catch (error) {
      console.error('Error getting metrics:', error);
      throw error;
    }
  }

  // Get real-time statistics
  static async getRealtimeStats(gameId: string): Promise<RealtimeStats> {
    try {
      const now = new Date();
      const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const previous24Hours = new Date(now.getTime() - 48 * 60 * 60 * 1000);

      // Get current hour metrics
      const currentHourMetrics = await this.getMetrics({
        gameId,
        startDate: currentHour,
        endDate: new Date(currentHour.getTime() + 60 * 60 * 1000)
      });

      // Get last 24 hours metrics
      const last24HoursMetrics = await this.getMetrics({
        gameId,
        startDate: last24Hours,
        endDate: now
      });

      // Get previous 24 hours for trend calculation
      const previous24HoursMetrics = await this.getMetrics({
        gameId,
        startDate: previous24Hours,
        endDate: last24Hours
      });

      // Calculate trends
      const trend = {
        betsChange: this.calculatePercentageChange(
          previous24HoursMetrics.totalBets,
          last24HoursMetrics.totalBets
        ),
        winsChange: this.calculatePercentageChange(
          previous24HoursMetrics.totalWins,
          last24HoursMetrics.totalWins
        ),
        revenueChange: this.calculatePercentageChange(
          previous24HoursMetrics.netRevenue,
          last24HoursMetrics.netRevenue
        ),
      };

      return {
        currentHour: currentHourMetrics,
        last24Hours: last24HoursMetrics,
        trend,
      };

    } catch (error) {
      console.error('Error getting realtime stats:', error);
      throw error;
    }
  }

  // Calculate percentage change
  private static calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) {
      return newValue > 0 ? 100 : 0;
    }
    return ((newValue - oldValue) / oldValue) * 100;
  }

  // Background job to process metrics (simplified for now)
  static async runHourlyAggregation(): Promise<void> {
    console.log('Starting hourly metrics aggregation...');
    
    try {
      // For now, just log that the job ran
      // In a full implementation, this would process Redis Stream data
      console.log('Hourly metrics aggregation completed');
    } catch (error) {
      console.error('Error in hourly aggregation:', error);
    }
  }
}