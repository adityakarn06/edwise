import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';
import { getUserUsageStats } from '../middleware/usageTracking';

const prisma = new PrismaClient();

export const getUserUsage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const stats = await getUserUsageStats(req.user.id);
    res.json(stats);
  } catch (error) {
    console.error('Error getting user usage:', error);
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
};

export const resetDailyUsage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // only admin
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyUsage.upsert({
      where: {
        userId_date: {
          userId,
          date: today
        }
      },
      create: {
        userId,
        date: today,
        pdfChatMessages: 0,
        mcqGenerations: 0,
        totalRequests: 0
      },
      update: {
        pdfChatMessages: 0,
        mcqGenerations: 0,
        totalRequests: 0
      }
    });

    res.json({ message: 'Daily usage reset successfully' });
  } catch (error) {
    console.error('Error resetting daily usage:', error);
    res.status(500).json({ error: 'Failed to reset daily usage' });
  }
};