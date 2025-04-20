/*
  Warnings:

  - The primary key for the `PPE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[uniqueId]` on the table `PPE` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PPE" DROP CONSTRAINT "PPE_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PPE_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PPE_uniqueId_key" ON "PPE"("uniqueId");
