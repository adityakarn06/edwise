"use client";

import { Crown } from "lucide-react";
import { useUsageStats } from "@/hooks/useUsageStats";

export default function UsageDisplay() {
  const { usageStats, loading, isPremium, isNearLimit } = useUsageStats();

  if (loading) {
    return (
      <div className="flex flex-col gap-1 p-4 border border-white/10 bg-white/6 rounded-md mb-2">
        <div className="h-4 bg-white/20 rounded animate-pulse mb-1"></div>
        <div className="h-3 bg-white/10 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!usageStats) return null;

  const totalUsed = usageStats.usage.totalRequests;
  const totalLimit = usageStats.limits.totalRequests;
  const usagePercentage = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;
  
  return (
    <div className="flex flex-col gap-1 p-4 border border-white/10 bg-white/6 rounded-md mb-2">
      <div className="flex items-center gap-2">
        {isPremium ? (
          <>
            <Crown className="h-4 w-4 text-yellow-400" />
            <h2 className="text-md text-white/90">Premium Plan</h2>
          </>
        ) : (
          <h2 className="text-md text-white/90">Free Plan</h2>
        )}
      </div>
      <p className="text-xs text-white/50">
        {isPremium ? (
          "Unlimited messages"
        ) : (
          `${totalUsed} / ${totalLimit} messages used today`
        )}
      </p>
      {!isPremium && (
        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isNearLimit ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}