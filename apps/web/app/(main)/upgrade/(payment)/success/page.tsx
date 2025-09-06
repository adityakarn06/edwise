"use client";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ConfirmAnimation from "@/components/animations/ConfirmAnimation";

interface SubscriptionData {
    subscriptionTier: 'FREE' | 'PREMIUM';
    subscription?: {
      status: string;
      currentPeriodEnd: string;
    };
}

export default function OrderSuccessPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

    const fetchSubscriptionData = async () => {
        try {
          const { data } = await api.get('/payment/subscription-status');
          setSubscriptionData(data);
        } catch (error) {
          console.error('Error fetching subscription data:', error);
        }
    };

    const handleBackToUpgrade = () => {
        router.push('/upgrade');
    };

    const handleGoToDashboard = () => {
        router.push('/dashboard');
    };

    useEffect(() => {
        if (session?.user) {
          fetchSubscriptionData();
        }
    }, [session]);

    if (subscriptionData?.subscriptionTier === 'FREE') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Upgrade Incomplete</h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-6">It seems like your upgrade was not successful. Please try again.</p>
                    <p className="text-lg md:text-xl text-gray-300 mb-6">If amount is deducted from account, it will be refunded within 7 business days</p>
                    <button
                        onClick={handleBackToUpgrade}
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full max-w-xs md:max-w-md"
                    >
                        Back to Upgrade Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-white/20">
                <div className="w-60 h-60 md:w-80 md:h-80 mx-auto mb-6">
                    <ConfirmAnimation />
                </div>
                <h1 className="text-xl md:text-3xl text-green-400 font-bold text-center mb-4">You have been upgraded successfully!</h1>
                <div className="space-y-2 mt-4 text-center">
                    <p className="text-base md:text-lg text-gray-300">You will receive an email confirmation shortly.</p>
                    <p className="text-base md:text-lg text-gray-300">Your subscription status is: <strong className="text-white">{subscriptionData?.subscription?.status}</strong></p>
                </div>
                <button
                    onClick={handleGoToDashboard}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full mt-6 font-medium cursor-pointer"
                >Go to dashboard</button>
            </div>
        </div>
    )
}