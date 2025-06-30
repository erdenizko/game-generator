import { PrismaClient, GameConfig } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

type RewardType = 'DUST' | 'ROCK' | 'OIL' | 'GOLD' | 'DIAMOND';

function getRewardType(config: GameConfig): RewardType {
    const weights = {
        DUST: config.probDust,
        ROCK: config.probRock,
        OIL: config.probOil,
        GOLD: config.probGold,
        DIAMOND: config.probDiamond,
    };

    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (const key in weights) {
        const rewardType = key as RewardType;
        if (random < weights[rewardType]) {
            return rewardType;
        }
        random -= weights[rewardType];
    }

    return 'DUST'; // Fallback
}


function calculateReward(resultType: RewardType, config: GameConfig, bid: number): number {
    const cost = bid;
    switch (resultType) {
        case 'DUST':
            return 0;
        case 'ROCK':
            return cost; // 1x
        case 'OIL':
            return cost * config.multOil;
        case 'GOLD':
            return cost * config.multGold;
        case 'DIAMOND':
            return cost * config.multDiamond;
        default:
            return 0;
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId, hexId, bid } = body;

        if (!sessionId || !hexId || !bid) {
            return NextResponse.json({ error: 'Missing sessionId, hexId, or bid' }, { status: 400 });
        }

        const gameSession = await prisma.gameSession.findUnique({
            where: { id: sessionId },
            include: { GameConfig: true },
        });

        if (!gameSession) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
        }

        if (!gameSession.GameConfig.bidAmounts.includes(bid)) {
            return NextResponse.json({ error: 'Invalid bid amount' }, { status: 400 });
        }
        
        // We might want to add isActive flag to GameSession later on
        // if (!gameSession.isActive) {
        //     return NextResponse.json({ error: 'Session is not active' }, { status: 403 });
        // }

        const movesCount = await prisma.gameAction.count({
            where: { gameSessionId: sessionId },
        });

        if (movesCount >= gameSession.GameConfig.movesPerRound) {
            return NextResponse.json({
                error: 'Round over. Please start a new round.',
                roundOver: true,
            }, { status: 400 });
        }

        const resultType = getRewardType(gameSession.GameConfig);
        const reward = calculateReward(resultType, gameSession.GameConfig, bid);

        await prisma.gameAction.create({
            data: {
                id: randomUUID(),
                gameSessionId: sessionId,
                actionType: 'select_hex',
                payload: {
                    hexId,
                    resultType,
                    reward,
                    bid,
                },
            },
        });

        return NextResponse.json({
            resultType,
            reward,
        });

    } catch (error) {
        console.error('Error in /api/game/select:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 