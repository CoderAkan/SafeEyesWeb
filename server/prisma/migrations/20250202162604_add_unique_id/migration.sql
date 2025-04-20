/*
  Warnings:

  - The primary key for the `PPE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[unique_id]` on the table `PPE` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PPE" DROP CONSTRAINT "PPE_pkey",
ALTER COLUMN "unique_id" DROP DEFAULT,
ALTER COLUMN "unique_id" SET DATA TYPE TEXT;
DROP SEQUENCE "PPE_unique_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "PPE_unique_id_key" ON "PPE"("unique_id");
