import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/lib/services/marketplace';
import { ApiResponse, UpdateMarketplaceSettingsRequest } from '@/lib/types';
import { withAuthAndRateLimit, AuthenticatedRequest } from '@/lib/middleware';
import { z } from 'zod';

// Validation schema for marketplace settings
const marketplaceSettingsSchema = z.object({
  gameId: z.string().uuid(),
  isAvailableForSale: z.boolean(),
  marketplacePrice: z.number().min(0).optional(),
  marketplaceDescription: z.string().max(2000).optional(),
  isFeatured: z.boolean().optional().default(false),
});

// PUT /api/marketplace/settings - Update marketplace settings for a game
async function handleUpdateMarketplaceSettings(request: AuthenticatedRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = marketplaceSettingsSchema.parse(body);
    
    // Update marketplace settings
    await MarketplaceService.updateMarketplaceSettings(
      validatedData.gameId,
      request.user!.id,
      {
        isAvailableForSale: validatedData.isAvailableForSale,
        marketplacePrice: validatedData.marketplacePrice,
        marketplaceDescription: validatedData.marketplaceDescription,
        isFeatured: validatedData.isFeatured,
      }
    );
    
    return NextResponse.json(
      {
        success: true,
        data: {
          gameId: validatedData.gameId,
          message: 'Marketplace settings updated successfully',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update marketplace settings error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid marketplace settings data',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Handle known errors
    if (error instanceof Error) {
      if (error.message === 'Game not found or access denied') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'GAME_NOT_FOUND',
              message: error.message,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UPDATE_MARKETPLACE_SETTINGS_ERROR',
            message: error.message,
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
          message: 'An unexpected error occurred while updating marketplace settings',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export HTTP method handlers with middleware
export async function PUT(request: NextRequest) {
  return withAuthAndRateLimit(
    request,
    handleUpdateMarketplaceSettings,
    {
      maxRequests: 30, // 30 updates per minute
      windowMs: 60000, // 1 minute
    }
  );
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'GET method not allowed for this endpoint.',
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse,
    { status: 405 }
  );
}

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