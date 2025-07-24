import { NextResponse } from 'next/server';
import { databaseService } from '@/lib/database';
import { cacheService } from '@/lib/redis';
import type { HealthCheckResponse } from '@/lib/types';

export async function GET() {
  try {
    // Test database connection
    const dbHealth = await databaseService.healthCheck();
    const dbStatus = dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy';

    // Test Redis connection
    let redisStatus: 'healthy' | 'unhealthy' = 'unhealthy';
    try {
      await cacheService.set('health_check', 'test', 10);
      const testValue = await cacheService.get('health_check');
      if (testValue === 'test') {
        redisStatus = 'healthy';
        await cacheService.del('health_check');
      }
    } catch (error) {
      console.error('Redis health check failed:', error);
    }

    // Test S3 connection (basic check)
    let s3Status: 'healthy' | 'unhealthy' = 'healthy';
    if (!process.env.S3_BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID) {
      s3Status = 'unhealthy';
    }

    const overallStatus = dbStatus === 'healthy' && redisStatus === 'healthy' && s3Status === 'healthy' 
      ? 'healthy' 
      : 'unhealthy';

    const response: HealthCheckResponse = {
      status: overallStatus,
      timestamp: new Date(),
      services: {
        database: dbStatus,
        redis: redisStatus,
        s3: s3Status,
      },
    };

    return NextResponse.json(response, {
      status: overallStatus === 'healthy' ? 200 : 503,
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    const response: HealthCheckResponse = {
      status: 'unhealthy',
      timestamp: new Date(),
      services: {
        database: 'unhealthy',
        redis: 'unhealthy',
        s3: 'unhealthy',
      },
    };

    return NextResponse.json(response, { status: 503 });
  }
}