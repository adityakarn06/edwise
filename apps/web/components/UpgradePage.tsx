"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle, X } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface SubscriptionData {
  subscriptionTier: 'FREE' | 'PREMIUM';
  subscription?: {
    status: string;
    currentPeriodEnd: string;
  };
}

interface UsageStats {
  isPremium: boolean;
  subscriptionTier: 'FREE' | 'PREMIUM';
  usage: {
    pdfChatMessages: number;
    mcqGenerations: number;
    summaryGenerations: number;
    impQuestionsGenerations: number;
    totalRequests: number;
  };
  limits: {
    pdfChatMessages: number;
    mcqGenerations: number;
    summaryGenerations: number;
    impQuestionsGenerations: number;
    totalRequests: number;
  };
}

export default function UpgradePage() {
  const { data: session } = useSession();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetchSubscriptionData();
      fetchUsageStats();
    }
  }, [session]);

  const fetchSubscriptionData = async () => {
    try {
      const { data } = await api.get('/payment/subscription-status');
      setSubscriptionData(data);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsageStats = async () => {
    try {
      const { data } = await api.get('/usage/stats');
      setUsageStats(data);
    } catch (error) {
      console.error('Error fetching usage stats:', error);
    }
  };

  const handleUpgrade = async () => {
    router.push('/upgrade/process');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const isPremium = subscriptionData?.subscriptionTier === 'PREMIUM';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isPremium ? 'Your Premium Plan' : 'Upgrade to Premium'}
          </h1>
          <p className="text-gray-400 text-lg">
            {isPremium 
              ? 'Enjoy unlimited access to all features' 
              : 'Unlock unlimited access to AI chat and MCQ generation'
            }
          </p>
        </div>

        {usageStats && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Today's Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400">Chat Messages</div>
                <div className="text-2xl font-bold text-white">
                  {usageStats.usage.pdfChatMessages}
                  {usageStats.limits.pdfChatMessages > 0 && (
                    <span className="text-sm text-gray-400">/{usageStats.limits.pdfChatMessages}</span>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400">MCQ Generations</div>
                <div className="text-2xl font-bold text-white">
                  {usageStats.usage.mcqGenerations}
                  {usageStats.limits.mcqGenerations > 0 && (
                    <span className="text-sm text-gray-400">/{usageStats.limits.mcqGenerations}</span>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400">Summary Generations</div>
                <div className="text-2xl font-bold text-white">
                  {usageStats.usage.summaryGenerations}
                  {usageStats.limits.summaryGenerations > 0 && (
                    <span className="text-sm text-gray-400">/{usageStats.limits.summaryGenerations}</span>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400">Important Questions</div>
                <div className="text-2xl font-bold text-white">
                  {usageStats.usage.impQuestionsGenerations}
                  {usageStats.limits.impQuestionsGenerations > 0 && (
                    <span className="text-sm text-gray-400">/{usageStats.limits.impQuestionsGenerations}</span>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400">Total Requests</div>
                <div className="text-2xl font-bold text-white">
                  {usageStats.usage.totalRequests}
                  {usageStats.limits.totalRequests > 0 && (
                    <span className="text-sm text-gray-400">/{usageStats.limits.totalRequests}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg">/month</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  10 chat messages per day
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  10 MCQ generations per day
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  10 summary generations per day
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  10 important questions per day
                </li>
                <li className="flex items-center text-gray-300">
                  <X className="w-5 h-5 text-red-400 mr-3" />
                  Limited features
                </li>
              </ul>
              {!isPremium && (
                <div className="text-center">
                  <span className="bg-blue-600 text-white px-6 py-3 rounded-lg">Current Plan</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/50 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Popular</span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="text-4xl font-bold text-white mb-4">₹99<span className="text-lg">/month</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited chat messages
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited MCQ generations
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited summary generations
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited important questions
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Advanced features
                </li>
              </ul>
              <div className="text-center">
                {isPremium ? (
                  <div>
                    <span className="bg-green-600 text-white px-6 py-3 rounded-lg mb-4 block">Current Plan</span>
                    {subscriptionData?.subscription?.currentPeriodEnd && (
                      <p className="text-yellow-400 text-sm">
                        Subscription will end on {new Date(subscriptionData.subscription.currentPeriodEnd).toLocaleDateString()}
                      </p>  
                    )}
                    
                  </div>
                ) : (
                  <button
                    onClick={handleUpgrade}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Upgrade Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What happens when I reach my daily limit?</h3>
              <p className="text-gray-300">Free users can make up to 10 requests per day for each feature (chat messages, MCQ generations, summary generations, and important questions). Once you reach any limit, you'll need to wait until the next day or upgrade to premium for unlimited access.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">We accept all major credit cards, UPI, net banking through our secure payment processor Razorpay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}