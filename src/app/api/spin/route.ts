import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import prisma from '@/lib/database';
import { cacheService } from '@/lib/redis';
import { withRateLimit } from '@/lib/middleware';
import { SessionService } from '@/lib/services/session';
import { ApiResponse, SpinResult, ProcessSpinRequest, GameConfig } from '@/lib/types';

// Validation schema for spin request
const processSpinSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID format'),
  bet: z.number().positive('Bet amount must be positive').max(10000, 'Bet amount too high'),
});

// Interface for balance verification webhook
interface BalanceVerificationRequest {
  playerRef: string;
  amount: number;
  currency?: string;
  gameId: string;
  sessionId: string;
}

interface BalanceVerificationResponse {
  success: boolean;
  balance: number;
  currency?: string;
  error?: string;
}

// Cryptographically secure RNG class
class SecureRNG {
  private seed: string;
  
  constructor() {
    this.seed = crypto.randomBytes(32).toString('hex');
  }

  // Generate a random number between 0 and 1
  random(): number {
    const hash = crypto.createHash('sha256');
    hash.update(this.seed + Date.now().toString());
    this.seed = hash.digest('hex');
    
    // Convert first 8 bytes to a number between 0 and 1
    const bytes = Buffer.from(this.seed.substring(0, 16), 'hex');
    const num = bytes.readBigUInt64BE(0);
    return Number(num) / Number(BigInt('0xFFFFFFFFFFFFFFFF'));
  }

  // Generate random integer between min and max (inclusive)
  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  // Generate provably fair seed for transparency
  generateProvablySeed(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}

// Spin calculation engine
class SpinEngine {
  private rng: SecureRNG;

  constructor() {
    this.rng = new SecureRNG();
  }

  // Calculate spin result based on game configuration
  calculateSpin(gameConfig: GameConfig, bet: number): SpinResult {
    const { rows, columns, slotItems } = gameConfig;
    
    // Generate result matrix
    const resultMatrix: string[][] = [];
    for (let row = 0; row < rows; row++) {
      resultMatrix[row] = [];
      for (let col = 0; col < columns; col++) {
        const selectedItem = this.selectRandomItem(slotItems);
        resultMatrix[row][col] = selectedItem.id;
      }
    }

    // Calculate winnings
    const winResult = this.calculateWinnings(resultMatrix, slotItems, bet, rows, columns);

    return {
      view: resultMatrix,
      bet,
      isWin: winResult.isWin,
      winAmount: winResult.winAmount,
      lines: winResult.winningLines,
      balance: 0, // Will be updated after balance verification
    };
  }

  // Select random slot item based on probability
  private selectRandomItem(slotItems: GameConfig['slotItems']): GameConfig['slotItems'][0] {
    const totalProbability = slotItems.reduce((sum, item) => sum + item.probability, 0);
    let randomValue = this.rng.random() * totalProbability;

    for (const item of slotItems) {
      randomValue -= item.probability;
      if (randomValue <= 0) {
        return item;
      }
    }

    // Fallback to first item if something goes wrong
    return slotItems[0];
  }

