import prisma from '@/lib/database';
import { cacheService, CacheKeys, CacheTTL } from '@/lib/redis';
import { GameConfig, CreateGameRequest, UpdateGameRequest } from '@/lib/types';
import { Prisma } from '@prisma/client';

export class GameService {
  // Create a new game
  static async createGame(userId: string, gameData: CreateGameRequest): Promise<{ gameId: string }> {
    const transaction = await prisma.$transaction(async (tx) => {
      // Create the main game record
      const game = await tx.game.create({
        data: {
          userId,
          title: gameData.title,
          description: gameData.description || null,
          rows: gameData.rows,
          columns: gameData.columns,
          jsonConfig: {
            coverImageKey: gameData.coverImageKey || '',
            sounds: gameData.sounds || {},
            mascot: gameData.mascot || { enabled: false },
            backgroundImageKey: gameData.backgroundImageKey || '',
            frameImageKey: gameData.frameImageKey || '',
            styling: gameData.styling || {},
            blockedRegions: gameData.blockedRegions || [],
          } as unknown as Prisma.JsonObject,
          isPublished: false,
        },
      });

      // Create slot items if provided
      if (gameData.slotItems && gameData.slotItems.length > 0) {
        await tx.slotItem.createMany({
          data: gameData.slotItems.map(item => ({
            gameId: game.id,
            name: item.name,
            imageKey: item.imageKey,
            probability: item.probability,
            revenue: item.revenue || null,
            minimumCount: item.minimumCount,
            diagonalPrize: item.diagonalPrize,
          })),
        });
      }

      // Create languages if provided
      if (gameData.availableLanguages && gameData.availableLanguages.length > 0) {
        await tx.language.createMany({
          data: gameData.availableLanguages.map(lang => ({
            gameId: game.id,
            locale: lang.locale,
            jsonStrings: lang.strings as Prisma.JsonObject,
          })),
        });
      }

      // Create regions if provided
      if (gameData.availableRegions && gameData.availableRegions.length > 0) {
        await tx.region.createMany({
          data: gameData.availableRegions.map(region => ({
            gameId: game.id,
            country: region.country,
            currency: region.currency,
            minBet: region.minBet,
            maxBet: region.maxBet,
            step: region.step,
          })),
        });
      }

      return game;
    });

    // Cache the game configuration
    const gameConfig = await this.getGameConfig(transaction.id);
    await cacheService.set(CacheKeys.game(transaction.id), gameConfig, CacheTTL.GAME_CONFIG);

    return { gameId: transaction.id };
  }

  // Get a single game by ID
  static async getGame(gameId: string, userId?: string): Promise<GameConfig | null> {
    // Try to get from cache first
    const cached = await cacheService.get<GameConfig>(CacheKeys.game(gameId));
    if (cached) {
      return cached;
    }

    // Get from database
    const gameConfig = await this.getGameConfig(gameId, userId);
    
    if (gameConfig) {
      // Cache the result
      await cacheService.set(CacheKeys.game(gameId), gameConfig, CacheTTL.GAME_CONFIG);
    }

    return gameConfig;
  }

