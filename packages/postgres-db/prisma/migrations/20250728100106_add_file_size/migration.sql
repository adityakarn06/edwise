/*
  Warnings:

  - Added the required column `fileSize` to the `uploaded_docs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "uploaded_docs" ADD COLUMN     "fileSize" INTEGER NOT NULL;
