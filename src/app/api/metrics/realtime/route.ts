import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { MetricsService } from '@/lib/services/metrics';
import { withAuth } from '@/lib/middleware';
import { ApiResponse } from '@/lib/types';

// Validation schema for realtime metrics request
const realtimeQuerySchema = z.object({
  gameId: z.string().uuid('Invalid game ID format'),
});

// GET /api/metrics/realtime - Get real-time game statistics
async function getRealtimeMetrics(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse and validate query parameters
    const queryParams = {
      gameId: searchParams.get('gameId'),
    };

    const validatedParams = realtimeQuerySchema.parse(queryParams);

    // Get real-time statistics from service
    const realtimeStats = await MetricsService.getRealtimeStats(validatedParams.gameId);

    return NextResponse.json(
      {
        success: true,
        data: {
          gameId: validatedParams.gameId,
          stats: realtimeStats,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Realtime metrics API error:', error);

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
            message: 'Failed to retrieve real-time metrics',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 500 }
      );
  }
}

// Export GET handler with authentication
export async function GET(request: NextRequest): Promise<NextResponse> {
  return withAuth(request, getRealtimeMetrics);
}