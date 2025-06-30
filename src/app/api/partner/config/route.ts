import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const embedToken = await prisma.embedToken.findUnique({
            where: { token },
        });

        if (!embedToken) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
        }

        let gameConfig = await prisma.gameConfig.findFirst({
            where: { partnerId: embedToken.partnerId },
            // Optional: order by updatedAt to get the latest if they can have multiple configs
            // orderBy: { updatedAt: 'desc' },
        });

        if (!gameConfig) {
            gameConfig = await prisma.gameConfig.findFirst({
                where: { partnerId: null, name: 'default' },
            });
        }

        if (!gameConfig) {
            return NextResponse.json({ error: 'Game configuration not found' }, { status: 500 });
        }

        return NextResponse.json(gameConfig);

    } catch (error) {
        console.error('Error in /api/partner/config:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 