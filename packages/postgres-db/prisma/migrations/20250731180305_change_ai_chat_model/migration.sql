/*
  Warnings:

  - The primary key for the `ai_chat_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `context` on the `ai_chat_history` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `ai_chat_history` table. All the data in the column will be lost.
  - The `id` column on the `ai_chat_history` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userQuery` to the `ai_chat_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ai_chat_history" DROP CONSTRAINT "ai_chat_history_pkey",
DROP COLUMN "context",
DROP COLUMN "prompt",
ADD COLUMN     "sources" TEXT[],
ADD COLUMN     "userQuery" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ai_chat_history_pkey" PRIMARY KEY ("id");
