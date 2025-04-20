/*
  Warnings:

  - The primary key for the `PPE` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PPE` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PPE" DROP CONSTRAINT "PPE_pkey",
DROP COLUMN "id",
ADD COLUMN     "unique_id" SERIAL NOT NULL,
ADD CONSTRAINT "PPE_pkey" PRIMARY KEY ("unique_id");
