import { Response } from "express";
import { createRazorpayInstance, generatedSignature } from "../config/razorpay.config";
import { AuthenticatedRequest } from "../middleware/auth";
import { PrismaClient } from "@repo/postgres-db/client";

const prisma = new PrismaClient();
const razorpayInstance = createRazorpayInstance();

const createOrder = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const amount = 99; //INR

    if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, message: "Invalid amount" });
    }
    
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Math.random() * 1000}`,
    };

    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error("Error creating Razorpay order: ", err);
                return res.status(500).json({
                    success: false,
                    message: "Error creating razorpay order",
                });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error... order not placed" });
    }
}


const verifyPayment = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const signature = generatedSignature(orderId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
        res.status(400).json({ isOK: false, message: "Payment Verification Failed" });
    }

    try {
        await prisma.user.update({
            where: { id: req.user?.id },
            data: { 
            subscriptionTier: "PREMIUM",
            subscription: {
                    create: {
                    paymentId: razorpayPaymentId,
                    orderId: orderId,
                    status: "ACTIVE",
                    tier: "PREMIUM",
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                }
            }
            },
        });
    } catch (error) {
        console.error("payment database update error:", error);
        res.status(500).json({ isOK: false, message: "Error updating order status. If amount already debited, you'll get a refund soon." });
    }

    res.status(200).json({ isOK: true, message: "Payment Verified Successfully" });
}

export { createOrder, verifyPayment };