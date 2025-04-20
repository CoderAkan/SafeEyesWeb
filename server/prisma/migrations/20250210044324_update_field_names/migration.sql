/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `responsible_person_id` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_recipient_id_fkey";

-- AlterTable
ALTER TABLE "Camera" ADD COLUMN     "responsible_person_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "recipient_id";

-- CreateTable
CREATE TABLE "UserNotification" (
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("userId","notificationId")
);

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_responsible_person_id_fkey" FOREIGN KEY ("responsible_person_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
