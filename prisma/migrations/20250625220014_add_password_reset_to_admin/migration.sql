/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetToken]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "passwordResetExpiry" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_passwordResetToken_key" ON "Admin"("passwordResetToken");
