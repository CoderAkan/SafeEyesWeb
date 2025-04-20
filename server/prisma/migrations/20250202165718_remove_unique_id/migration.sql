/*
  Warnings:

  - The primary key for the `PPE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uniqueId` on the `PPE` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PPE_uniqueId_key";

-- AlterTable
ALTER TABLE "PPE" DROP CONSTRAINT "PPE_pkey",
DROP COLUMN "uniqueId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PPE_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PPE_id_seq";
