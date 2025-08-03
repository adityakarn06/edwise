/*
  Warnings:

  - Added the required column `userId` to the `mcq_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mcq_data" ADD COLUMN     "docId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "mcq_data" ADD CONSTRAINT "mcq_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcq_data" ADD CONSTRAINT "mcq_data_docId_fkey" FOREIGN KEY ("docId") REFERENCES "uploaded_docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
