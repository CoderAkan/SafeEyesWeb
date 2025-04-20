/*
  Warnings:

  - Made the column `full_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emergency_contact` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "full_name" SET DEFAULT '',
ALTER COLUMN "emergency_contact" SET NOT NULL,
ALTER COLUMN "emergency_contact" SET DEFAULT '',
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT 'GENERAL';
