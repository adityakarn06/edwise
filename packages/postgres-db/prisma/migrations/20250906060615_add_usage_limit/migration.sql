-- CreateTable
CREATE TABLE "usage_limits" (
    "id" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "pdfChatMessages" INTEGER NOT NULL DEFAULT 10,
    "mcqGenerations" INTEGER NOT NULL DEFAULT 10,
    "summaryGenerations" INTEGER NOT NULL DEFAULT 10,
    "impQuestionsGenerations" INTEGER NOT NULL DEFAULT 10,
    "totalRequests" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usage_limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usage_limits_tier_key" ON "usage_limits"("tier");
