import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@repo/postgres-db/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, referralCode } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const emailHash = btoa(email).slice(0, 6).toUpperCase().replace(/[^A-Z0-9]/g, '');
        const timestamp = Date.now().toString().slice(-3);
        const uniqueId = `EDW${uuidv4().replace(/-/g, '').slice(0, 5).toUpperCase()}`;
        const newUserReferralCode = `EDW${emailHash}${uniqueId}${timestamp}`;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                referralCode: newUserReferralCode,
            },
        });

        if (referralCode) {
            try {
                const referrer = await prisma.user.findUnique({
                    where: { referralCode },
                    include: { subscription: true }
                });

                if (referrer) {
                    await prisma.referral.create({
                        data: {
                            referrerId: referrer.id,
                            referredUserId: user.id,
                            status: 'COMPLETED',
                            completedAt: new Date(),
                            creditsAwarded: 20
                        }
                    });

                    await prisma.user.update({
                        where: { id: user.id },
                        data: { referredBy: referrer.id }
                    });

                    // Award 20 credits to free users instantly (add to daily limit)
                    if (referrer.subscriptionTier === 'FREE') {
                        await prisma.user.update({
                            where: { id: referrer.id },
                            data: {
                                totalRequestsLimit: referrer.totalRequestsLimit + 20,
                                totalEarnings: referrer.totalEarnings + 20
                            }
                        });

                        // Create reward record
                        await prisma.reward.create({
                            data: {
                                userId: referrer.id,
                                type: 'DAILY_CREDIT_BONUS',
                                description: `20 bonus credits for referring ${user.name || user.email}`,
                                creditsAwarded: 20,
                                referralCount: 1
                            }
                        });
                    }
                }
            } catch (referralError) {
                console.error("Error applying referral code:", referralError);
            }
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            { 
                message: "User created successfully", 
                user: userWithoutPassword 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 