  // Get game configuration from database
  private static async getGameConfig(gameId: string, userId?: string): Promise<GameConfig | null> {
    const whereClause: Prisma.GameWhereInput = { id: gameId };
    if (userId) {
      whereClause.userId = userId;
    }

    const game = await prisma.game.findFirst({
      where: whereClause,
      include: {
        slotItems: true,
        languages: true,
        regions: true,
        assets: true,
      },
    });

    if (!game) {
      return null;
    }

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
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
      };
  }

  // List games for a user
  static async listGames(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      search?: string;
      published?: boolean;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    } = {}
  ): Promise<{
    games: GameConfig[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, search, published, sortBy = 'updatedAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;

    // Build where clause
    const whereClause: Prisma.GameWhereInput = {
      userId,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (published !== undefined) {
      whereClause.isPublished = published;
    }

    // Build order by clause
    const orderBy: Prisma.GameOrderByWithRelationInput = {};
    if (sortBy === 'title') {
      orderBy.title = sortOrder;
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder;
    } else {
      orderBy.updatedAt = sortOrder;
    }

    // Get total count
    const total = await prisma.game.count({ where: whereClause });

    // Get games
    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        slotItems: true,
        languages: true,
        regions: true,
        assets: true,
      },
      orderBy,
      skip,
      take: limit,
    });

    // Transform to GameConfig format
    const gameConfigs: GameConfig[] = games.map(game => {
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
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
      };
    });

    return {
      games: gameConfigs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Update a game
  static async updateGame(gameId: string, userId: string, gameData: Partial<UpdateGameRequest>): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Check if game exists and belongs to user
      const existingGame = await tx.game.findFirst({
        where: { id: gameId, userId },
      });

      if (!existingGame) {
        throw new Error('Game not found or access denied');
      }

      // Prepare update data
      const updateData: Prisma.GameUpdateInput = {};
      const jsonConfigUpdates: Record<string, unknown> = {};

      if (gameData.title !== undefined) updateData.title = gameData.title;
      if (gameData.description !== undefined) updateData.description = gameData.description;
      if (gameData.rows !== undefined) updateData.rows = gameData.rows;
      if (gameData.columns !== undefined) updateData.columns = gameData.columns;

      // Handle JSON config updates
      if (gameData.coverImageKey !== undefined) jsonConfigUpdates.coverImageKey = gameData.coverImageKey;
      if (gameData.sounds !== undefined) jsonConfigUpdates.sounds = gameData.sounds;
      if (gameData.mascot !== undefined) jsonConfigUpdates.mascot = gameData.mascot;
      if (gameData.backgroundImageKey !== undefined) jsonConfigUpdates.backgroundImageKey = gameData.backgroundImageKey;
      if (gameData.frameImageKey !== undefined) jsonConfigUpdates.frameImageKey = gameData.frameImageKey;
      if (gameData.styling !== undefined) jsonConfigUpdates.styling = gameData.styling;
      if (gameData.blockedRegions !== undefined) jsonConfigUpdates.blockedRegions = gameData.blockedRegions;

      // Merge with existing JSON config
      if (Object.keys(jsonConfigUpdates).length > 0) {
        const currentJsonConfig = existingGame.jsonConfig as Record<string, unknown>;
        updateData.jsonConfig = {
          ...currentJsonConfig,
          ...jsonConfigUpdates,
        } as unknown as Prisma.JsonObject;
      }

      // Update the main game record
      await tx.game.update({
        where: { id: gameId },
        data: updateData,
      });

      // Update slot items if provided
      if (gameData.slotItems !== undefined) {
        // Delete existing slot items
        await tx.slotItem.deleteMany({ where: { gameId } });
        
        // Create new slot items
        if (gameData.slotItems.length > 0) {
          await tx.slotItem.createMany({
            data: gameData.slotItems.map(item => ({
              gameId,
              name: item.name,
              imageKey: item.imageKey,
              probability: item.probability,
              revenue: item.revenue || null,
              minimumCount: item.minimumCount,
              diagonalPrize: item.diagonalPrize,
            })),
          });
        }
      }

      // Update languages if provided
      if (gameData.availableLanguages !== undefined) {
        // Delete existing languages
        await tx.language.deleteMany({ where: { gameId } });
        
        // Create new languages
        if (gameData.availableLanguages.length > 0) {
          await tx.language.createMany({
            data: gameData.availableLanguages.map(lang => ({
              gameId,
              locale: lang.locale,
              jsonStrings: lang.strings as Prisma.JsonObject,
            })),
          });
        }
      }

      // Update regions if provided
      if (gameData.availableRegions !== undefined) {
        // Delete existing regions
        await tx.region.deleteMany({ where: { gameId } });
        
        // Create new regions
        if (gameData.availableRegions.length > 0) {
          await tx.region.createMany({
            data: gameData.availableRegions.map(region => ({
              gameId,
              country: region.country,
              currency: region.currency,
              minBet: region.minBet,
              maxBet: region.maxBet,
              step: region.step,
            })),
          });
        }
      }
    });

    // Invalidate cache
    await cacheService.del(CacheKeys.game(gameId));
  }

  // Delete a game
  static async deleteGame(gameId: string, userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Check if game exists and belongs to user
      const existingGame = await tx.game.findFirst({
        where: { id: gameId, userId },
        include: { assets: true },
      });

      if (!existingGame) {
        throw new Error('Game not found or access denied');
      }

      // Delete the game (cascade will handle related records)
      await tx.game.delete({
        where: { id: gameId },
      });

      // Note: Asset cleanup from S3 should be handled by a background job
      // For now, we'll just delete the database records
    });

    // Invalidate cache
    await cacheService.del(CacheKeys.game(gameId));
  }

  // Check if user owns a game
  static async checkGameOwnership(gameId: string, userId: string): Promise<boolean> {
    const game = await prisma.game.findFirst({
      where: { id: gameId, userId },
      select: { id: true },
    });

    return !!game;
  }

  // Publish/unpublish a game
  static async toggleGamePublication(gameId: string, userId: string, isPublished: boolean): Promise<void> {
    const result = await prisma.game.updateMany({
      where: { id: gameId, userId },
      data: { isPublished },
    });

    if (result.count === 0) {
      throw new Error('Game not found or access denied');
    }

    // Invalidate cache
    await cacheService.del(CacheKeys.game(gameId));
  }

  // Bulk update game status
  static async bulkUpdateGameStatus(gameIds: string[], userId: string, isPublished: boolean): Promise<void> {
    const result = await prisma.game.updateMany({
      where: { 
        id: { in: gameIds },
        userId 
      },
      data: { isPublished },
    });

    if (result.count === 0) {
      throw new Error('No games found or access denied');
    }

    // Invalidate cache for all updated games
    await Promise.all(gameIds.map(gameId => cacheService.del(CacheKeys.game(gameId))));
  }

  // Bulk delete games
  static async bulkDeleteGames(gameIds: string[], userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Check if all games exist and belong to user
      const existingGames = await tx.game.findMany({
        where: { 
          id: { in: gameIds },
          userId 
        },
        select: { id: true },
      });

      if (existingGames.length !== gameIds.length) {
        throw new Error('Some games not found or access denied');
      }

      // Delete the games (cascade will handle related records)
      await tx.game.deleteMany({
        where: { 
          id: { in: gameIds },
          userId 
        },
      });
    });

    // Invalidate cache for all deleted games
    await Promise.all(gameIds.map(gameId => cacheService.del(CacheKeys.game(gameId))));
  }

  // Duplicate a game
  static async duplicateGame(gameId: string, userId: string, newTitle?: string): Promise<{ gameId: string }> {
    const originalGame = await this.getGame(gameId, userId);
    
    if (!originalGame) {
      throw new Error('Game not found or access denied');
    }

    // Create a copy with modified title
    const duplicateData = {
      ...originalGame,
      id: undefined,
      title: newTitle || `${originalGame.title} (Copy)`,
      createdAt: undefined,
      updatedAt: undefined,
      isPublished: false, // New games start as drafts
    };

    // Use the existing createGame method
    return await this.createGame(userId, duplicateData);
  }

  // Get game statistics for a user
  static async getUserGameStats(userId: string): Promise<{
    totalGames: number;
    publishedGames: number;
    draftGames: number;
  }> {
    const [total, published] = await Promise.all([
      prisma.game.count({ where: { userId } }),
      prisma.game.count({ where: { userId, isPublished: true } }),
    ]);

    return {
      totalGames: total,
      publishedGames: published,
      draftGames: total - published,
    };
  }
}