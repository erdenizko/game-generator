import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import moment from 'moment';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const adminSecret = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { token, config } = body;

        if (!token || !config) {
            return NextResponse.json({ error: 'Missing token or config' }, { status: 400 });
        }

        const embedToken = await prisma.embedToken.findUnique({
            where: { token },
        });

        if (!embedToken) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
        }

        const { partnerId } = embedToken;

        const configName = config.name || 'default';

        const dataToUpdate = {
            name: configName,
            partnerId: partnerId,
            updatedAt: moment.utc().toDate(),
            backgroundUrl: config.backgroundUrl,
            diamondImageUrl: config.diamondImageUrl,
            dustImageUrl: config.dustImageUrl,
            goldImageUrl: config.goldImageUrl,
            hexCost: config.hexCost,
            loseSoundUrl: config.loseSoundUrl,
            movesPerRound: config.movesPerRound,
            multDiamond: config.multDiamond,
            multGold: config.multGold,
            multOil: config.multOil,
            oilImageUrl: config.oilImageUrl,
            probDiamond: config.probDiamond,
            probDust: config.probDust,
            probGold: config.probGold,
            probOil: config.probOil,
            probRock: config.probRock,
            rockImageUrl: config.rockImageUrl,
            winSoundUrl: config.winSoundUrl,
            mascotImageUrl: config.mascotImageUrl,
        };

        const gameConfig = await prisma.gameConfig.upsert({
            where: {
                partnerId_name: {
                    partnerId: partnerId,
                    name: configName,
                }
            },
            update: dataToUpdate,
            create: {
                id: randomUUID(),
                ...dataToUpdate
            },
        });

        return NextResponse.json(gameConfig);

    } catch (error) {
        console.error('Error in /api/admin/set-config:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 