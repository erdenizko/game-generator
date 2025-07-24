import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';

async function handleGetMe(request: AuthenticatedRequest) {
  try {
    // User is guaranteed to exist due to withAuth middleware
    const user = request.user!;

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user profile error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while fetching user profile',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return withAuth(request, handleGetMe);
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'POST method not allowed for this endpoint',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}