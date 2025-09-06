import { Response, NextFunction } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from './auth';

const prisma = new PrismaClient();

interface UsageLimits {
  pdfChatMessages: number;
  mcqGenerations: number;
  summaryGenerations: number;
  impQuestionsGenerations: number;
  totalRequests: number;
}

const getUserLimits = (user: any): UsageLimits => {
  return {
    pdfChatMessages: user.pdfChatMessagesLimit,
    mcqGenerations: user.mcqGenerationsLimit,
    summaryGenerations: user.summaryGenerationsLimit,
    impQuestionsGenerations: user.impQuestionsGenerationsLimit,
    totalRequests: user.totalRequestsLimit
  };
};

export enum UsageType {
  CHAT_MESSAGE = 'pdfChatMessages',
  MCQ_GENERATION = 'mcqGenerations',
  SUMMARY_GENERATION = 'summaryGenerations',
  IMP_QUESTIONS_GENERATION = 'impQuestionsGenerations'
}

export const checkUsageLimit = (usageType: UsageType) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { subscription: true }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const today = new Date();

      const isPremium = user.subscriptionTier === 'PREMIUM' && 
          user.subscription?.status === 'ACTIVE' &&
          user.subscription?.currentPeriodEnd && 
          today < user.subscription.currentPeriodEnd;

      if (isPremium) {
        return next();
      }

      const limits = getUserLimits(user);

      today.setHours(0, 0, 0, 0);

      let dailyUsage = await prisma.dailyUsage.findUnique({
        where: {
          userId_date: {
            userId: user.id,
            date: today
          }
        }
      });

      if (!dailyUsage) {
        dailyUsage = await prisma.dailyUsage.create({
          data: {
            userId: user.id,
            date: today,
            pdfChatMessages: 0,
            mcqGenerations: 0,
            summaryGenerations: 0,
            impQuestionsGenerations: 0,
            totalRequests: 0
          }
        });
      }

      // total requests limit
      const totalUsed = dailyUsage.totalRequests;
      const totalLimit = limits.totalRequests;

      if (totalLimit > 0 && totalUsed >= totalLimit) {
        return res.status(429).json({ 
          error: 'Daily total request limit exceeded',
          usageType: 'totalRequests',
          currentUsage: totalUsed,
          limit: totalLimit,
          message: `You have reached your daily limit of ${totalLimit} total requests. Upgrade to premium for unlimited access`
        });
      }

      // individual feature limit
      const currentUsage = dailyUsage[usageType];
      const limit = limits[usageType];

      if (limit > 0 && currentUsage >= limit) {
        return res.status(429).json({ 
          error: 'Daily usage limit exceeded',
          usageType,
          currentUsage,
          limit,
          message: 'Upgrade to premium for unlimited access'
        });
      }

      await prisma.dailyUsage.update({
        where: { id: dailyUsage.id },
        data: {
          [usageType]: currentUsage + 1,
          totalRequests: dailyUsage.totalRequests + 1
        }
      });

      next();
    } catch (error) {
      console.error('Usage limit check failed:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

export const getUserUsageStats = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const dailyUsage = await prisma.dailyUsage.findUnique({
    where: {
      userId_date: {
        userId: userId,
        date: today
      }
    }
  });

  const isPremium = user.subscriptionTier === 'PREMIUM' && 
                   user.subscription?.status === 'ACTIVE' &&
                   user.subscription?.currentPeriodEnd && 
                   new Date() < user.subscription.currentPeriodEnd;

  const limits = getUserLimits(user);

  return {
    isPremium,
    subscriptionTier: user.subscriptionTier,
    usage: dailyUsage || {
      pdfChatMessages: 0,
      mcqGenerations: 0,
      summaryGenerations: 0,
      impQuestionsGenerations: 0,
      totalRequests: 0
    },
    limits
  };
};