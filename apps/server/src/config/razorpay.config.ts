import Razorpay from 'razorpay';
import crypto from "crypto";

const createRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys are not set in environment variables");
    }
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    return new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
    })
}

const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string
  ) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET as string;
  
    const sig = crypto
      .createHmac("sha256", keySecret)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");
    return sig;
};

export { createRazorpayInstance, generatedSignature };