  // Calculate winnings based on result matrix
  private calculateWinnings(
    matrix: string[][],
    slotItems: GameConfig['slotItems'],
    bet: number,
    rows: number,
    columns: number
  ): { isWin: boolean; winAmount: number; winningLines: number[][] } {
    const winningLines: number[][] = [];
    let totalWinAmount = 0;

    // Check horizontal lines
    for (let row = 0; row < rows; row++) {
      const lineResult = this.checkLine(matrix[row], slotItems, bet);
      if (lineResult.winAmount > 0) {
        winningLines.push(...this.generateLineCoordinates(row, 'horizontal', columns));
        totalWinAmount += lineResult.winAmount;
      }
    }

    // Check vertical lines
    for (let col = 0; col < columns; col++) {
      const verticalLine = matrix.map(row => row[col]);
      const lineResult = this.checkLine(verticalLine, slotItems, bet);
      if (lineResult.winAmount > 0) {
        winningLines.push(...this.generateLineCoordinates(col, 'vertical', rows));
        totalWinAmount += lineResult.winAmount;
      }
    }

    // Check diagonal lines (if enabled for items)
    const diagItems = slotItems.filter(item => item.diagonalPrize);
    if (diagItems.length > 0) {
      // Main diagonal (top-left to bottom-right)
      if (rows === columns) {
        const mainDiagonal = matrix.map((row, index) => row[index]);
        const lineResult = this.checkLine(mainDiagonal, diagItems, bet);
        if (lineResult.winAmount > 0) {
          winningLines.push(...this.generateLineCoordinates(0, 'diagonal-main', Math.min(rows, columns)));
          totalWinAmount += lineResult.winAmount;
        }

        // Anti-diagonal (top-right to bottom-left)
        const antiDiagonal = matrix.map((row, index) => row[columns - 1 - index]);
        const antiLineResult = this.checkLine(antiDiagonal, diagItems, bet);
        if (antiLineResult.winAmount > 0) {
          winningLines.push(...this.generateLineCoordinates(0, 'diagonal-anti', Math.min(rows, columns)));
          totalWinAmount += antiLineResult.winAmount;
        }
      }
    }

    return {
      isWin: totalWinAmount > 0,
      winAmount: totalWinAmount,
      winningLines,
    };
  }

  // Check if a line has winning combinations
  private checkLine(line: string[], slotItems: GameConfig['slotItems'], bet: number): { winAmount: number } {
    const itemCounts = new Map<string, number>();
    
    // Count occurrences of each item
    line.forEach(itemId => {
      itemCounts.set(itemId, (itemCounts.get(itemId) || 0) + 1);
    });

    let maxWinAmount = 0;

    // Check each item type for winning combinations
    for (const [itemId, count] of itemCounts.entries()) {
      const item = slotItems.find(si => si.id === itemId);
      if (!item) continue;

      // Check if count meets minimum requirement
      if (count >= item.minimumCount) {
        const multiplier = item.revenue || 1;
        const winAmount = bet * multiplier * count;
        maxWinAmount = Math.max(maxWinAmount, winAmount);
      }
    }

    return { winAmount: maxWinAmount };
  }

