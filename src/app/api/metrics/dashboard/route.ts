import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import prisma from '@/lib/database';

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

// GET /api/metrics/dashboard - Get overall dashboard statistics
async function getDashboardStats(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d'; // 7d, 30d, 90d, all
    const gameId = searchParams.get('gameId'); // Optional game filter

    // Calculate date range based on period
    let startDate: Date | undefined;
    if (period !== 'all') {
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
    }

    // Get current period stats
    let currentStats;
    if (startDate && gameId) {
      currentStats = await prisma.$queryRaw<{
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
        totalGames: number;
        avgRtp: number;
        avgBet: number;
      }[]>`
        SELECT 
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COUNT(DISTINCT dm.game_id) as "totalGames",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as "avgRtp",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM daily_metrics dm
        WHERE dm.date >= ${startDate} AND dm.game_id = ${gameId}
      `;
    } else if (startDate) {
      currentStats = await prisma.$queryRaw<{
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
        totalGames: number;
        avgRtp: number;
        avgBet: number;
      }[]>`
        SELECT 
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COUNT(DISTINCT dm.game_id) as "totalGames",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as "avgRtp",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM daily_metrics dm
        WHERE dm.date >= ${startDate}
      `;
    } else if (gameId) {
      currentStats = await prisma.$queryRaw<{
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
        totalGames: number;
        avgRtp: number;
        avgBet: number;
      }[]>`
        SELECT 
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COUNT(DISTINCT dm.game_id) as "totalGames",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as "avgRtp",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM daily_metrics dm
        WHERE dm.game_id = ${gameId}
      `;
    } else {
      currentStats = await prisma.$queryRaw<{
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
        totalGames: number;
        avgRtp: number;
        avgBet: number;
      }[]>`
        SELECT 
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COUNT(DISTINCT dm.game_id) as "totalGames",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as "avgRtp",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM daily_metrics dm
      `;
    }

        // Get previous period stats for change calculation
    let previousStats = { totalRevenue: 0, totalPlayers: 0, totalSpins: 0 };
    if (startDate) {
      const previousStartDate = new Date(startDate);
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      previousStartDate.setDate(previousStartDate.getDate() - periodDays);
      
      let previous;
      if (gameId) {
        previous = await prisma.$queryRaw<{
          totalRevenue: number;
          totalPlayers: number;
          totalSpins: number;
        }[]>`
          SELECT 
            COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
            COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
            COALESCE(SUM(dm.spin_count), 0) as "totalSpins"
          FROM daily_metrics dm
          WHERE dm.date >= ${previousStartDate} AND dm.date < ${startDate} AND dm.game_id = ${gameId}
        `;
      } else {
        previous = await prisma.$queryRaw<{
          totalRevenue: number;
          totalPlayers: number;
          totalSpins: number;
        }[]>`
          SELECT 
            COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
            COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
            COALESCE(SUM(dm.spin_count), 0) as "totalSpins"
          FROM daily_metrics dm
          WHERE dm.date >= ${previousStartDate} AND dm.date < ${startDate}
        `;
      }
      
      if (previous[0]) {
        previousStats = previous[0];
      }
    }

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    // Get top performing game
    let topGame;
    if (startDate && gameId) {
      topGame = await prisma.$queryRaw<{
        id: string;
        title: string;
        revenue: number;
        players: number;
      }[]>`
        SELECT 
          g.id,
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE dm.date >= ${startDate} AND g.id = ${gameId}
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY revenue DESC
        LIMIT 1
      `;
    } else if (startDate) {
      topGame = await prisma.$queryRaw<{
        id: string;
        title: string;
        revenue: number;
        players: number;
      }[]>`
        SELECT 
          g.id,
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE dm.date >= ${startDate}
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY revenue DESC
        LIMIT 1
      `;
    } else if (gameId) {
      topGame = await prisma.$queryRaw<{
        id: string;
        title: string;
        revenue: number;
        players: number;
      }[]>`
        SELECT 
          g.id,
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE g.id = ${gameId}
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY revenue DESC
        LIMIT 1
      `;
    } else {
      topGame = await prisma.$queryRaw<{
        id: string;
        title: string;
        revenue: number;
        players: number;
      }[]>`
        SELECT 
          g.id,
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY revenue DESC
        LIMIT 1
      `;
    }

    // Get recent activity (last 7 days)
    let recentActivity;
    if (gameId) {
      recentActivity = await prisma.$queryRaw<{
        date: string;
        revenue: number;
        players: number;
        spins: number;
      }[]>`
        SELECT 
          dm.date::text as date,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players,
          COALESCE(SUM(dm.spin_count), 0) as spins
        FROM daily_metrics dm
        WHERE dm.date >= CURRENT_DATE - INTERVAL '7 days' AND dm.game_id = ${gameId}
        GROUP BY dm.date
        ORDER BY dm.date DESC
        LIMIT 7
      `;
    } else {
      recentActivity = await prisma.$queryRaw<{
        date: string;
        revenue: number;
        players: number;
        spins: number;
      }[]>`
        SELECT 
          dm.date::text as date,
          COALESCE(SUM(dm.total_bets), 0) as revenue,
          COALESCE(SUM(dm.player_count), 0) as players,
          COALESCE(SUM(dm.spin_count), 0) as spins
        FROM daily_metrics dm
        WHERE dm.date >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY dm.date
        ORDER BY dm.date DESC
        LIMIT 7
      `;
    }

    const stats: DashboardStats = {
      totalRevenue: Number(currentStats[0]?.totalRevenue) || 0,
      totalPlayers: Number(currentStats[0]?.totalPlayers) || 0,
      totalSpins: Number(currentStats[0]?.totalSpins) || 0,
      totalGames: Number(currentStats[0]?.totalGames) || 0,
      avgRtp: Number(currentStats[0]?.avgRtp) || 0,
      avgBet: Number(currentStats[0]?.avgBet) || 0,
      revenueChange24h: calculateChange(Number(currentStats[0]?.totalRevenue) || 0, Number(previousStats.totalRevenue)),
      playersChange24h: calculateChange(Number(currentStats[0]?.totalPlayers) || 0, Number(previousStats.totalPlayers)),
      spinsChange24h: calculateChange(Number(currentStats[0]?.totalSpins) || 0, Number(previousStats.totalSpins)),
      topPerformingGame: topGame[0] ? {
        id: topGame[0].id,
        title: topGame[0].title,
        revenue: Number(topGame[0].revenue),
        players: Number(topGame[0].players)
      } : null,
      recentActivity: recentActivity.reverse().map(activity => ({
        date: activity.date,
        revenue: Number(activity.revenue),
        players: Number(activity.players),
        spins: Number(activity.spins)
      })), // Show oldest to newest
    };

    return NextResponse.json(
      {
        success: true,
        data: stats,
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Dashboard stats API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve dashboard statistics',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export GET handler with authentication
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuth(request, getDashboardStats);
} 