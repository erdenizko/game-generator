import { NextRequest, NextResponse } from 'next/server';
import { withAuthAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import { SubscriptionService } from '@/lib/subscription';

async function handleGetStatus(request: AuthenticatedRequest): Promise<NextResponse> {
  try {
    if (!request.user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Get user's subscription
    const subscription = await SubscriptionService.getUserSubscription(request.user.id);
    
    // Get subscription usage
    const usage = await SubscriptionService.getSubscriptionUsage(request.user.id);
    
    // Check if user has active subscription
    const hasActiveSubscription = await SubscriptionService.hasActiveSubscription(request.user.id);

    return NextResponse.json(
      {
        success: true,
        data: {
          subscription,
          usage,
          hasActiveSubscription,
          canCreateGame: await SubscriptionService.canCreateGame(request.user.id),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get subscription status error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to get subscription status',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuthAndRateLimit(
    request,
    handleGetStatus,
    { maxRequests: 30, windowMs: 60000 } // 30 requests per minute
  );
}