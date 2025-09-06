/*
  Warnings:

  - You are about to drop the `usage_limits` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "impQuestionsGenerationsLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "mcqGenerationsLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "pdfChatMessagesLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "summaryGenerationsLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "totalRequestsLimit" INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE "usage_limits";
