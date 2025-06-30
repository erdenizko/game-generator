import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, username, currentBalance, currency } = body;

    if (!token || !username || currentBalance === undefined || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const embedToken = await prisma.embedToken.findUnique({
      where: { token },
      include: { Partner: true },
    });

    if (!embedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Find partner-specific config, or fall back to default
    let gameConfig = await prisma.gameConfig.findFirst({
        where: { partnerId: embedToken.partnerId }
    });

    if (!gameConfig) {
        gameConfig = await prisma.gameConfig.findFirst({
            where: { partnerId: null, name: 'default' }
        });
    }

    if (!gameConfig) {
      return NextResponse.json({ error: 'Game configuration not found' }, { status: 500 });
    }

    const gameSession = await prisma.gameSession.create({
      data: {
        playerIdentifier: username,
        gameConfigId: gameConfig.id,
      },
    });

    return NextResponse.json({
      sessionId: gameSession.id,
      partner: {
        name: embedToken.Partner.name,
      },
      gameConfig: {
        defaultBid: gameConfig.defaultBid,
        bidAmounts: gameConfig.bidAmounts,
        movesPerRound: gameConfig.movesPerRound,
        probabilities: {
          dust: gameConfig.probDust,
          rock: gameConfig.probRock,
          oil: gameConfig.probOil,
          gold: gameConfig.probGold,
          diamond: gameConfig.probDiamond,
        },
        multipliers: {
          oil: gameConfig.multOil,
          gold: gameConfig.multGold,
          diamond: gameConfig.multDiamond,
        },
        assets: {
          backgroundUrl: gameConfig.backgroundUrl,
          diamondImageUrl: gameConfig.diamondImageUrl,
          dustImageUrl: gameConfig.dustImageUrl,
          goldImageUrl: gameConfig.goldImageUrl,
          oilImageUrl: gameConfig.oilImageUrl,
          rockImageUrl: gameConfig.rockImageUrl,
          mascotImageUrl: gameConfig.mascotImageUrl,
          mascotOnDustImageUrl: gameConfig.mascotOnDustImageUrl,
          mascotOnRockImageUrl: gameConfig.mascotOnRockImageUrl,
          mascotOnOilImageUrl: gameConfig.mascotOnOilImageUrl,
          mascotOnGoldImageUrl: gameConfig.mascotOnGoldImageUrl,
          mascotOnDiamondImageUrl: gameConfig.mascotOnDiamondImageUrl,
        },
        sounds: {
          win: gameConfig.winSoundUrl,
          lose: gameConfig.loseSoundUrl,
        }
      },
    });
  } catch (error) {
    console.error('Error in /api/partner/init:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 