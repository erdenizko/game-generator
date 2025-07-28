import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';
import { withRateLimit } from '@/lib/middleware';

async function handleRefreshToken(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');

    if ((!authHeader || !authHeader.startsWith('Bearer '))) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_TOKEN',
            message: 'Authorization token is required',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Refresh token
    const result = await AuthService.refreshToken(token);

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
            createdAt: result.user.createdAt,
          },
          token: result.token,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Token refresh error:', error);

    if (error instanceof Error) {
      if (error.message === 'Token has expired') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'TOKEN_EXPIRED',
              message: 'Token has expired, please login again',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 401 }
        );
      }

      if (error.message === 'Invalid token') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_TOKEN',
              message: 'Invalid token',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 401 }
        );
      }

      if (error.message === 'User not found') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'USER_NOT_FOUND',
              message: 'User not found',
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred during token refresh',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, handleRefreshToken, {
    maxRequests: 20, // 20 refresh attempts per minute
    windowMs: 60000, // 1 minute
  });
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'GET method not allowed for this endpoint',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}