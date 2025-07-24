import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import { SubscriptionService } from '@/lib/subscription';

async function handleGetPlans(): Promise<NextResponse> {
  try {
    const plans = SubscriptionService.getAvailablePlans();

    return NextResponse.json(
      {
        success: true,
        data: { plans },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get plans error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to get subscription plans',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(
    request,
    handleGetPlans,
    { maxRequests: 50, windowMs: 60000 } // 50 requests per minute (public endpoint)
  );
}