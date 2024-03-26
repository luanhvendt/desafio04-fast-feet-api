/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "photo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_email_key" ON "Recipient"("email");
