/*
  Warnings:

  - You are about to drop the column `hexCost` on the `GameConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameConfig" DROP COLUMN "hexCost",
ADD COLUMN     "bidAmounts" INTEGER[] DEFAULT ARRAY[100, 200, 500]::INTEGER[],
ADD COLUMN     "defaultBid" INTEGER DEFAULT 100;
