/*
  Warnings:

  - A unique constraint covering the columns `[rtsp_address]` on the table `Camera` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rtsp_address` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Camera" ADD COLUMN     "rtsp_address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Camera_rtsp_address_key" ON "Camera"("rtsp_address");
