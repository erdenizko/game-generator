import { v4 as uuidv4 } from 'uuid';
import { cacheService, CacheKeys, CacheTTL } from '@/lib/redis';
import { GameService } from './game';
import { 
  PreviewSession, 
  PreviewSessionResponse, 
  GameConfig 
} from '@/lib/types';

export class PreviewService {
  // Create a new preview session
  static async createPreviewSession(
    gameId: string, 
    userId: string
  ): Promise<PreviewSessionResponse> {
    // First, verify the game exists and belongs to the user
    const gameConfig = await GameService.getGame(gameId, userId);
    
    if (!gameConfig) {
      throw new Error('Game not found or access denied');
    }

    // Generate unique session ID
    const sessionId = uuidv4();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CacheTTL.PREVIEW_SESSION * 1000);

    // Create preview session object
    const previewSession: PreviewSession = {
      sessionId,
      gameId,
      userId,
      gameConfig,
      expiresAt,
      createdAt: now,
    };

    // Store session in Redis with 2-hour expiration
    await cacheService.set(
      CacheKeys.preview(sessionId),
      previewSession,
      CacheTTL.PREVIEW_SESSION
    );

    // Generate preview URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const previewUrl = `${baseUrl}/preview/${sessionId}`;

    return {
      sessionId,
      gameConfig,
      expiresAt,
      previewUrl,
    };
  }

  // Get preview session by ID
  static async getPreviewSession(sessionId: string): Promise<PreviewSession | null> {
    try {
      const session = await cacheService.get<PreviewSession>(
        CacheKeys.preview(sessionId)
      );

      if (!session) {
        return null;
      }

      // Check if session has expired
      const now = new Date();
      if (now > new Date(session.expiresAt)) {
        // Clean up expired session
        await cacheService.del(CacheKeys.preview(sessionId));
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error retrieving preview session:', error);
      return null;
    }
  }

  // Validate preview session and return game config
  static async validatePreviewSession(
    sessionId: string, 
    userId?: string
  ): Promise<GameConfig | null> {
    const session = await this.getPreviewSession(sessionId);

    if (!session) {
      return null;
    }

    // If userId is provided, verify ownership
    if (userId && session.userId !== userId) {
      return null;
    }

    return session.gameConfig;
  }

  // Delete preview session
  static async deletePreviewSession(sessionId: string, userId: string): Promise<boolean> {
    const session = await this.getPreviewSession(sessionId);

    if (!session || session.userId !== userId) {
      return false;
    }

    await cacheService.del(CacheKeys.preview(sessionId));
    return true;
  }

  // List active preview sessions for a user
  static async getUserPreviewSessions(userId: string): Promise<PreviewSession[]> {
    // Note: This is a simplified implementation. In production, you might want to
    // maintain a separate index of user sessions for efficient querying
    // For now, this method is not fully implemented as it would require
    // scanning all preview keys, which is not efficient with Redis
    
    // This could be implemented by maintaining a set of session IDs per user
    // or by using a different data structure
    
    return [];
  }

  // Clean up expired sessions (utility method for background jobs)
  static async cleanupExpiredSessions(): Promise<number> {
    // This would typically be called by a background job
    // Implementation would scan for expired sessions and remove them
    // For now, Redis TTL handles automatic cleanup
    
    return 0;
  }

  // Extend preview session expiration
  static async extendPreviewSession(
    sessionId: string, 
    userId: string,
    additionalMinutes: number = 60
  ): Promise<boolean> {
    const session = await this.getPreviewSession(sessionId);

    if (!session || session.userId !== userId) {
      return false;
    }

    // Update expiration time
    const newExpiresAt = new Date(
      Date.now() + (additionalMinutes * 60 * 1000)
    );

    const updatedSession: PreviewSession = {
      ...session,
      expiresAt: newExpiresAt,
    };

    // Update session in Redis with new TTL
    const newTtlSeconds = Math.floor(
      (newExpiresAt.getTime() - Date.now()) / 1000
    );

    await cacheService.set(
      CacheKeys.preview(sessionId),
      updatedSession,
      newTtlSeconds
    );

    return true;
  }

  // Get session statistics
  static async getPreviewSessionStats(sessionId: string): Promise<{
    sessionId: string;
    gameId: string;
    gameTitle: string;
    createdAt: Date;
    expiresAt: Date;
    timeRemaining: number; // in seconds
    isExpired: boolean;
  } | null> {
    const session = await this.getPreviewSession(sessionId);

    if (!session) {
      return null;
    }

    const now = new Date();
    const timeRemaining = Math.max(0, 
      Math.floor((new Date(session.expiresAt).getTime() - now.getTime()) / 1000)
    );

    return {
      sessionId: session.sessionId,
      gameId: session.gameId,
      gameTitle: session.gameConfig.title,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      timeRemaining,
      isExpired: timeRemaining === 0,
    };
  }
}