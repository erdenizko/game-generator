import { MetricsService } from '@/lib/services/metrics';

// Background job scheduler for metrics aggregation
export class MetricsAggregatorJob {
  private static instance: MetricsAggregatorJob;
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  private constructor() {}

  public static getInstance(): MetricsAggregatorJob {
    if (!MetricsAggregatorJob.instance) {
      MetricsAggregatorJob.instance = new MetricsAggregatorJob();
    }
    return MetricsAggregatorJob.instance;
  }

  // Start the background job
  public start(): void {
    if (this.isRunning) {
      console.log('Metrics aggregator job is already running');
      return;
    }

    console.log('Starting metrics aggregator job...');
    this.isRunning = true;

    // Run immediately on start
    this.runAggregation();

    // Schedule to run every hour
    this.intervalId = setInterval(() => {
      this.runAggregation();
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    console.log('Metrics aggregator job started - will run every hour');
  }

  // Stop the background job
  public stop(): void {
    if (!this.isRunning) {
      console.log('Metrics aggregator job is not running');
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    console.log('Metrics aggregator job stopped');
  }

  // Check if job is running
  public getStatus(): { isRunning: boolean; nextRun?: Date } {
    const nextRun = this.isRunning 
      ? new Date(Date.now() + (60 * 60 * 1000)) // Next hour
      : undefined;

    return {
      isRunning: this.isRunning,
      nextRun,
    };
  }

  // Run the aggregation process
  private async runAggregation(): Promise<void> {
    try {
      console.log(`[${new Date().toISOString()}] Running metrics aggregation...`);
      
      await MetricsService.runHourlyAggregation();
      
      console.log(`[${new Date().toISOString()}] Metrics aggregation completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error in metrics aggregation:`, error);
    }
  }

  // Manual trigger for testing
  public async triggerManually(): Promise<void> {
    console.log('Manually triggering metrics aggregation...');
    await this.runAggregation();
  }
}

// Export singleton instance
export const metricsAggregator = MetricsAggregatorJob.getInstance();

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  // Start the job when the module is loaded
  setTimeout(() => {
    metricsAggregator.start();
  }, 5000); // Wait 5 seconds after startup
}