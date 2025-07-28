import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/lib/services/marketplace';
import { ApiResponse } from '@/lib/types';
import { withAuthAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { z } from 'zod';

// Validation schema for marketplace removal
const marketplaceRemovalSchema = z.object({
  gameId: z.string().uuid(),
});

// POST /api/marketplace/remove - Remove a game from marketplace
async function handleRemoveFromMarketplace(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = marketplaceRemovalSchema.parse(body);
    
    // Remove from marketplace
    await MarketplaceService.removeFromMarketplace(
      validatedData.gameId,
      request.user!.id
    );
    
    return NextResponse.json(
      {
        success: true,
        data: {
          gameId: validatedData.gameId,
          message: 'Game removed from marketplace successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Remove from marketplace error:', error);

    // Handle validation errors
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
            code: 'REMOVE_FROM_MARKETPLACE_ERROR',
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
          message: 'An unexpected error occurred while removing game from marketplace',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function POST(request: NextRequest) {
  return withAuthAndRateLimit(
    request,
    handleRemoveFromMarketplace,
    {
      maxRequests: 30, // 30 removals per minute
      windowMs: 60000, // 1 minute
    }
  );
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'GET method not allowed for this endpoint.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'PUT method not allowed for this endpoint.',
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
        message: 'DELETE method not allowed for this endpoint.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}