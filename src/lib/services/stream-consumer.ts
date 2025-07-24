import { cacheService } from '@/lib/redis';
import { MetricsService, SpinMetricsData } from '@/lib/services/metrics';

// Redis Stream consumer for real-time spin data processing
export class StreamConsumerService {
  private static instance: StreamConsumerService;
  private isRunning = false;
  private consumerGroup = 'metrics-aggregator';
  private consumerName = `consumer-${process.pid}`;
  private streamName = 'spins';

  private constructor() {}

  public static getInstance(): StreamConsumerService {
    if (!StreamConsumerService.instance) {
      StreamConsumerService.instance = new StreamConsumerService();
    }
    return StreamConsumerService.instance;
  }

  // Start consuming from Redis Stream
  public async start(): Promise<void> {
    if (this.isRunning) {
      console.log('Stream consumer is already running');
      return;
    }

    try {
      // Create consumer group if it doesn't exist
      await cacheService.xgroupCreate(this.streamName, this.consumerGroup, '0');
      console.log(`Consumer group '${this.consumerGroup}' created/verified`);

      this.isRunning = true;
      console.log('Starting Redis Stream consumer...');

      // Start consuming in background
      this.consumeLoop();

    } catch (error) {
      console.error('Error starting stream consumer:', error);
      this.isRunning = false;
    }
  }

  // Stop consuming
  public stop(): void {
    this.isRunning = false;
    console.log('Stream consumer stopped');
  }

  // Main consumption loop
  private async consumeLoop(): Promise<void> {
    while (this.isRunning) {
      try {
        // Read messages from the stream
        const messages = await cacheService.xreadGroup(
          this.consumerGroup,
          this.consumerName,
          this.streamName,
          10 // Process up to 10 messages at a time
        );

        if (messages && messages.length > 0) {
          await this.processMessages(messages);
        }

        // Small delay to prevent excessive CPU usage
        await this.sleep(1000); // 1 second

      } catch (error) {
        console.error('Error in stream consumption loop:', error);
        
        // Wait longer on error to prevent spam
        await this.sleep(5000); // 5 seconds
      }
    }
  }

  // Process messages from the stream
  private async processMessages(messages: unknown[]): Promise<void> {
    for (const streamData of messages) {
      const [streamName, entries] = streamData as [string, [string, string[]][]];
      streamName; // Mark as used
      
      for (const [messageId, fields] of entries) {
        try {
          // Parse the spin data
          const spinData = this.parseStreamFields(fields);
          
          // Process the spin data for metrics
          await this.processSpinData(spinData);
          
          // Acknowledge the message
          await cacheService.xack(this.streamName, this.consumerGroup, messageId);
          
          console.log(`Processed spin data for game ${spinData.gameId}, message ${messageId}`);
          
        } catch (error) {
          console.error(`Error processing message ${messageId}:`, error);
          // Note: In production, you might want to implement a dead letter queue
          // For now, we'll acknowledge the message to prevent reprocessing
          await cacheService.xack(this.streamName, this.consumerGroup, messageId);
        }
      }
    }
  }

  // Parse Redis Stream fields into SpinMetricsData
  private parseStreamFields(fields: string[]): SpinMetricsData {
    const data: Record<string, string> = {};
    
    for (let i = 0; i < fields.length; i += 2) {
      data[fields[i]] = fields[i + 1];
    }

    return {
      sessionId: data.sessionId || '',
      gameId: data.gameId || '',
      playerRef: data.playerRef || '',
      bet: data.bet || '0',
      win: data.win || '0',
      isWin: data.isWin || 'false',
      timestamp: data.timestamp || new Date().toISOString(),
      country: data.country || '',
    };
  }

  // Process individual spin data
  private async processSpinData(spinData: SpinMetricsData): Promise<void> {
    try {
      // For now, we'll store this in a simple aggregation
      // In a more complex system, you might want to:
      // 1. Update real-time counters
      // 2. Trigger alerts based on thresholds
      // 3. Update live dashboards
      
      // Update real-time metrics in Redis
      await this.updateRealtimeMetrics(spinData);
      
      // Log for debugging
      console.log(`Processed spin: Game ${spinData.gameId}, Bet ${spinData.bet}, Win ${spinData.win}`);
      
    } catch (error) {
      console.error('Error processing spin data:', error);
      throw error;
    }
  }

  // Update real-time metrics in Redis
  private async updateRealtimeMetrics(spinData: SpinMetricsData): Promise<void> {
    const now = new Date();
    const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const hourKey = `realtime:${spinData.gameId}:${currentHour.getTime()}`;
    
    const bet = parseFloat(spinData.bet);
    const win = parseFloat(spinData.win);
    
    // Use Redis hash to store real-time metrics
    const redis = cacheService.getRedisInstance();
    
    await redis.multi()
      .hincrbyfloat(hourKey, 'totalBets', bet)
      .hincrbyfloat(hourKey, 'totalWins', win)
      .hincrbyfloat(hourKey, 'netRevenue', bet - win)
      .hincrby(hourKey, 'spinCount', 1)
      .expire(hourKey, 25 * 60 * 60) // Keep for 25 hours
      .exec();
  }

  // Get current status
  public getStatus(): { isRunning: boolean; consumerGroup: string; consumerName: string } {
    return {
      isRunning: this.isRunning,
      consumerGroup: this.consumerGroup,
      consumerName: this.consumerName,
    };
  }

  // Utility function for sleep
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get stream info for monitoring
  public async getStreamInfo(): Promise<{
    length: number;
    pendingMessages: number;
  }> {
    try {
      const length = await cacheService.xlen(this.streamName);
      
      // Get pending messages count (simplified)
      const redis = cacheService.getRedisInstance();
      const pendingInfo = await redis.xpending(this.streamName, this.consumerGroup);
      const pendingMessages = Array.isArray(pendingInfo) ? (pendingInfo[0] as number) : 0;
      
      return {
        length,
        pendingMessages: typeof pendingMessages === 'number' ? pendingMessages : 0,
      };
    } catch (error) {
      console.error('Error getting stream info:', error);
      return { length: 0, pendingMessages: 0 };
    }
  }

  // Trim old messages from stream to prevent memory issues
  public async trimStream(maxLength: number = 10000): Promise<void> {
    try {
      const trimmed = await cacheService.xtrim(this.streamName, maxLength);
      if (trimmed > 0) {
        console.log(`Trimmed ${trimmed} old messages from stream`);
      }
    } catch (error) {
      console.error('Error trimming stream:', error);
    }
  }
}

// Export singleton instance
export const streamConsumer = StreamConsumerService.getInstance();

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  // Start the consumer when the module is loaded
  setTimeout(async () => {
    await streamConsumer.start();
  }, 3000); // Wait 3 seconds after startup
}