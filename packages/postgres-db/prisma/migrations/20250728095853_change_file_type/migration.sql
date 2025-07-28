/*
  Warnings:

  - Changed the type of `fileType` on the `uploaded_docs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "uploaded_docs" DROP COLUMN "fileType",
ADD COLUMN     "fileType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FileType";
