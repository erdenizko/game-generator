import { NextRequest, NextResponse } from 'next/server';
import { GameService } from '@/lib/services/game';
import { ApiResponse, GameConfig } from '@/lib/types';
import { withAuthSubscriptionAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { validateUpdateGame, validateGameId } from '@/lib/validation/game';
import { ZodError } from 'zod';

// GET /api/games/[id] - Get a specific game
async function handleGetGame(request: AuthenticatedRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Await and validate game ID
    const params = await context.params;
    const validatedParams = validateGameId(params);
    
    // Get game
    const game = await GameService.getGame(validatedParams.id, request.user!.id);
    
    if (!game) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'GAME_NOT_FOUND',
            message: 'Game not found or access denied',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: game,
        timestamp: new Date().toISOString(),
      } as ApiResponse<GameConfig>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get game error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid game ID',
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
          message: 'An unexpected error occurred while fetching the game',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// PUT /api/games/[id] - Update a specific game
async function handleUpdateGame(request: AuthenticatedRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Await and validate game ID
    const params = await context.params;
    const validatedParams = validateGameId(params);
    
    const body = await request.json();
    
    // Add ID to body for validation
    const dataWithId = { ...body, id: validatedParams.id };
    
    // Validate request data
    const validatedData = validateUpdateGame(dataWithId);
    
    // Update game
    await GameService.updateGame(validatedParams.id, request.user!.id, validatedData);
    
    return NextResponse.json(
      {
        success: true,
        data: {
          gameId: validatedParams.id,
          message: 'Game updated successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update game error:', error);

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
      if (error.message === 'Game not found or access denied') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'GAME_NOT_FOUND',
              message: error.message,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UPDATE_GAME_ERROR',
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
          message: 'An unexpected error occurred while updating the game',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE /api/games/[id] - Delete a specific game
async function handleDeleteGame(request: AuthenticatedRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Await and validate game ID
    const params = await context.params;
    const validatedParams = validateGameId(params);
    
    // Delete game
    await GameService.deleteGame(validatedParams.id, request.user!.id);
    
    return NextResponse.json(
      {
        success: true,
        data: {
          gameId: validatedParams.id,
          message: 'Game deleted successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete game error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid game ID',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle known errors
    if (error instanceof Error) {
      if (error.message === 'Game not found or access denied') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'GAME_NOT_FOUND',
              message: error.message,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DELETE_GAME_ERROR',
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
          message: 'An unexpected error occurred while deleting the game',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return withAuthSubscriptionAndRateLimit(
    request,
    (req) => handleGetGame(req, context),
    {
      maxRequests: 100, // 100 requests per minute
      windowMs: 60000, // 1 minute
    }
  );
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return withAuthSubscriptionAndRateLimit(
    request,
    (req) => handleUpdateGame(req, context),
    {
      maxRequests: 30, // 30 updates per minute
      windowMs: 60000, // 1 minute
    }
  );
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return withAuthSubscriptionAndRateLimit(
    request,
    (req) => handleDeleteGame(req, context),
    {
      maxRequests: 10, // 10 deletions per minute
      windowMs: 60000, // 1 minute
    }
  );
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'POST method not allowed for this endpoint. Use /api/games instead.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}