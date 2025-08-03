/*
  Warnings:

  - You are about to drop the `mcq_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mcq_data" DROP CONSTRAINT "mcq_data_docId_fkey";

-- DropForeignKey
ALTER TABLE "mcq_data" DROP CONSTRAINT "mcq_data_userId_fkey";

-- DropTable
DROP TABLE "mcq_data";

-- CreateTable
CREATE TABLE "MCQSet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MCQSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" TEXT NOT NULL,
    "mcqSetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mcqs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MCQSet" ADD CONSTRAINT "MCQSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcqs" ADD CONSTRAINT "mcqs_mcqSetId_fkey" FOREIGN KEY ("mcqSetId") REFERENCES "MCQSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
