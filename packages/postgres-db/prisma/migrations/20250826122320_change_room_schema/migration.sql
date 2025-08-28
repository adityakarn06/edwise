/*
  Warnings:

  - Added the required column `thumbnail` to the `community_rooms` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `community_rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "community_rooms" ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
