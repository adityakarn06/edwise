/*
  Warnings:

  - You are about to drop the column `privacy` on the `community_rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "community_rooms" DROP COLUMN "privacy";

-- DropEnum
DROP TYPE "Privacy";
