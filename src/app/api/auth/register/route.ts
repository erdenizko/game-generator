import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { ApiResponse } from '@/lib/types';
import { withRateLimit } from '@/lib/middleware';
import { ZodError } from 'zod';

async function handleRegister(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Email and password are required',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Register user
    const result = await AuthService.register(email, password);

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
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle known errors
    if (error instanceof Error) {
      if (error.message === 'User with this email already exists') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'USER_EXISTS',
              message: error.message,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 409 }
        );
      }
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred during registration',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, handleRegister, {
    maxRequests: 5, // 5 registration attempts per minute
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