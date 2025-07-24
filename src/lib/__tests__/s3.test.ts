import { validateFileType, validateFileSize, generateAssetKey, AssetType } from '../s3';

describe('S3 Service', () => {
  describe('validateFileType', () => {
    it('should validate image file types correctly', () => {
      expect(validateFileType('image/jpeg', 'image')).toBe(true);
      expect(validateFileType('image/png', 'image')).toBe(true);
      expect(validateFileType('image/webp', 'image')).toBe(true);
      expect(validateFileType('image/gif', 'image')).toBe(false);
      expect(validateFileType('text/plain', 'image')).toBe(false);
    });

    it('should validate audio file types correctly', () => {
      expect(validateFileType('audio/mpeg', 'audio')).toBe(true);
      expect(validateFileType('audio/mp3', 'audio')).toBe(true);
      expect(validateFileType('audio/wav', 'audio')).toBe(true);
      expect(validateFileType('audio/ogg', 'audio')).toBe(true);
      expect(validateFileType('audio/flac', 'audio')).toBe(false);
      expect(validateFileType('video/mp4', 'audio')).toBe(false);
    });

    it('should validate mascot file types correctly', () => {
      expect(validateFileType('image/jpeg', 'mascot')).toBe(true);
      expect(validateFileType('image/png', 'mascot')).toBe(true);
      expect(validateFileType('image/webp', 'mascot')).toBe(true);
      expect(validateFileType('image/gif', 'mascot')).toBe(false);
    });
  });

  describe('validateFileSize', () => {
    it('should validate image file sizes correctly', () => {
      expect(validateFileSize(1024 * 1024, 'image')).toBe(true); // 1MB
      expect(validateFileSize(5 * 1024 * 1024, 'image')).toBe(true); // 5MB
      expect(validateFileSize(6 * 1024 * 1024, 'image')).toBe(false); // 6MB
    });

    it('should validate audio file sizes correctly', () => {
      expect(validateFileSize(5 * 1024 * 1024, 'audio')).toBe(true); // 5MB
      expect(validateFileSize(10 * 1024 * 1024, 'audio')).toBe(true); // 10MB
      expect(validateFileSize(11 * 1024 * 1024, 'audio')).toBe(false); // 11MB
    });

    it('should validate mascot file sizes correctly', () => {
      expect(validateFileSize(1024 * 1024, 'mascot')).toBe(true); // 1MB
      expect(validateFileSize(5 * 1024 * 1024, 'mascot')).toBe(true); // 5MB
      expect(validateFileSize(6 * 1024 * 1024, 'mascot')).toBe(false); // 6MB
    });
  });

  describe('generateAssetKey', () => {
    it('should generate valid S3 keys', () => {
      const gameId = 'test-game-id';
      const assetType: AssetType = 'image';
      const fileName = 'test-image.jpg';

      const key = generateAssetKey(gameId, assetType, fileName);

      expect(key).toMatch(/^games\/test-game-id\/image\/\d+_[a-z0-9]{6}_test-image\.jpg$/);
    });

    it('should sanitize file names', () => {
      const gameId = 'test-game-id';
      const assetType: AssetType = 'audio';
      const fileName = 'test file with spaces & symbols!.mp3';

      const key = generateAssetKey(gameId, assetType, fileName);

      expect(key).toMatch(/^games\/test-game-id\/audio\/\d+_[a-z0-9]{6}_test_file_with_spaces___symbols_\.mp3$/);
    });

    it('should include timestamp and random suffix', () => {
      const gameId = 'test-game-id';
      const assetType: AssetType = 'mascot';
      const fileName = 'mascot.png';

      const key1 = generateAssetKey(gameId, assetType, fileName);
      const key2 = generateAssetKey(gameId, assetType, fileName);

      // Keys should be different due to timestamp and random suffix
      expect(key1).not.toBe(key2);
    });
  });
});