import { NextRequest, NextResponse } from 'next/server';
import { PreviewService } from '@/lib/services/preview';
import { ApiResponse, PreviewSessionResponse } from '@/lib/types';
import { withAuthSubscriptionAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { validateCreatePreviewSession } from '@/lib/validation/game';
import { ZodError } from 'zod';

// GET /api/game/preview - Create a new preview session
async function handleCreatePreviewSession(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_GAME_ID',
            message: 'Game ID is required as query parameter',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Validate game ID
    const validatedData = validateCreatePreviewSession({ gameId });
    
    // Create preview session
    const previewSession = await PreviewService.createPreviewSession(
      validatedData.gameId,
      request.user!.id
    );
    
    return NextResponse.json(
      {
        success: true,
        data: previewSession,
        timestamp: new Date().toISOString(),
      } as ApiResponse<PreviewSessionResponse>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create preview session error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid game ID format',
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
            code: 'PREVIEW_SESSION_ERROR',
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
          message: 'An unexpected error occurred while creating preview session',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function GET(request: NextRequest) {
  return withAuthSubscriptionAndRateLimit(
    request,
    handleCreatePreviewSession,
    {
      maxRequests: 30, // 30 preview sessions per minute
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
        message: 'POST method not allowed. Use GET with gameId query parameter.',
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