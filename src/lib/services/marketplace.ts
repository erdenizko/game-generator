import prisma from '@/lib/database';
import { cacheService, CacheKeys, CacheTTL } from '@/lib/redis';
import { MarketplaceGame, GamePurchase } from '@/lib/types';
import { Prisma } from '@prisma/client';

export class MarketplaceService {
  // List games available for sale in marketplace
  static async listMarketplaceGames(options: {
    page?: number;
    limit?: number;
    search?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
  } = {}): Promise<{
    games: MarketplaceGame[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      featured, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = options;
    const skip = (page - 1) * limit;

    // Build where clause
    const whereClause: Prisma.GameWhereInput = {
      isPublished: true,
      isAvailableForSale: true,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { marketplaceDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (featured !== undefined) {
      whereClause.isFeatured = featured;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.marketplacePrice = {};
      if (minPrice !== undefined) {
        whereClause.marketplacePrice.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        whereClause.marketplacePrice.lte = maxPrice;
      }
    }

    // Build order by clause
    const orderBy: Prisma.GameOrderByWithRelationInput = {};
    if (sortBy === 'title') {
      orderBy.title = sortOrder;
    } else if (sortBy === 'price') {
      orderBy.marketplacePrice = sortOrder;
    } else if (sortBy === 'featured') {
      orderBy.isFeatured = sortOrder;
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder;
    } else {
      orderBy.updatedAt = sortOrder;
    }

    // Get total count
    const total = await prisma.game.count({ where: whereClause });

    // Get games with owner info and purchase count
    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        slotItems: true,
        languages: true,
        regions: true,
        purchases: {
          where: {
            status: 'completed',
          },
          select: {
            id: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    // Transform to MarketplaceGame format
    const marketplaceGames: MarketplaceGame[] = games.map(game => {
      const jsonConfig = game.jsonConfig as {
        coverImageKey?: string;
        sounds?: Record<string, string>;
        mascot?: { enabled: boolean; [key: string]: string | boolean };
        backgroundImageKey?: string;
        frameImageKey?: string;
        styling?: Record<string, string>;
        blockedRegions?: string[];
      };

      return {
        id: game.id,
        title: game.title,
        description: game.description || '',
        rows: game.rows,
        columns: game.columns,
        coverImageKey: jsonConfig.coverImageKey || '',
        sounds: jsonConfig.sounds || {},
        mascot: jsonConfig.mascot || { enabled: false },
        backgroundImageKey: jsonConfig.backgroundImageKey || '',
        frameImageKey: jsonConfig.frameImageKey || '',
        slotItems: game.slotItems.map(item => ({
          id: item.id,
          name: item.name,
          imageKey: item.imageKey,
          probability: Number(item.probability),
          revenue: item.revenue ? Number(item.revenue) : undefined,
          minimumCount: item.minimumCount,
          diagonalPrize: item.diagonalPrize,
        })),
        availableLanguages: game.languages.map(lang => ({
          locale: lang.locale,
          strings: lang.jsonStrings as Record<string, string>,
        })),
        availableRegions: game.regions.map(region => ({
          country: region.country,
          currency: region.currency,
          minBet: Number(region.minBet),
          maxBet: Number(region.maxBet),
          step: Number(region.step),
        })),
        blockedRegions: jsonConfig.blockedRegions || [],
        styling: jsonConfig.styling || {},
        isPublished: game.isPublished,
        isAvailableForSale: game.isAvailableForSale,
        marketplacePrice: game.marketplacePrice ? Number(game.marketplacePrice) : undefined,
        marketplaceDescription: game.marketplaceDescription || undefined,
        isFeatured: game.isFeatured,
        ownerId: game.user.id,
        ownerEmail: game.user.email,
        purchaseCount: game.purchases.length,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
      };
    });

    return {
      games: marketplaceGames,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Update marketplace settings for a game
  static async updateMarketplaceSettings(
    gameId: string,
    userId: string,
    settings: {
      isAvailableForSale: boolean;
      marketplacePrice?: number;
      marketplaceDescription?: string;
      isFeatured?: boolean;
    }
  ): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Check if game exists and belongs to user
      const existingGame = await tx.game.findFirst({
        where: { id: gameId, userId },
      });

      if (!existingGame) {
        throw new Error('Game not found or access denied');
      }

      // Validate settings
      if (settings.isAvailableForSale && !settings.marketplacePrice) {
        throw new Error('Price is required when making game available for sale');
      }

      if (settings.marketplacePrice && settings.marketplacePrice <= 0) {
        throw new Error('Price must be greater than 0');
      }

      // Update marketplace settings
      await tx.game.update({
        where: { id: gameId },
        data: {
          isAvailableForSale: settings.isAvailableForSale,
          marketplacePrice: settings.marketplacePrice || null,
          marketplaceDescription: settings.marketplaceDescription || null,
          isFeatured: settings.isFeatured || false,
        },
      });
    });

    // Invalidate game cache
    await cacheService.del(CacheKeys.game(gameId));
  }

  // Remove game from marketplace (but keep purchases)
  static async removeFromMarketplace(gameId: string, userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Check if game exists and belongs to user
      const existingGame = await tx.game.findFirst({
        where: { id: gameId, userId },
      });

      if (!existingGame) {
        throw new Error('Game not found or access denied');
      }

      // Remove from marketplace
      await tx.game.update({
        where: { id: gameId },
        data: {
          isAvailableForSale: false,
          isFeatured: false,
        },
      });
    });

    // Invalidate game cache
    await cacheService.del(CacheKeys.game(gameId));
  }

  // Purchase a game from marketplace
  static async purchaseGame(
    gameId: string,
    buyerId: string,
    stripePaymentId?: string
  ): Promise<{ purchaseId: string }> {
    const purchase = await prisma.$transaction(async (tx) => {
      // Check if game is available for sale
      const game = await tx.game.findFirst({
        where: { 
          id: gameId, 
          isPublished: true,
          isAvailableForSale: true,
        },
      });

      if (!game) {
        throw new Error('Game not found or not available for purchase');
      }

      if (game.userId === buyerId) {
        throw new Error('Cannot purchase your own game');
      }

      if (!game.marketplacePrice) {
        throw new Error('Game price not set');
      }

      // Check if user already purchased this game
      const existingPurchase = await tx.gamePurchase.findFirst({
        where: {
          gameId,
          buyerId,
          status: 'completed',
        },
      });

      if (existingPurchase) {
        throw new Error('Game already purchased');
      }

      // Create purchase record
      const purchase = await tx.gamePurchase.create({
        data: {
          buyerId,
          gameId,
          purchasePrice: game.marketplacePrice,
          stripePaymentId,
          status: 'completed',
        },
      });

      return purchase;
    });

    return { purchaseId: purchase.id };
  }

  // Get user's purchased games
  static async getUserPurchases(
    userId: string,
    options: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{
    purchases: Array<GamePurchase & { game: MarketplaceGame }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 12 } = options;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.gamePurchase.count({
      where: {
        buyerId: userId,
        status: 'completed',
      },
    });

    // Get purchases with game details
    const purchases = await prisma.gamePurchase.findMany({
      where: {
        buyerId: userId,
        status: 'completed',
      },
      include: {
        game: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
            slotItems: true,
            languages: true,
            regions: true,
            purchases: {
              where: {
                status: 'completed',
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    // Transform the data
    const transformedPurchases = purchases.map(purchase => {
      const game = purchase.game;
      const jsonConfig = game.jsonConfig as {
        coverImageKey?: string;
        sounds?: Record<string, string>;
        mascot?: { enabled: boolean; [key: string]: string | boolean };
        backgroundImageKey?: string;
        frameImageKey?: string;
        styling?: Record<string, string>;
        blockedRegions?: string[];
      };

      return {
        id: purchase.id,
        buyerId: purchase.buyerId,
        gameId: purchase.gameId,
        purchasePrice: Number(purchase.purchasePrice),
        stripePaymentId: purchase.stripePaymentId || undefined,
        status: purchase.status as 'completed' | 'refunded' | 'cancelled',
        createdAt: purchase.createdAt,
        updatedAt: purchase.updatedAt,
        game: {
          id: game.id,
          title: game.title,
          description: game.description || '',
          rows: game.rows,
          columns: game.columns,
          coverImageKey: jsonConfig.coverImageKey || '',
          sounds: jsonConfig.sounds || {},
          mascot: jsonConfig.mascot || { enabled: false },
          backgroundImageKey: jsonConfig.backgroundImageKey || '',
          frameImageKey: jsonConfig.frameImageKey || '',
          slotItems: game.slotItems.map(item => ({
            id: item.id,
            name: item.name,
            imageKey: item.imageKey,
            probability: Number(item.probability),
            revenue: item.revenue ? Number(item.revenue) : undefined,
            minimumCount: item.minimumCount,
            diagonalPrize: item.diagonalPrize,
          })),
          availableLanguages: game.languages.map(lang => ({
            locale: lang.locale,
            strings: lang.jsonStrings as Record<string, string>,
          })),
          availableRegions: game.regions.map(region => ({
            country: region.country,
            currency: region.currency,
            minBet: Number(region.minBet),
            maxBet: Number(region.maxBet),
            step: Number(region.step),
          })),
          blockedRegions: jsonConfig.blockedRegions || [],
          styling: jsonConfig.styling || {},
          isPublished: game.isPublished,
          isAvailableForSale: game.isAvailableForSale,
          marketplacePrice: game.marketplacePrice ? Number(game.marketplacePrice) : undefined,
          marketplaceDescription: game.marketplaceDescription || undefined,
          isFeatured: game.isFeatured,
          ownerId: game.user.id,
          ownerEmail: game.user.email,
          purchaseCount: game.purchases.length,
          createdAt: game.createdAt,
          updatedAt: game.updatedAt,
        } as MarketplaceGame,
      };
    });

    return {
      purchases: transformedPurchases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Check if user has purchased a game
  static async hasPurchasedGame(gameId: string, userId: string): Promise<boolean> {
    const purchase = await prisma.gamePurchase.findFirst({
      where: {
        gameId,
        buyerId: userId,
        status: 'completed',
      },
    });

    return !!purchase;
  }
}