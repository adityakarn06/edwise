"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import api from '@/lib/api';

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

export function useUsageStats() {
  const { data: session } = useSession();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsageStats = async () => {
    try {
      const { data } = await api.get('/usage/stats');
      setUsageStats(data);
    } catch (error) {
      console.error('Error fetching usage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsageStats = () => {
    if (session?.user) {
      fetchUsageStats();
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUsageStats();
    }
  }, [session]);

  return {
    usageStats,
    loading,
    refreshUsageStats,
    isPremium: usageStats?.isPremium || false,
    isNearLimit: !usageStats?.isPremium && 
                 (usageStats?.usage?.totalRequests ?? 0) >= ((usageStats?.limits?.totalRequests ?? 0) * 0.8),
    isAtLimit: !usageStats?.isPremium && 
               (usageStats?.usage?.totalRequests ?? 0) >= (usageStats?.limits?.totalRequests ?? 0)
  };
}