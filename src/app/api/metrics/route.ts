import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MetricsService, MetricsFilter } from '@/lib/services/metrics';
import { withAuth } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';

// Validation schema for metrics request
const metricsQuerySchema = z.object({
  gameId: z.string().uuid().optional(),
  country: z.string().length(3).optional(),
  currency: z.string().length(3).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// GET /api/metrics - Get game metrics with filtering
async function getMetrics(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const queryParams = {
      gameId: searchParams.get('gameId') || undefined,
      country: searchParams.get('country') || undefined,
      currency: searchParams.get('currency') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    };

    const validatedParams = metricsQuerySchema.parse(queryParams);

    // Build filters
    const filters: MetricsFilter = {};
    
    if (validatedParams.gameId) {
      filters.gameId = validatedParams.gameId;
    }
    
    if (validatedParams.country) {
      filters.country = validatedParams.country;
    }
    
    if (validatedParams.currency) {
      filters.currency = validatedParams.currency;
    }
    
    if (validatedParams.startDate) {
      filters.startDate = new Date(validatedParams.startDate);
    }
    
    if (validatedParams.endDate) {
      filters.endDate = new Date(validatedParams.endDate);
    }

    // Get metrics from service
    const metrics = await MetricsService.getMetrics(filters);

    return NextResponse.json(
      {
        success: true,
        data: {
          metrics,
          filters: validatedParams,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Metrics API error:', error);

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

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to retrieve metrics',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export GET handler with authentication
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuth(request, getMetrics);
}