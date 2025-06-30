import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import moment from 'moment';

const prisma = new PrismaClient();

const getDateRange = (range: string | null) => {
    const now = moment.utc();
    if (range === '24h') {
        return now.subtract(24, 'hours').toDate();
    }
    if (range === '7d') {
        return now.subtract(7, 'days').toDate();
    }
    if (range === '30d') {
        return now.subtract(30, 'days').toDate();
    }
    return undefined; // No date filter
};

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const token = url.searchParams.get('token');
        const range = url.searchParams.get('range'); // '24h', '7d', '30d'

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 400 });
        }

        const embedToken = await prisma.embedToken.findUnique({
            where: { token },
        });

        if (!embedToken) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
        }

        const gameConfigs = await prisma.gameConfig.findMany({
            where: { partnerId: embedToken.partnerId },
            select: { id: true },
        });

        const configIds = gameConfigs.map(c => c.id);

        const dateFilter = getDateRange(range);

        const gameActions = await prisma.gameAction.findMany({
            where: {
                GameSession: {
                    gameConfigId: { in: configIds },
                },
                actionType: 'select_hex',
                createdAt: {
                    gte: dateFilter,
                },
            },
        });

        const stats = {
            totalPlays: gameActions.length,
            rewards: {
                DUST: 0,
                ROCK: 0,
                OIL: 0,
                GOLD: 0,
                DIAMOND: 0,
            },
            totalWinnings: 0,
        };

        for (const action of gameActions) {
            const payload = action.payload as any;
            if (payload && payload.resultType) {
                stats.rewards[payload.resultType as keyof typeof stats.rewards]++;
                stats.totalWinnings += payload.reward || 0;
            }
        }

        // We could also get unique player count
        const uniquePlayers = await prisma.gameSession.groupBy({
            by: ['playerIdentifier'],
            where: {
                gameConfigId: { in: configIds },
                createdAt: { gte: dateFilter }
            },
            _count: { playerIdentifier: true }
        })


        return NextResponse.json({
            range: range || 'all_time',
            uniquePlayers: uniquePlayers.length,
            ...stats
        });

    } catch (error) {
        console.error('Error in /api/partner/stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 