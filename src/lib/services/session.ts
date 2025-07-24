import prisma from '@/lib/database';
import { cacheService, CacheKeys, CacheTTL } from '@/lib/redis';
import { SessionData, SessionValidationResult, GameConfig } from '@/lib/types';

export class SessionService {
  /**
   * Validate a session and return session data if valid
   */
  static async validateSession(sessionId: string): Promise<SessionValidationResult> {
    try {
      // Try to get session from cache first
      let sessionData = await cacheService.get<SessionData>(CacheKeys.session(sessionId));

      if (!sessionData) {
        // If not in cache, get from database
        const session = await prisma.session.findUnique({
          where: { id: sessionId },
        });

        if (!session) {
          return {
            isValid: false,
            error: {
              code: 'SESSION_NOT_FOUND',
              message: 'Session not found',
            },
          };
        }

        // Check if session has expired
        if (session.expiresAt < new Date()) {
          return {
            isValid: false,
            error: {
              code: 'SESSION_EXPIRED',
              message: 'Session has expired',
            },
          };
        }

        // Reconstruct session data
        sessionData = {
          gameId: session.gameId,
          playerRef: session.playerRef,
          country: session.country || undefined,
          balance: session.balanceStart ? parseFloat(session.balanceStart.toString()) : 0,
          expiresAt: session.expiresAt,
        };

        // Cache the session data
        const ttlSeconds = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
        if (ttlSeconds > 0) {
          await cacheService.set(CacheKeys.session(sessionId), sessionData, ttlSeconds);
        }
      }

      // Check if session has expired
      if (sessionData.expiresAt < new Date()) {
        // Remove expired session from cache
        await cacheService.del(CacheKeys.session(sessionId));
        
        return {
          isValid: false,
          error: {
            code: 'SESSION_EXPIRED',
            message: 'Session has expired',
          },
        };
      }

      return {
        isValid: true,
        sessionData,
      };

    } catch (error) {
      console.error('Session validation error:', error);
      return {
        isValid: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Failed to validate session',
        },
      };
    }
  }

  /**
   * Get game configuration for a session
   */
  static async getGameConfigForSession(sessionId: string): Promise<GameConfig | null> {
    try {
      const validation = await this.validateSession(sessionId);
      
      if (!validation.isValid || !validation.sessionData) {
        return null;
      }

      // Get game configuration from cache
      let gameConfig = await cacheService.get<GameConfig>(CacheKeys.game(validation.sessionData.gameId));

      if (!gameConfig) {
        // If not in cache, get from database
        const game = await prisma.game.findUnique({
          where: { 
            id: validation.sessionData.gameId,
            isPublished: true,
          },
          include: {
            slotItems: true,
            regions: true,
            languages: true,
          },
        });

        if (!game) {
          return null;
        }

        // Reconstruct game configuration
        const gameJsonConfig = game.jsonConfig as unknown as GameConfig;
        gameConfig = {
          ...gameJsonConfig,
          id: game.id,
          title: game.title,
          description: game.description || '',
          rows: game.rows,
          columns: game.columns,
          slotItems: game.slotItems.map(item => ({
            id: item.id,
            name: item.name,
            imageKey: item.imageKey,
            probability: parseFloat(item.probability.toString()),
            revenue: item.revenue ? parseFloat(item.revenue.toString()) : undefined,
            minimumCount: item.minimumCount,
            diagonalPrize: item.diagonalPrize,
          })),
          availableRegions: game.regions.map(region => ({
            country: region.country,
            currency: region.currency,
            minBet: parseFloat(region.minBet.toString()),
            maxBet: parseFloat(region.maxBet.toString()),
            step: parseFloat(region.step.toString()),
          })),
          availableLanguages: game.languages.map(lang => ({
            locale: lang.locale,
            strings: lang.jsonStrings as Record<string, string>,
          })),
        };

        // Cache the game configuration
        await cacheService.set(CacheKeys.game(validation.sessionData.gameId), gameConfig, CacheTTL.GAME_CONFIG);
      }

      return gameConfig;

    } catch (error) {
      console.error('Get game config for session error:', error);
      return null;
    }
  }

  /**
   * Update session balance
   */
  static async updateSessionBalance(sessionId: string, newBalance: number): Promise<boolean> {
    try {
      const validation = await this.validateSession(sessionId);
      
      if (!validation.isValid || !validation.sessionData) {
        return false;
      }

      // Update session data in cache
      const updatedSessionData: SessionData = {
        ...validation.sessionData,
        balance: newBalance,
      };

      const ttlSeconds = Math.floor((validation.sessionData.expiresAt.getTime() - Date.now()) / 1000);
      if (ttlSeconds > 0) {
        await cacheService.set(CacheKeys.session(sessionId), updatedSessionData, ttlSeconds);
      }

      // Update database record
      await prisma.session.update({
        where: { id: sessionId },
        data: { balanceStart: newBalance },
      });

      return true;

    } catch (error) {
      console.error('Update session balance error:', error);
      return false;
    }
  }

  /**
   * Extend session expiration
   */
  static async extendSession(sessionId: string, additionalHours: number = 4): Promise<boolean> {
    try {
      const validation = await this.validateSession(sessionId);
      
      if (!validation.isValid || !validation.sessionData) {
        return false;
      }

      const newExpirationTime = new Date(Date.now() + additionalHours * 60 * 60 * 1000);

      // Update session data in cache
      const updatedSessionData: SessionData = {
        ...validation.sessionData,
        expiresAt: newExpirationTime,
      };

      const ttlSeconds = Math.floor((newExpirationTime.getTime() - Date.now()) / 1000);
      if (ttlSeconds > 0) {
        await cacheService.set(CacheKeys.session(sessionId), updatedSessionData, ttlSeconds);
      }

      // Update database record
      await prisma.session.update({
        where: { id: sessionId },
        data: { expiresAt: newExpirationTime },
      });

      return true;

    } catch (error) {
      console.error('Extend session error:', error);
      return false;
    }
  }

  /**
   * Invalidate session (logout/cleanup)
   */
  static async invalidateSession(sessionId: string): Promise<boolean> {
    try {
      // Remove from cache
      await cacheService.del(CacheKeys.session(sessionId));

      // Update database to mark as expired
      await prisma.session.update({
        where: { id: sessionId },
        data: { expiresAt: new Date() }, // Set to current time to mark as expired
      });

      return true;

    } catch (error) {
      console.error('Invalidate session error:', error);
      return false;
    }
  }

  /**
   * Get active sessions count for a game
   */
  static async getActiveSessionsCount(gameId: string): Promise<number> {
    try {
      const count = await prisma.session.count({
        where: {
          gameId,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      return count;

    } catch (error) {
      console.error('Get active sessions count error:', error);
      return 0;
    }
  }

  /**
   * Cleanup expired sessions (should be run periodically)
   */
  static async cleanupExpiredSessions(): Promise<number> {
    try {
      const result = await prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      console.log(`Cleaned up ${result.count} expired sessions`);
      return result.count;

    } catch (error) {
      console.error('Cleanup expired sessions error:', error);
      return 0;
    }
  }

  /**
   * Generate iframe URL for a session
   */
  static generateIframeUrl(sessionId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return `${baseUrl}/game/${sessionId}`;
  }

  /**
   * Validate session token (for external casino integration)
   */
  static async validateSessionToken(token: string): Promise<{ isValid: boolean; sessionId?: string }> {
    try {
      // This is a placeholder for token validation logic
      // In a real implementation, you would verify the token signature
      // and extract the session ID from it
      
      // For now, we'll assume the token is the session ID itself
      // In production, you should implement proper JWT or similar token validation
      const sessionId = token;
      
      const validation = await this.validateSession(sessionId);
      
      return {
        isValid: validation.isValid,
        sessionId: validation.isValid ? sessionId : undefined,
      };

    } catch (error) {
      console.error('Validate session token error:', error);
      return { isValid: false };
    }
  }
}