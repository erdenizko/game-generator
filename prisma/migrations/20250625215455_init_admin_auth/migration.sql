-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "playerIdentifier" TEXT NOT NULL,
    "gameConfigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbedToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "permissions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameAction" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'default',
    "partnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "backgroundUrl" TEXT,
    "diamondImageUrl" TEXT,
    "dustImageUrl" TEXT,
    "goldImageUrl" TEXT,
    "hexCost" INTEGER NOT NULL DEFAULT 100,
    "loseSoundUrl" TEXT,
    "movesPerRound" INTEGER NOT NULL DEFAULT 10,
    "multDiamond" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "multGold" DOUBLE PRECISION NOT NULL DEFAULT 3,
    "multOil" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "oilImageUrl" TEXT,
    "probDiamond" INTEGER NOT NULL DEFAULT 1,
    "probDust" INTEGER NOT NULL DEFAULT 50,
    "probGold" INTEGER NOT NULL DEFAULT 4,
    "probOil" INTEGER NOT NULL DEFAULT 15,
    "probRock" INTEGER NOT NULL DEFAULT 30,
    "rockImageUrl" TEXT,
    "winSoundUrl" TEXT,
    "mascotImageUrl" TEXT,

    CONSTRAINT "GameConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_name_key" ON "Partner"("name");

-- CreateIndex
CREATE INDEX "GameSession_playerIdentifier_idx" ON "GameSession"("playerIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "EmbedToken_token_key" ON "EmbedToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "GameConfig_partnerId_name_key" ON "GameConfig"("partnerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_gameConfigId_fkey" FOREIGN KEY ("gameConfigId") REFERENCES "GameConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbedToken" ADD CONSTRAINT "EmbedToken_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAction" ADD CONSTRAINT "GameAction_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameConfig" ADD CONSTRAINT "GameConfig_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
