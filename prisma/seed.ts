import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash: hashedPassword,
      role: 'owner',
    },
  });

  console.log('Created test user:', testUser.email);

  // Create a test subscription for the user
  const testSubscription = await prisma.subscription.upsert({
    where: { id: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      plan: 'basic',
      status: 'active',
      renewAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  console.log('Created test subscription:', testSubscription.plan);

  // Create a sample game
  const sampleGame = await prisma.game.create({
    data: {
      userId: testUser.id,
      title: 'Sample Slot Game',
      description: 'A sample slot game for testing',
      rows: 3,
      columns: 5,
      jsonConfig: {
        sounds: {
          spin: 'spin.mp3',
          win: 'win.mp3',
          lose: 'lose.mp3',
        },
        mascot: {
          enabled: false,
        },
        styling: {
          primaryColor: '#ff6b35',
          secondaryColor: '#004e89',
        },
      },
      isPublished: false,
    },
  });

  console.log('Created sample game:', sampleGame.title);

  // Create sample slot items for the game
  const slotItems = [
    { name: 'Cherry', probability: 0.3, revenue: 2.0 },
    { name: 'Lemon', probability: 0.25, revenue: 3.0 },
    { name: 'Orange', probability: 0.2, revenue: 4.0 },
    { name: 'Plum', probability: 0.15, revenue: 5.0 },
    { name: 'Bell', probability: 0.08, revenue: 10.0 },
    { name: 'Seven', probability: 0.02, revenue: 50.0 },
  ];

  for (const item of slotItems) {
    await prisma.slotItem.create({
      data: {
        gameId: sampleGame.id,
        name: item.name,
        imageKey: `slot-items/${item.name.toLowerCase()}.png`,
        probability: item.probability,
        revenue: item.revenue,
        minimumCount: 1,
        diagonalPrize: false,
      },
    });
  }

  console.log('Created slot items for sample game');

  // Create sample regions
  const regions = [
    { country: 'US', currency: 'USD', minBet: 0.1, maxBet: 100.0, step: 0.1 },
    { country: 'GB', currency: 'GBP', minBet: 0.1, maxBet: 50.0, step: 0.1 },
    { country: 'DE', currency: 'EUR', minBet: 0.1, maxBet: 75.0, step: 0.1 },
  ];

  for (const region of regions) {
    await prisma.region.create({
      data: {
        gameId: sampleGame.id,
        ...region,
      },
    });
  }

  console.log('Created regions for sample game');

  // Create sample languages
  const languages = [
    {
      locale: 'en',
      strings: {
        spin: 'Spin',
        bet: 'Bet',
        win: 'Win',
        balance: 'Balance',
        congratulations: 'Congratulations!',
      },
    },
    {
      locale: 'es',
      strings: {
        spin: 'Girar',
        bet: 'Apostar',
        win: 'Ganar',
        balance: 'Saldo',
        congratulations: '¡Felicidades!',
      },
    },
  ];

  for (const language of languages) {
    await prisma.language.create({
      data: {
        gameId: sampleGame.id,
        locale: language.locale,
        jsonStrings: language.strings,
      },
    });
  }

  console.log('Created languages for sample game');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });