"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, CreditCard, Shield, Clock } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ProcessPaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/payment/create-order");

      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,

        handler: async function (response: any) {
          const res = await api.post("payment/verify-payment", {
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          if (res.data.isOK === true) {
            router.push("/upgrade/success");
          } else {
            toast.error("Payment failed. If amount already debited, you'll get a refund soon.");
            router.push("/upgrade/failure");
          }
        },
        modal: {
          ondismiss: function() {
            router.push("/upgrade/failure");
            setIsLoading(false);
          }
        }
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. If amount already debited, you'll get a refund soon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="bg-blue-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Processing Payment</h1>
          <p className="text-gray-400">Redirecting to secure payment gateway...</p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin mr-2" />
            <span className="text-white">Please wait...</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Secure payment powered by Razorpay</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Do not refresh or close this page</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-xs mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
}