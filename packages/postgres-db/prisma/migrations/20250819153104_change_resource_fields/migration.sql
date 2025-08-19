/*
  Warnings:

  - You are about to drop the column `url` on the `resources` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileURL` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('UPLOADED', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."resources" DROP COLUMN "url",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "fileURL" TEXT NOT NULL,
ADD COLUMN     "status" "public"."status" NOT NULL,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
