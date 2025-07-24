import { PreviewService } from '../services/preview';
import { GameService } from '../services/game';
import { cacheService } from '../redis';

// Mock dependencies
jest.mock('../services/game');
jest.mock('../redis');

const mockGameService = GameService as jest.Mocked<typeof GameService>;
const mockCacheService = cacheService as jest.Mocked<typeof cacheService>;

describe('PreviewService', () => {
  const mockGameConfig = {
    id: 'game-123',
    title: 'Test Game',
    description: 'A test game',
    rows: 3,
    columns: 5,
    coverImageKey: 'cover.jpg',
    sounds: {},
    mascot: { enabled: false },
    backgroundImageKey: 'bg.jpg',
    frameImageKey: 'frame.jpg',
    slotItems: [],
    availableLanguages: [],
    availableRegions: [],
    blockedRegions: [],
    styling: {},
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock environment variable
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
  });

  describe('createPreviewSession', () => {
    it('should create a preview session successfully', async () => {
      // Mock game service to return a valid game
      mockGameService.getGame.mockResolvedValue(mockGameConfig);
      mockCacheService.set.mockResolvedValue(undefined);

      const result = await PreviewService.createPreviewSession('game-123', 'user-456');

      expect(result).toMatchObject({
        gameConfig: mockGameConfig,
        previewUrl: expect.stringContaining('/preview/'),
      });
      expect(result.sessionId).toBeDefined();
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(mockGameService.getGame).toHaveBeenCalledWith('game-123', 'user-456');
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should throw error when game is not found', async () => {
      mockGameService.getGame.mockResolvedValue(null);

      await expect(
        PreviewService.createPreviewSession('invalid-game', 'user-456')
      ).rejects.toThrow('Game not found or access denied');
    });
  });

  describe('getPreviewSession', () => {
    it('should return preview session when valid', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);

      const result = await PreviewService.getPreviewSession('session-123');

      expect(result).toEqual(mockSession);
      expect(mockCacheService.get).toHaveBeenCalledWith('preview:session-123');
    });

    it('should return null when session not found', async () => {
      mockCacheService.get.mockResolvedValue(null);

      const result = await PreviewService.getPreviewSession('invalid-session');

      expect(result).toBeNull();
    });

    it('should clean up expired session', async () => {
      const expiredSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() - 3600000), // 1 hour ago (expired)
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(expiredSession);
      mockCacheService.del.mockResolvedValue(undefined);

      const result = await PreviewService.getPreviewSession('session-123');

      expect(result).toBeNull();
      expect(mockCacheService.del).toHaveBeenCalledWith('preview:session-123');
    });
  });

  describe('validatePreviewSession', () => {
    it('should return game config for valid session', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000),
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);

      const result = await PreviewService.validatePreviewSession('session-123', 'user-456');

      expect(result).toEqual(mockGameConfig);
    });

    it('should return null for invalid user', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000),
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);

      const result = await PreviewService.validatePreviewSession('session-123', 'different-user');

      expect(result).toBeNull();
    });
  });

  describe('deletePreviewSession', () => {
    it('should delete session successfully', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000),
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);
      mockCacheService.del.mockResolvedValue(undefined);

      const result = await PreviewService.deletePreviewSession('session-123', 'user-456');

      expect(result).toBe(true);
      expect(mockCacheService.del).toHaveBeenCalledWith('preview:session-123');
    });

    it('should return false for unauthorized deletion', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000),
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);

      const result = await PreviewService.deletePreviewSession('session-123', 'different-user');

      expect(result).toBe(false);
      expect(mockCacheService.del).not.toHaveBeenCalled();
    });
  });

  describe('getPreviewSessionStats', () => {
    it('should return session statistics', async () => {
      const mockSession = {
        sessionId: 'session-123',
        gameId: 'game-123',
        userId: 'user-456',
        gameConfig: mockGameConfig,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        createdAt: new Date(),
      };

      mockCacheService.get.mockResolvedValue(mockSession);

      const result = await PreviewService.getPreviewSessionStats('session-123');

      expect(result).toMatchObject({
        sessionId: 'session-123',
        gameId: 'game-123',
        gameTitle: 'Test Game',
        isExpired: false,
      });
      expect(result?.timeRemaining).toBeGreaterThan(0);
    });

    it('should return null for non-existent session', async () => {
      mockCacheService.get.mockResolvedValue(null);

      const result = await PreviewService.getPreviewSessionStats('invalid-session');

      expect(result).toBeNull();
    });
  });
});