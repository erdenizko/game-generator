import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/database';
import { cacheService, CacheKeys, CacheTTL } from '@/lib/redis';
import { withRateLimit } from '@/lib/middleware';
import { ApiResponse, CreateSessionRequest, SessionData, GameConfig } from '@/lib/types';

// Validation schema for session creation
const createSessionSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  gameId: z.string().uuid('Invalid game ID format'),
  user: z.object({
    id: z.string().min(1, 'User ID is required'),
    country: z.string().length(3, 'Country must be 3-letter code').optional(),
    currency: z.string().length(3, 'Currency must be 3-letter code').optional(),
  }),
});

// POST /api/session - Create production game session
async function createSession(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = createSessionSchema.parse(body);

    // Verify the game exists and is published
    const game = await prisma.game.findUnique({
      where: { 
        id: validatedData.gameId,
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

    // Check if the user's country is blocked
    const gameConfig = game.jsonConfig as unknown as GameConfig;
    if (validatedData.user.country && gameConfig.blockedRegions?.includes(validatedData.user.country)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'REGION_BLOCKED',
            message: 'Game is not available in your region',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Create session in database
    const session = await prisma.session.create({
      data: {
        gameId: validatedData.gameId,
        playerRef: validatedData.user.id,
        country: validatedData.user.country || null,
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      },
    });

    // Prepare session data for cache
    const sessionData: SessionData = {
      gameId: validatedData.gameId,
      playerRef: validatedData.user.id,
      country: validatedData.user.country,
      balance: 0, // Initial balance, will be updated via webhook
      expiresAt: session.expiresAt,
    };

    // Cache session data in Redis
    await cacheService.set(
      CacheKeys.session(session.id),
      sessionData,
      CacheTTL.SESSION
    );

    // Cache game configuration for quick access
    const fullGameConfig: GameConfig = {
      ...gameConfig,
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

    await cacheService.set(
      CacheKeys.game(validatedData.gameId),
      fullGameConfig,
      CacheTTL.GAME_CONFIG
    );

    // Generate iframe URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const iframeUrl = `${baseUrl}/game/${session.id}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          sessionId: session.id,
          iframeUrl,
          expiresAt: session.expiresAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 201 }
    );

  } catch (error) {
    console.error('Session creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create session',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export POST handler with rate limiting
export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(
    request,
    createSession,
    { maxRequests: 100, windowMs: 60000 } // 100 requests per minute
  );
}