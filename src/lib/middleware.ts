import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth';
import { ApiResponse, User } from './types';
import prisma from './database';

// Rate limiting storage (in production, this should use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'); // 1 minute
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

// JWT Authentication Middleware
export async function withAuth(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const authCookie = request.cookies.get('session-token')?.value;
    console.log('authCookie',authCookie);
    console.log('authHeader',authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
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

    // Verify token
    const payload = AuthService.verifyToken(token);

    // Get user details
    const user = await AuthService.getUserById(payload.userId);

    if (!user) {
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

    // Add user to request
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = user;

    // Call the handler with authenticated request
    return await handler(authenticatedRequest);
  } catch (error) {
    console.error('Authentication middleware error:', error);

    if (error instanceof Error) {
      if (error.message === 'Token has expired') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'TOKEN_EXPIRED',
              message: 'Token has expired',
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
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: 'Authentication failed',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 401 }
    );
  }
}

// Rate Limiting Middleware
export function withRateLimit(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: { maxRequests?: number; windowMs?: number }
): Promise<NextResponse> {
  const maxRequests = options?.maxRequests || RATE_LIMIT_MAX_REQUESTS;
  const windowMs = options?.windowMs || RATE_LIMIT_WINDOW_MS;

  // Get client IP
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    request.headers.get('cf-connecting-ip') || // Cloudflare
    'unknown';

  // Create rate limit key
  const key = `${clientIP}:${request.nextUrl.pathname}`;
  const now = Date.now();

  // Get or create rate limit entry
  let rateLimitEntry = rateLimitStore.get(key);

  if (!rateLimitEntry || now > rateLimitEntry.resetTime) {
    // Create new entry or reset expired entry
    rateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, rateLimitEntry);
  } else {
    // Increment existing entry
    rateLimitEntry.count++;
  }

  // Check if rate limit exceeded
  if (rateLimitEntry.count > maxRequests) {
    const resetTimeSeconds = Math.ceil((rateLimitEntry.resetTime - now) / 1000);

    return Promise.resolve(
      NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests',
            details: {
              limit: maxRequests,
              remaining: 0,
              resetTime: new Date(rateLimitEntry.resetTime).toISOString(),
              retryAfter: resetTimeSeconds,
            },
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitEntry.resetTime.toString(),
            'Retry-After': resetTimeSeconds.toString(),
          },
        }
      )
    );
  }

  // Add rate limit headers to response
  const remaining = Math.max(0, maxRequests - rateLimitEntry.count);

  return handler(request).then(response => {
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitEntry!.resetTime.toString());
    return response;
  });
}

// Combined Auth + Rate Limit Middleware
export async function withAuthAndRateLimit(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  rateLimitOptions?: { maxRequests?: number; windowMs?: number }
): Promise<NextResponse> {
  return withRateLimit(
    request,
    (req) => withAuth(req, handler),
    rateLimitOptions
  );
}

// Subscription validation middleware
export async function withSubscription(
  request: AuthenticatedRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
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

  try {
    // Check if user has active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: request.user.id,
        status: 'active',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SUBSCRIPTION_REQUIRED',
            message: 'Active subscription required to access this feature',
            details: {
              userId: request.user.id,
              redirectUrl: '/billing/subscribe',
            },
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Check if subscription is expired (if renewAt is set and in the past)
    if (subscription.renewAt && subscription.renewAt < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SUBSCRIPTION_EXPIRED',
            message: 'Subscription has expired',
            details: {
              expiredAt: subscription.renewAt.toISOString(),
              redirectUrl: '/billing/subscribe',
            },
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 403 }
      );
    }

    return await handler(request);
  } catch (error) {
    console.error('Subscription validation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SUBSCRIPTION_CHECK_FAILED',
          message: 'Failed to validate subscription',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Combined Auth + Subscription + Rate Limit Middleware
export async function withAuthSubscriptionAndRateLimit(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  rateLimitOptions?: { maxRequests?: number; windowMs?: number }
): Promise<NextResponse> {
  return withRateLimit(
    request,
    (req) => withAuth(req, (authReq) => withSubscription(authReq, handler)),
    rateLimitOptions
  );
}

// Utility function to get user's subscription status
export async function getUserSubscriptionStatus(userId: string): Promise<{
  hasActiveSubscription: boolean;
  subscription?: {
    id: string;
    plan: string;
    status: string;
    renewAt?: Date;
  };
}> {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: ['active', 'past_due'], // Include past_due as potentially recoverable
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return { hasActiveSubscription: false };
    }

    const isActive = subscription.status === 'active' && 
      (!subscription.renewAt || subscription.renewAt > new Date());

    return {
      hasActiveSubscription: isActive,
      subscription: {
        id: subscription.id,
        plan: subscription.plan,
        status: subscription.status,
        renewAt: subscription.renewAt || undefined,
      },
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { hasActiveSubscription: false };
  }
}

// Utility function to extract user from request
export function getAuthenticatedUser(request: AuthenticatedRequest): User | null {
  return request.user || null;
}

// Utility function to check if user has specific role
export function hasRole(user: User, role: string): boolean {
  return user.role === role;
}

// Utility function to check if user is admin
export function isAdmin(user: User): boolean {
  return hasRole(user, 'admin');
}

// Utility function to check if user is owner
export function isOwner(user: User): boolean {
  return hasRole(user, 'owner');
}

// Clean up expired rate limit entries (should be called periodically)
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Start cleanup interval (clean up every 5 minutes)
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}