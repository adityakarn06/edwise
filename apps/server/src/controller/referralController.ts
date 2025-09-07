import { Response } from 'express';
import { PrismaClient } from "@repo/postgres-db/client";
import { AuthenticatedRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const generateReferralCode = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let referralCode = user.referralCode;
        if (!referralCode) {
            referralCode = `EDW${btoa(user.email || user.id).slice(0, 8).toUpperCase()}`;
            await prisma.user.update({
                where: { id: user.id },
                data: { referralCode }
            });
        }

        res.json({ referralCode });
    } catch (error) {
        console.error('Error generating referral code:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Optimized milestone reward checking - reduces DB calls significantly
const checkAndAwardMilestoneRewards = async (userId: string, referralStats: { completedReferrals: number; paidReferrals: number }) => {
    try {
        const { completedReferrals, paidReferrals } = referralStats;
        
        // Early return if no milestones reached
        if (completedReferrals < 10 && paidReferrals < 10) {
            return false;
        }

        // Check existing rewards in single query
        const existingRewards = await prisma.reward.findMany({
            where: {
                userId,
                type: { in: ['PREMIUM_MONTH', 'CASH_REWARD'] }
            },
            select: { type: true, referralCount: true }
        });

        const hasPremiumReward = existingRewards.some(r => r.type === 'PREMIUM_MONTH' && r.referralCount >= 10);
        const hasCashReward = existingRewards.some(r => r.type === 'CASH_REWARD' && r.referralCount >= 10);

        const operations = [];
        let newRewardsAwarded = false;

        // 10 successful referrals = 1 month free premium
        if (completedReferrals >= 10 && !hasPremiumReward) {
            // Create premium reward
            operations.push(
                prisma.reward.create({
                    data: {
                        userId,
                        type: 'PREMIUM_MONTH',
                        description: '1 month free premium for 10 successful referrals',
                        premiumMonths: 1,
                        referralCount: completedReferrals
                    }
                })
            );

            // Upgrade to premium
            const currentDate = new Date();
            const endDate = new Date(currentDate);
            endDate.setMonth(endDate.getMonth() + 1);

            operations.push(
                prisma.user.update({
                    where: { id: userId },
                    data: { subscriptionTier: 'PREMIUM' }
                })
            );

            operations.push(
                prisma.subscription.upsert({
                    where: { userId },
                    create: {
                        userId,
                        status: 'ACTIVE',
                        tier: 'PREMIUM',
                        currentPeriodStart: currentDate,
                        currentPeriodEnd: endDate
                    },
                    update: {
                        status: 'ACTIVE',
                        tier: 'PREMIUM',
                        currentPeriodStart: currentDate,
                        currentPeriodEnd: endDate
                    }
                })
            );

            newRewardsAwarded = true;
        }

        // 10 paid subscription referrals = ₹100 cash reward
        if (paidReferrals >= 10 && !hasCashReward) {
            operations.push(
                prisma.reward.create({
                    data: {
                        userId,
                        type: 'CASH_REWARD',
                        description: '₹100 cash reward for 10 paid subscription referrals',
                        cashAmount: 100,
                        referralCount: paidReferrals
                    }
                })
            );

            operations.push(
                prisma.user.update({
                    where: { id: userId },
                    data: {
                        withdrawableAmount: { increment: 100 }
                    }
                })
            );

            newRewardsAwarded = true;
        }

        // Execute all operations in parallel
        if (operations.length > 0) {
            await Promise.all(operations);
        }

        return newRewardsAwarded;

    } catch (error) {
        console.error('Error checking milestone rewards:', error);
        return false;
    }
};

export const getReferralStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                sentReferrals: {
                    include: {
                        referredUser: {
                            select: { name: true, email: true, createdAt: true, subscriptionTier: true }
                        }
                    }
                },
                rewards: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const totalReferrals = user.sentReferrals.length;
        const completedReferrals = user.sentReferrals.filter(r => r.status === 'COMPLETED').length;
        const pendingReferrals = user.sentReferrals.filter(r => r.status === 'PENDING').length;
        const paidReferrals = user.sentReferrals.filter(r => 
            r.status === 'COMPLETED' && r.referredUser.subscriptionTier === 'PREMIUM'
        ).length;

        // Check and award milestone rewards (only when fetching stats)
        const newRewardsAwarded = await checkAndAwardMilestoneRewards(user.id, {
            completedReferrals,
            paidReferrals
        });

        // If new rewards were awarded, fetch updated user data
        let finalUser = user;
        if (newRewardsAwarded) {
            const updatedUser = await prisma.user.findUnique({
                where: { id: req.user.id },
                include: {
                    sentReferrals: {
                        include: {
                            referredUser: {
                                select: { name: true, email: true, createdAt: true, subscriptionTier: true }
                            }
                        }
                    },
                    rewards: {
                        orderBy: { createdAt: 'desc' }
                    }
                }
            });
            if (updatedUser) {
                finalUser = updatedUser;
            }
        }

        const stats = {
            totalReferrals,
            completedReferrals,
            pendingReferrals,
            paidReferrals,
            totalEarnings: finalUser.totalEarnings,
            withdrawableAmount: finalUser.withdrawableAmount,
            referralCode: finalUser.referralCode,
            recentReferrals: user.sentReferrals.slice(0, 5).map(r => ({
                name: r.referredUser.name || r.referredUser.email,
                status: r.status,
                createdAt: r.createdAt,
                isPremium: r.referredUser.subscriptionTier === 'PREMIUM'
            })),
            rewards: finalUser.rewards,
            newRewardsAwarded // Let frontend know if new rewards were just awarded
        };

        res.json(stats);
    } catch (error) {
        console.error('Error getting referral stats:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const processReferral = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { referralCode } = req.body;

        if (!referralCode) {
            return res.status(400).json({ error: "Referral code is required" });
        }

        // Single query to get both users with all needed data
        const [currentUser, referrer] = await prisma.$transaction([
            prisma.user.findUnique({
                where: { id: req.user.id },
                select: { referredBy: true, email: true, name: true }
            }),
            prisma.user.findUnique({
                where: { referralCode },
                select: { 
                    id: true, 
                    name: true, 
                    subscriptionTier: true, 
                    totalRequestsLimit: true, 
                    totalEarnings: true 
                }
            })
        ]);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser.referredBy) {
            return res.status(400).json({ error: "User already has a referrer" });
        }

        if (!referrer) {
            return res.status(404).json({ error: "Invalid referral code" });
        }

        if (referrer.id === req.user.id) {
            return res.status(400).json({ error: "Cannot refer yourself" });
        }

        // Single transaction to handle all database operations
        await prisma.$transaction(async (tx) => {
            // Create referral record and update referred user
            await Promise.all([
                tx.referral.create({
                    data: {
                        referrerId: referrer.id,
                        referredUserId: req.user!.id,
                        status: 'COMPLETED',
                        completedAt: new Date(),
                        creditsAwarded: 20
                    }
                }),
                tx.user.update({
                    where: { id: req.user!.id },
                    data: { referredBy: referrer.id }
                })
            ]);

            // Award credits to free users
            if (referrer.subscriptionTier === 'FREE') {
                await Promise.all([
                    tx.user.update({
                        where: { id: referrer.id },
                        data: {
                            totalRequestsLimit: referrer.totalRequestsLimit + 20,
                            totalEarnings: referrer.totalEarnings + 20
                        }
                    }),
                    tx.reward.create({
                        data: {
                            userId: referrer.id,
                            type: 'DAILY_CREDIT_BONUS',
                            description: `20 bonus credits for referring ${currentUser.name || currentUser.email}`,
                            creditsAwarded: 20,
                            referralCount: 1
                        }
                    })
                ]);
            }
        });

        res.json({ 
            message: "Referral processed successfully",
            referrerName: referrer.name
        });

    } catch (error) {
        console.error('Error processing referral:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const withdrawCashReward = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { amount, paymentMethod, accountDetails } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (amount > user.withdrawableAmount) {
            return res.status(400).json({ error: "Insufficient withdrawable amount" });
        }

        if (amount < 100) {
            return res.status(400).json({ error: "Minimum withdrawal amount is ₹100" });
        }

        // Update user's withdrawable amount
        await prisma.user.update({
            where: { id: user.id },
            data: {
                withdrawableAmount: {
                    decrement: amount
                }
            }
        });

        // Mark cash rewards as withdrawn
        await prisma.reward.updateMany({
            where: {
                userId: user.id,
                type: 'CASH_REWARD',
                isWithdrawn: false
            },
            data: {
                isWithdrawn: true,
                withdrawnAt: new Date()
            }
        });

        // Here you would integrate with payment gateway for actual withdrawal
        // For now, just return success
        res.json({ 
            success: true, 
            message: `₹${amount} withdrawal request submitted successfully`,
            remainingAmount: user.withdrawableAmount - amount
        });

    } catch (error) {
        console.error('Error processing withdrawal:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};