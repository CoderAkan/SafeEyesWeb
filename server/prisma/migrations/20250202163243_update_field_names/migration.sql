-- AlterTable
ALTER TABLE "PPE" ADD CONSTRAINT "PPE_pkey" PRIMARY KEY ("uniqueId");

-- DropIndex
DROP INDEX "PPE_uniqueId_key";
