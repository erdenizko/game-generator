import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { randomBytes } from 'crypto';
import moment from 'moment';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const adminSecret = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { partnerName } = body;

    if (!partnerName) {
      return NextResponse.json({ error: 'Missing partnerName' }, { status: 400 });
    }

    const partner = await prisma.partner.create({
      data: {
        name: partnerName,
      },
    });

    const token = randomBytes(32).toString('hex');

    await prisma.embedToken.create({
      data: {
        id: randomUUID(),
        token,
        partnerId: partner.id,
        permissions: {},
        updatedAt: moment.utc().toDate(),
      },
    });

    return NextResponse.json({ token });

  } catch (error) {
    console.error('Error in /api/admin/create-token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 