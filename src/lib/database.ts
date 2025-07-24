import { PrismaClient } from '@prisma/client';

// Global variable to store Prisma client instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client instance
const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// In development, store the client in global to prevent multiple instances
if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma;
}

export default prisma;

// Database connection utility functions
export class DatabaseService {
  private static instance: DatabaseService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = prisma;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Get Prisma client instance
  getPrisma(): PrismaClient {
    return this.prisma;
  }

  // Test database connection
  async testConnection(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  // Graceful shutdown
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: Date }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'healthy',
        timestamp: new Date(),
      };
    } catch {
      return {
        status: 'unhealthy',
        timestamp: new Date(),
      };
    }
  }
}

// Export database service instance
export const databaseService = DatabaseService.getInstance();

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await databaseService.disconnect();
});

process.on('SIGINT', async () => {
  await databaseService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await databaseService.disconnect();
  process.exit(0);
});