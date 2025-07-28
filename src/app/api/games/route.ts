import { NextRequest, NextResponse } from 'next/server';
import { GameService } from '@/lib/services/game';
import { ApiResponse, PaginatedResponse, GameConfig } from '@/lib/types';
import { withAuthSubscriptionAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { validateCreateGame, validateGameQuery } from '@/lib/validation/game';
import { ZodError } from 'zod';

// POST /api/games - Create a new game
async function handleCreateGame(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = validateCreateGame(body);
    
    // Create game
    const result = await GameService.createGame(request.user!.id, validatedData);
    
    return NextResponse.json(
      {
        success: true,
        data: {
          id: result.gameId,
          message: 'Game created successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create game error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid game data',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle known errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CREATE_GAME_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while creating the game',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// GET /api/games - List user's games
async function handleListGames(request: AuthenticatedRequest) {
  try {
    console.log(request.url)
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // Validate query parameters
    const validatedQuery = validateGameQuery(queryParams);
    
    // Get games
    const result = await GameService.listGames(request.user!.id, {
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      search: validatedQuery.search,
      published: validatedQuery.published,
      sortBy: validatedQuery.sortBy,
      sortOrder: validatedQuery.sortOrder,
    });
    
    return NextResponse.json(
      {
        success: true,
        data: result.games,
        pagination: result.pagination,
        timestamp: new Date().toISOString(),
      } as PaginatedResponse<GameConfig>,
      { status: 200 }
    );
  } catch (error) {
    console.error('List games error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid query parameters',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while fetching games',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function POST(request: NextRequest) {
  return withAuthSubscriptionAndRateLimit(
    request,
    handleCreateGame,
    {
      maxRequests: 10, // 10 game creations per minute
      windowMs: 60000, // 1 minute
    }
  );
}

export async function GET(request: NextRequest) {
  return withAuthSubscriptionAndRateLimit(
    request,
    handleListGames,
    {
      maxRequests: 60, // 60 requests per minute
      windowMs: 60000, // 1 minute
    }
  );
}

// Handle unsupported methods
export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'PUT method not allowed for this endpoint. Use /api/games/[id] instead.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'DELETE method not allowed for this endpoint. Use /api/games/[id] instead.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}