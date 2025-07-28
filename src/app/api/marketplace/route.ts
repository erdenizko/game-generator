import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/lib/services/marketplace';
import { ApiResponse, PaginatedResponse, MarketplaceGame } from '@/lib/types';
import { withAuthAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { z } from 'zod';

// Validation schema for marketplace query
const marketplaceQuerySchema = z.object({
  page: z.string().optional().default('1').transform(val => parseInt(val, 10)),
  limit: z.string().optional().default('12').transform(val => Math.min(parseInt(val, 10), 50)),
  search: z.string().optional(),
  featured: z.string().optional().transform(val => val === 'true'),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  minPrice: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  maxPrice: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
});

// GET /api/marketplace - List games available for sale
async function handleListMarketplaceGames(request: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // Validate query parameters
    const validatedQuery = marketplaceQuerySchema.parse(queryParams);
    
    // Get marketplace games
    const result = await MarketplaceService.listMarketplaceGames({
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      search: validatedQuery.search,
      featured: validatedQuery.featured,
      sortBy: validatedQuery.sortBy,
      sortOrder: validatedQuery.sortOrder,
      minPrice: validatedQuery.minPrice,
      maxPrice: validatedQuery.maxPrice,
    });
    
    return NextResponse.json(
      {
        success: true,
        data: result.games,
        pagination: result.pagination,
        timestamp: new Date().toISOString(),
      } as PaginatedResponse<MarketplaceGame>,
      { status: 200 }
    );
  } catch (error) {
    console.error('List marketplace games error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid query parameters',
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
          message: 'An unexpected error occurred while fetching marketplace games',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function GET(request: NextRequest) {
  return withAuthAndRateLimit(
    request,
    handleListMarketplaceGames,
    {
      maxRequests: 100, // 100 requests per minute
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