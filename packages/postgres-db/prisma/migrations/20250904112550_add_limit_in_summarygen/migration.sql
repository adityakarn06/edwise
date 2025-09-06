-- AlterTable
ALTER TABLE "daily_usage" ADD COLUMN     "impQuestionsGenerations" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "summaryGenerations" INTEGER NOT NULL DEFAULT 0;
