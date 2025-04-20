/*
  Warnings:

  - You are about to drop the column `unique_id` on the `PPE` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `PPE` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `PPE` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PPE_unique_id_key";

-- AlterTable
ALTER TABLE "PPE" DROP COLUMN "unique_id",
ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PPE_uniqueId_key" ON "PPE"("uniqueId");
