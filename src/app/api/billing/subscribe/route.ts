import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuthAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';
import { SubscriptionService } from '@/lib/subscription';

// Validation schema for subscription request
const subscribeSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  successUrl: z.string().url('Valid success URL is required'),
  cancelUrl: z.string().url('Valid cancel URL is required'),
});

async function handleSubscribe(request: AuthenticatedRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { priceId, successUrl, cancelUrl } = subscribeSchema.parse(body);

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

    // Create checkout session using SubscriptionService
    const { sessionId, url } = await SubscriptionService.createCheckoutSession(
      request.user.id,
      request.user.email,
      priceId,
      successUrl,
      cancelUrl,
      request.user.stripeCustomerId
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          sessionId,
          url,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription creation error:', error);

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

    // Handle Stripe errors (they'll be thrown from SubscriptionService)
    if (error instanceof Error && error.message.includes('Stripe')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'STRIPE_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create subscription',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return withAuthAndRateLimit(
    request,
    handleSubscribe,
    { maxRequests: 10, windowMs: 60000 } // 10 requests per minute
  );
}