  // Generate line coordinates for visualization
  private generateLineCoordinates(
    index: number,
    type: 'horizontal' | 'vertical' | 'diagonal-main' | 'diagonal-anti',
    length: number
  ): number[][] {
    const coordinates: number[][] = [];

    switch (type) {
      case 'horizontal':
        for (let col = 0; col < length; col++) {
          coordinates.push([index, col]);
        }
        break;
      case 'vertical':
        for (let row = 0; row < length; row++) {
          coordinates.push([row, index]);
        }
        break;
      case 'diagonal-main':
        for (let i = 0; i < length; i++) {
          coordinates.push([i, i]);
        }
        break;
      case 'diagonal-anti':
        for (let i = 0; i < length; i++) {
          coordinates.push([i, length - 1 - i]);
        }
        break;
    }

    return coordinates;
  }
}

// Balance verification service
class BalanceVerificationService {
  static async verifyBalance(
    playerRef: string,
    amount: number,
    gameId: string,
    sessionId: string,
    country?: string
  ): Promise<BalanceVerificationResponse> {
    try {
      const webhookUrl = process.env.CASINO_BALANCE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        // If no webhook URL is configured, return a mock response for development
        console.warn('No balance webhook URL configured, using mock response');
        return {
          success: true,
          balance: 1000, // Mock balance
          currency: 'USD',
        };
      }

      const requestData: BalanceVerificationRequest = {
        playerRef,
        amount,
        gameId,
        sessionId,
        currency: country ? this.getCurrencyForCountry(country) : 'USD',
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CASINO_WEBHOOK_SECRET}`,
        },
        body: JSON.stringify(requestData),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      const result: BalanceVerificationResponse = await response.json();
      return result;

    } catch (error) {
      console.error('Balance verification failed:', error);
      return {
        success: false,
        balance: 0,
        error: 'Balance verification failed',
      };
    }
  }

  private static getCurrencyForCountry(country: string): string {
    // Simple mapping - in production, this should be more comprehensive
    const currencyMap: Record<string, string> = {
      'USA': 'USD',
      'EUR': 'EUR',
      'GBR': 'GBP',
      'CAN': 'CAD',
      'AUS': 'AUD',
      'JPY': 'JPY',
    };

    return currencyMap[country] || 'USD';
  }
}

// POST /api/spin - Process spin request
async function processSpin(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = processSpinSchema.parse(body);

    // Validate session
    const sessionValidation = await SessionService.validateSession(validatedData.sessionId);
    if (!sessionValidation.isValid || !sessionValidation.sessionData) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: sessionValidation.error?.code || 'SESSION_INVALID',
            message: sessionValidation.error?.message || 'Invalid session',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Get game configuration
    const gameConfig = await SessionService.getGameConfigForSession(validatedData.sessionId);
    if (!gameConfig) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'GAME_CONFIG_NOT_FOUND',
            message: 'Game configuration not found',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Validate bet amount against game configuration
    const playerRegion = gameConfig.availableRegions.find(
      region => region.country === sessionValidation.sessionData!.country
    );

    if (playerRegion) {
      if (validatedData.bet < playerRegion.minBet || validatedData.bet > playerRegion.maxBet) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_BET_AMOUNT',
              message: `Bet amount must be between ${playerRegion.minBet} and ${playerRegion.maxBet}`,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 400 }
        );
      }

      // Check if bet amount follows the step requirement
      const remainder = (validatedData.bet - playerRegion.minBet) % playerRegion.step;
      if (remainder !== 0) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_BET_STEP',
              message: `Bet amount must be in steps of ${playerRegion.step}`,
            },
            timestamp: new Date().toISOString(),
          } as ApiResponse,
          { status: 400 }
        );
      }
    }

    // Verify balance with casino webhook
    const balanceVerification = await BalanceVerificationService.verifyBalance(
      sessionValidation.sessionData.playerRef,
      validatedData.bet,
      sessionValidation.sessionData.gameId,
      validatedData.sessionId,
      sessionValidation.sessionData.country
    );

    if (!balanceVerification.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INSUFFICIENT_BALANCE',
            message: balanceVerification.error || 'Insufficient balance',
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Calculate spin result
    const spinEngine = new SpinEngine();
    const spinResult = spinEngine.calculateSpin(gameConfig, validatedData.bet);
    
    // Update balance in result
    const newBalance = balanceVerification.balance - validatedData.bet + spinResult.winAmount;
    spinResult.balance = newBalance;

    // Store spin result in database
    const spinRecord = await prisma.spin.create({
      data: {
        sessionId: validatedData.sessionId,
        bet: validatedData.bet,
        win: spinResult.winAmount,
        resultJson: {
          view: spinResult.view,
          lines: spinResult.lines,
          isWin: spinResult.isWin,
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Update session balance
    await SessionService.updateSessionBalance(validatedData.sessionId, newBalance);

    // Push spin data to Redis Stream for real-time analytics
    await cacheService.xadd('spins', {
      sessionId: validatedData.sessionId,
      gameId: sessionValidation.sessionData.gameId,
      playerRef: sessionValidation.sessionData.playerRef,
      bet: validatedData.bet.toString(),
      win: spinResult.winAmount.toString(),
      isWin: spinResult.isWin.toString(),
      timestamp: new Date().toISOString(),
      country: sessionValidation.sessionData.country || '',
    });

    return NextResponse.json(
      {
        success: true,
        data: spinResult,
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Spin processing error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.issues,
          },
          timestamp: new Date().toISOString(),
        } as ApiResponse,
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to process spin',
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// Export POST handler with rate limiting
export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(
    request,
    processSpin,
    { maxRequests: 60, windowMs: 60000 } // 60 spins per minute per IP
  );
}