import Redis from 'ioredis';

// Redis connection configuration
const redis = new Redis({
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
  host: 'redis-15684.c273.us-east-1-2.ec2.redns.redis-cloud.com',
  port: 15684,
  username: "default",
  password: "MHKTv5R9b33t5DaqbJfQ7y4g59z42xzQ"
});

// Redis connection event handlers
redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('ready', () => {
  console.log('Redis ready');
});

redis.on('close', () => {
  console.log('Redis connection closed');
});

export default redis;

// Cache utility functions
export class CacheService {
  private static instance: CacheService;
  private redis: Redis;

  private constructor() {
    this.redis = redis;
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Set cache with TTL (Time To Live) in seconds
  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await this.redis.setex(key, ttl, serializedValue);
    } else {
      await this.redis.set(key, serializedValue);
    }
  }

  // Get cache value
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Error parsing cached value:', error);
      return null;
    }
  }

  // Delete cache key
  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  // Set cache with expiration time
  async setWithExpiry(key: string, value: unknown, expiryInSeconds: number): Promise<void> {
    await this.set(key, value, expiryInSeconds);
  }

  // Increment counter (for rate limiting)
  async incr(key: string): Promise<number> {
    return await this.redis.incr(key);
  }

  // Set expiry for existing key
  async expire(key: string, seconds: number): Promise<void> {
    await this.redis.expire(key, seconds);
  }

  // Push to Redis Stream (for real-time analytics)
  async xadd(stream: string, data: Record<string, string>): Promise<string> {
    const result = await this.redis.xadd(stream, '*', ...Object.entries(data).flat());
    return result || '';
  }

  // Read from Redis Stream
  async xread(stream: string, id: string = '$', count: number = 10): Promise<unknown[]> {
    const result = await this.redis.xread('COUNT', count, 'STREAMS', stream, id);
    return result || [];
  }

  // Get stream length
  async xlen(stream: string): Promise<number> {
    return await this.redis.xlen(stream);
  }

  // Trim stream to keep only recent entries
  async xtrim(stream: string, maxLen: number): Promise<number> {
    return await this.redis.xtrim(stream, 'MAXLEN', '~', maxLen);
  }

  // Create consumer group
  async xgroupCreate(stream: string, group: string, id: string = '$'): Promise<string> {
    try {
      return await this.redis.xgroup('CREATE', stream, group, id, 'MKSTREAM') as string;
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('BUSYGROUP')) {
        return 'OK'; // Group already exists
      }
      throw error;
    }
  }

  // Read from consumer group
  async xreadGroup(group: string, consumer: string, stream: string, count: number = 10): Promise<unknown[]> {
    const result = await this.redis.xreadgroup('GROUP', group, consumer, 'COUNT', count, 'STREAMS', stream, '>');
    return result || [];
  }

  // Acknowledge message processing
  async xack(stream: string, group: string, ...ids: string[]): Promise<number> {
    return await this.redis.xack(stream, group, ...ids);
  }

  // Get Redis instance for advanced operations
  getRedisInstance(): Redis {
    return this.redis;
  }
}

// Export cache service instance
export const cacheService = CacheService.getInstance();

// Cache key generators
export const CacheKeys = {
  // Session cache keys
  session: (sessionId: string) => `session:${sessionId}`,

  // Game config cache keys
  game: (gameId: string) => `game:${gameId}`,

  // User cache keys
  user: (userId: string) => `user:${userId}`,

  // Rate limiting keys
  rateLimit: (ip: string, endpoint: string) => `rate_limit:${ip}:${endpoint}`,

  // Preview session keys
  preview: (sessionId: string) => `preview:${sessionId}`,

  // Metrics cache keys
  metrics: (gameId: string, dateRange: string) => `metrics:${gameId}:${dateRange}`,
} as const;

// Cache TTL constants (in seconds)
export const CacheTTL = {
  SESSION: 4 * 60 * 60, // 4 hours
  GAME_CONFIG: 60 * 60, // 1 hour
  PREVIEW_SESSION: 2 * 60 * 60, // 2 hours
  RATE_LIMIT: 60, // 1 minute
  METRICS: 15 * 60, // 15 minutes
  USER_DATA: 30 * 60, // 30 minutes
} as const;