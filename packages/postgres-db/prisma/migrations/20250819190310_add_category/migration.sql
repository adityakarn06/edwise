-- CreateEnum
CREATE TYPE "categories" AS ENUM ('Books', 'Notes', 'Organisers', 'PYQs');

-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "categories" "categories";
