import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// This determines the size of the hexagonal grid.
const MAP_WIDTH = 5;
const MAP_HEIGHT = 5;

// Helper to generate a unique ID for each hex tile.
const generateHexId = (q: number, r: number) => `hex_${q}_${r}`;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Partner token is required' }, { status: 400 });
    }

    // Find the embed token to identify the partner and their config
    const embedToken = await prisma.embedToken.findUnique({
      where: { token },
      include: {
        Partner: {
          include: {
            GameConfig: true, // Fetch all configs for the partner
          },
        },
      },
    });

    if (!embedToken || !embedToken.Partner) {
      return NextResponse.json({ error: 'Invalid partner token' }, { status: 404 });
    }

    // For now, let's assume the partner has one primary config.
    // In the future, this could be more specific (e.g., based on the token permissions).
    const gameConfig = embedToken.Partner.GameConfig[0] || await prisma.gameConfig.findFirst({
      where: { name: 'default' },
    });

    if (!gameConfig) {
      return NextResponse.json({ error: 'Game configuration not found' }, { status: 500 });
    }

    const hexes = [];
    for (let q = 0; q < MAP_WIDTH; q++) {
      for (let r = 0; r < MAP_HEIGHT; r++) {
        hexes.push({
          id: generateHexId(q, r),
          q, // axial coordinate
          r, // axial coordinate
        });
      }
    }

    return NextResponse.json({
      hexes,
      costPerClick: gameConfig.hexCost,
    });
  } catch (error) {
    console.error('Error in /api/game/map:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 