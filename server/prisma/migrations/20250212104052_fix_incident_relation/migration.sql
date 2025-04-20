-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_worker_id_fkey";

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "worker_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
