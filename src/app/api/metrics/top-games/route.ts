import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import prisma from '@/lib/database';

interface TopGame {
  gameId: string;
  title: string;
  totalRevenue: number;
  totalSpins: number;
  totalPlayers: number;
  rtp: number;
  avgBet: number;
}

interface TopGamesResponse {
  byRevenue: TopGame[];
  byUsage: TopGame[];
  byPlayers: TopGame[];
}

// GET /api/metrics/top-games - Get top games by different metrics
async function getTopGames(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const period = searchParams.get('period') || '30d'; // 7d, 30d, 90d, all

    // Calculate date range based on period
    let startDate: Date | undefined;
    if (period !== 'all') {
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
    }



    // Get top games by revenue
    let topByRevenue;
    if (startDate) {
      topByRevenue = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE dm.date >= ${startDate}
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY "totalRevenue" DESC
        LIMIT ${limit}
      `;
    } else {
      topByRevenue = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        GROUP BY g.id, g.title
        HAVING SUM(dm.total_bets) > 0
        ORDER BY "totalRevenue" DESC
        LIMIT ${limit}
      `;
    }

    // Get top games by usage (spin count)
    let topByUsage;
    if (startDate) {
      topByUsage = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE dm.date >= ${startDate}
        GROUP BY g.id, g.title
        HAVING SUM(dm.spin_count) > 0
        ORDER BY "totalSpins" DESC
        LIMIT ${limit}
      `;
    } else {
      topByUsage = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        GROUP BY g.id, g.title
        HAVING SUM(dm.spin_count) > 0
        ORDER BY "totalSpins" DESC
        LIMIT ${limit}
      `;
    }

    // Get top games by player count
    let topByPlayers;
    if (startDate) {
      topByPlayers = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        WHERE dm.date >= ${startDate}
        GROUP BY g.id, g.title
        HAVING MAX(dm.player_count) > 0
        ORDER BY "totalPlayers" DESC
        LIMIT ${limit}
      `;
    } else {
      topByPlayers = await prisma.$queryRaw<TopGame[]>`
        SELECT 
          g.id as "gameId",
          g.title,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(MAX(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet"
        FROM games g
        LEFT JOIN daily_metrics dm ON g.id = dm.game_id
        GROUP BY g.id, g.title
        HAVING MAX(dm.player_count) > 0
        ORDER BY "totalPlayers" DESC
        LIMIT ${limit}
      `;
    }

    const response: TopGamesResponse = {
      byRevenue: topByRevenue.map(game => ({
        gameId: game.gameId,
        title: game.title,
        totalRevenue: Number(game.totalRevenue),
        totalSpins: Number(game.totalSpins),
        totalPlayers: Number(game.totalPlayers),
        rtp: Number(game.rtp),
        avgBet: Number(game.avgBet)
      })),
      byUsage: topByUsage.map(game => ({
        gameId: game.gameId,
        title: game.title,
        totalRevenue: Number(game.totalRevenue),
        totalSpins: Number(game.totalSpins),
        totalPlayers: Number(game.totalPlayers),
        rtp: Number(game.rtp),
        avgBet: Number(game.avgBet)
      })),
      byPlayers: topByPlayers.map(game => ({
        gameId: game.gameId,
        title: game.title,
        totalRevenue: Number(game.totalRevenue),
        totalSpins: Number(game.totalSpins),
        totalPlayers: Number(game.totalPlayers),
        rtp: Number(game.rtp),
        avgBet: Number(game.avgBet)
      })),
    };

    return NextResponse.json(
      {
        success: true,
        data: response,
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Top games API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve top games',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export GET handler with authentication
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuth(request, getTopGames);
} 