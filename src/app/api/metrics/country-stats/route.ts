import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import prisma from '@/lib/database';

// Simplified country list matching the one used in simple-game-form.tsx
const COUNTRIES_LIST = [
  { code: 'USA', name: 'United States' },
  { code: 'CAN', name: 'Canada' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'EUR', name: 'European Union' },
  { code: 'AUS', name: 'Australia' },
  { code: 'JPN', name: 'Japan' },
  { code: 'KOR', name: 'South Korea' },
  { code: 'CHN', name: 'China' },
  { code: 'IND', name: 'India' },
  { code: 'BRA', name: 'Brazil' },
];

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

interface CountryStatsResponse {
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

// GET /api/metrics/country-stats - Get country-based statistics
async function getCountryStats(request: NextRequest): Promise<NextResponse> {
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

    // Get country statistics by revenue
    let statsByRevenue;
    if (startDate) {
      statsByRevenue = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        AND dm.date >= ${startDate}
        GROUP BY dm.country
        HAVING SUM(dm.total_bets) > 0
        ORDER BY "totalRevenue" DESC
        LIMIT ${limit}
      `;
    } else {
      statsByRevenue = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        GROUP BY dm.country
        HAVING SUM(dm.total_bets) > 0
        ORDER BY "totalRevenue" DESC
        LIMIT ${limit}
      `;
    }

    // Get country statistics by player count
    let statsByPlayers;
    if (startDate) {
      statsByPlayers = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        AND dm.date >= ${startDate}
        GROUP BY dm.country
        HAVING MAX(dm.player_count) > 0
        ORDER BY "playerCount" DESC
        LIMIT ${limit}
      `;
    } else {
      statsByPlayers = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        GROUP BY dm.country
        HAVING MAX(dm.player_count) > 0
        ORDER BY "playerCount" DESC
        LIMIT ${limit}
      `;
    }

    // Get country statistics by spin count
    let statsBySpins;
    if (startDate) {
      statsBySpins = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        AND dm.date >= ${startDate}
        GROUP BY dm.country
        HAVING SUM(dm.spin_count) > 0
        ORDER BY "totalSpins" DESC
        LIMIT ${limit}
      `;
    } else {
      statsBySpins = await prisma.$queryRaw<CountryStats[]>`
        SELECT 
          dm.country,
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          CASE 
            WHEN SUM(dm.spin_count) > 0 THEN 
              SUM(dm.total_bets) / SUM(dm.spin_count)
            ELSE 0 
          END as "avgBet",
          CASE 
            WHEN SUM(dm.total_bets) > 0 THEN 
              (SUM(dm.total_wins) / SUM(dm.total_bets)) * 100
            ELSE 0 
          END as rtp,
          COALESCE(MAX(dm.player_count), 0) as "playerCount"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        GROUP BY dm.country
        HAVING SUM(dm.spin_count) > 0
        ORDER BY "totalSpins" DESC
        LIMIT ${limit}
      `;
    }

    // Get overall summary
    let summary;
    if (startDate) {
      summary = await prisma.$queryRaw<{
        totalCountries: number;
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
      }[]>`
        SELECT 
          COUNT(DISTINCT dm.country) as "totalCountries",
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
        AND dm.date >= ${startDate}
      `;
    } else {
      summary = await prisma.$queryRaw<{
        totalCountries: number;
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
      }[]>`
        SELECT 
          COUNT(DISTINCT dm.country) as "totalCountries",
          COALESCE(SUM(dm.total_bets), 0) as "totalRevenue",
          COALESCE(SUM(dm.player_count), 0) as "totalPlayers",
          COALESCE(SUM(dm.spin_count), 0) as "totalSpins"
        FROM daily_metrics dm
        WHERE dm.country IS NOT NULL
      `;
    }

    // Add country names to the results and convert BigInt to numbers
    const addCountryNames = (stats: CountryStats[]): CountryStats[] => {
      return stats.map(stat => ({
        country: stat.country,
        countryName: COUNTRIES_LIST.find(c => c.code === stat.country)?.name || stat.country,
        totalRevenue: Number(stat.totalRevenue),
        totalSpins: Number(stat.totalSpins),
        totalPlayers: Number(stat.totalPlayers),
        avgBet: Number(stat.avgBet),
        rtp: Number(stat.rtp),
        playerCount: Number(stat.playerCount)
      }));
    };

    const response: CountryStatsResponse = {
      byRevenue: addCountryNames(statsByRevenue),
      byPlayers: addCountryNames(statsByPlayers),
      bySpins: addCountryNames(statsBySpins),
      summary: {
        totalCountries: Number(summary[0]?.totalCountries) || 0,
        totalRevenue: Number(summary[0]?.totalRevenue) || 0,
        totalPlayers: Number(summary[0]?.totalPlayers) || 0,
        totalSpins: Number(summary[0]?.totalSpins) || 0
      }
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
    console.error('Country stats API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve country statistics',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export GET handler with authentication
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuth(request, getCountryStats);
} 