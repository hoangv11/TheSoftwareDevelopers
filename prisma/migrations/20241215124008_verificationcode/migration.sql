/*
  Warnings:

  - You are about to drop the column `createdAt` on the `VerificationCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VerificationCode_email_idx";

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_email_key" ON "VerificationCode"("email");
