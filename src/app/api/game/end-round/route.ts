import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const MAP_WIDTH = 5;
const MAP_HEIGHT = 5;

const generateHexId = (q: number, r: number) => `hex_${q}_${r}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { GameConfig: true },
    });

    if (!gameSession) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
    }

    // Log the end of the round
    await prisma.gameAction.create({
      data: {
        id: randomUUID(),
        gameSessionId: sessionId,
        actionType: 'end_round',
        payload: {},
      },
    });

    // The PRD says this endpoint returns a new map.
    // The logic is identical to the /api/game/map endpoint.
    const hexes = [];
    for (let q = 0; q < MAP_WIDTH; q++) {
      for (let r = 0; r < MAP_HEIGHT; r++) {
        hexes.push({
          id: generateHexId(q, r),
          q,
          r,
        });
      }
    }

    return NextResponse.json({
      hexes,
    });

  } catch (error) {
    console.error('Error in /api/game/end-round:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 