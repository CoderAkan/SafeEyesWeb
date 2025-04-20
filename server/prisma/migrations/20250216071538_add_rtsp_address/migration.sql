-- DropIndex
DROP INDEX "Camera_rtsp_address_key";

-- AlterTable
ALTER TABLE "Camera" ALTER COLUMN "rtsp_address" DROP NOT NULL;
