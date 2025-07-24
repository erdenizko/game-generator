import { NextRequest, NextResponse } from 'next/server';
import { cacheService, CacheKeys } from '@/lib/redis';
import { withRateLimit } from '@/lib/middleware';
import { ApiResponse, SessionData, GameConfig } from '@/lib/types';
import prisma from '@/lib/database';

// GET /api/session/[id] - Get session configuration
async function getSessionConfig(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const sessionId = resolvedParams.id;

    // Validate session ID format
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_SESSION_ID',
            message: 'Invalid session ID format',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Try to get session from cache first
    let sessionData = await cacheService.get<SessionData>(CacheKeys.session(sessionId));

    if (!sessionData) {
      // If not in cache, get from database
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          game: {
            include: {
              slotItems: true,
              regions: true,
              languages: true,
            },
          },
        },
      });

      if (!session) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'SESSION_NOT_FOUND',
              message: 'Session not found',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Check if session has expired
      if (session.expiresAt < new Date()) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'SESSION_EXPIRED',
              message: 'Session has expired',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 410 }
        );
      }

      // Reconstruct session data
      sessionData = {
        gameId: session.gameId,
        playerRef: session.playerRef,
        country: session.country || undefined,
        balance: session.balanceStart ? parseFloat(session.balanceStart.toString()) : 0,
        expiresAt: session.expiresAt,
      };

      // Cache the session data
      const ttlSeconds = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
      if (ttlSeconds > 0) {
        await cacheService.set(CacheKeys.session(sessionId), sessionData, ttlSeconds);
      }
    }

    // Check if session has expired
    if (sessionData.expiresAt < new Date()) {
      // Remove expired session from cache
      await cacheService.del(CacheKeys.session(sessionId));
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SESSION_EXPIRED',
            message: 'Session has expired',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 410 }
      );
    }

    // Get game configuration from cache
    let gameConfig = await cacheService.get<GameConfig>(CacheKeys.game(sessionData.gameId));

    if (!gameConfig) {
      // If not in cache, get from database
      const game = await prisma.game.findUnique({
        where: { 
          id: sessionData.gameId,
          isPublished: true,
        },
        include: {
          slotItems: true,
          regions: true,
          languages: true,
        },
      });

      if (!game) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'GAME_NOT_FOUND',
              message: 'Game not found or not published',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }

      // Reconstruct game configuration
      const gameJsonConfig = game.jsonConfig as unknown as GameConfig;
      gameConfig = {
        ...gameJsonConfig,
        id: game.id,
        title: game.title,
        description: game.description || '',
        rows: game.rows,
        columns: game.columns,
        slotItems: game.slotItems.map(item => ({
          id: item.id,
          name: item.name,
          imageKey: item.imageKey,
          probability: parseFloat(item.probability.toString()),
          revenue: item.revenue ? parseFloat(item.revenue.toString()) : undefined,
          minimumCount: item.minimumCount,
          diagonalPrize: item.diagonalPrize,
        })),
        availableRegions: game.regions.map(region => ({
          country: region.country,
          currency: region.currency,
          minBet: parseFloat(region.minBet.toString()),
          maxBet: parseFloat(region.maxBet.toString()),
          step: parseFloat(region.step.toString()),
        })),
        availableLanguages: game.languages.map(lang => ({
          locale: lang.locale,
          strings: lang.jsonStrings as Record<string, string>,
        })),
      };

      // Cache the game configuration
      await cacheService.set(CacheKeys.game(sessionData.gameId), gameConfig, 3600); // 1 hour
    }

    // Filter game config based on user's region if applicable
    const filteredGameConfig = { ...gameConfig };
    if (sessionData.country) {
      // Filter available regions to only include user's region
      filteredGameConfig.availableRegions = gameConfig.availableRegions.filter(
        region => region.country === sessionData.country
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          sessionId,
          gameConfig: filteredGameConfig,
          playerRef: sessionData.playerRef,
          country: sessionData.country,
          balance: sessionData.balance,
          expiresAt: sessionData.expiresAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Get session config error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve session configuration',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export GET handler with rate limiting
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return withRateLimit(
    request,
    (req) => getSessionConfig(req, context),
    { maxRequests: 200, windowMs: 60000 } // 200 requests per minute
  );
}