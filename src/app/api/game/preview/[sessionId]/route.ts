import { NextRequest, NextResponse } from 'next/server';
import { PreviewService } from '@/lib/services/preview';
import { ApiResponse } from '@/lib/types';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import { validatePreviewSessionId } from '@/lib/validation/game';
import { ZodError } from 'zod';

// GET /api/game/preview/[sessionId] - Get preview session and game config
async function handleGetPreviewSession(
  request: AuthenticatedRequest, 
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Await and validate session ID
    const params = await context.params;
    const validatedParams = validatePreviewSessionId(params);
    
    // Get preview session
    const session = await PreviewService.getPreviewSession(validatedParams.sessionId);
    
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PREVIEW_SESSION_NOT_FOUND',
            message: 'Preview session not found or has expired',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Check if user has access to this session (optional - for security)
    // For preview sessions, we might allow public access or restrict to owner
    // For now, let's allow the owner and optionally make it public
    const isOwner = request.user && session.userId === request.user.id;
    
    // For security, only allow owner to access preview session
    if (!isOwner) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACCESS_DENIED',
            message: 'Access denied to this preview session',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: {
          sessionId: session.sessionId,
          gameId: session.gameId,
          gameConfig: session.gameConfig,
          expiresAt: session.expiresAt,
          createdAt: session.createdAt,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get preview session error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid session ID format',
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
          message: 'An unexpected error occurred while fetching preview session',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE /api/game/preview/[sessionId] - Delete preview session
async function handleDeletePreviewSession(
  request: AuthenticatedRequest, 
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Await and validate session ID
    const params = await context.params;
    const validatedParams = validatePreviewSessionId(params);
    
    // Delete preview session
    const deleted = await PreviewService.deletePreviewSession(
      validatedParams.sessionId,
      request.user!.id
    );
    
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PREVIEW_SESSION_NOT_FOUND',
            message: 'Preview session not found or access denied',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: {
          sessionId: validatedParams.sessionId,
          message: 'Preview session deleted successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete preview session error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid session ID format',
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
          message: 'An unexpected error occurred while deleting preview session',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function GET(request: NextRequest, context: { params: Promise<{ sessionId: string }> }) {
  return withAuth(request, (req) => handleGetPreviewSession(req, context));
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ sessionId: string }> }) {
  return withAuth(request, (req) => handleDeletePreviewSession(req, context));
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'POST method not allowed for this endpoint.',
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