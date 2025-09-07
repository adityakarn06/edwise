import { CreditCard, Users, Crown, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  paidReferrals: number;
  totalEarnings: number;
  withdrawableAmount: number;
  referralCode: string;
  recentReferrals: Array<{
    name: string;
    status: string;
    createdAt: string;
    isPremium: boolean;
  }>;
  rewards: Array<{
    id: string;
    type: string;
    description: string;
    creditsAwarded?: number;
    cashAmount?: number;
    premiumMonths?: number;
    createdAt: string;
  }>;
}

export default function StatsCard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    paidReferrals: 0,
    totalEarnings: 0,
    withdrawableAmount: 0,
    referralCode: "",
    recentReferrals: [],
    rewards: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchReferralStats();
    } else if (session === null) {
      // No session, stop loading
      setLoading(false);
    }
  }, [session]);

  const fetchReferralStats = async () => {
    try {
      const response = await api.get('/referral/stats');
      const data = response.data;
      
      setStats(data);
      
      if (data.newRewardsAwarded) {
        const premiumReward = data.rewards.find((r: any) => r.type === 'PREMIUM_MONTH' && r.referralCount >= 10);
        const cashReward = data.rewards.find((r: any) => r.type === 'CASH_REWARD' && r.referralCount >= 10);
        
        if (premiumReward) {
          toast.success('🎉 Congratulations! You\'ve unlocked 1 month free premium!');
        }
        if (cashReward) {
          toast.success('💰 Amazing! You\'ve earned ₹100 cash reward!');
        }
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 animate-pulse">
            <div className="h-12 w-12 bg-white/10 rounded-lg mb-3"></div>
            <div className="h-8 bg-white/10 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-3">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white/90">{stats.completedReferrals}</h3>
          <p className="text-sm text-white/60">Total Referrals</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-3">
            <CreditCard className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white/90">{stats.totalEarnings}</h3>
          <p className="text-sm text-white/60">Credits Earned</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-lg mb-3">
            <Crown className="h-6 w-6 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white/90">{stats.paidReferrals}</h3>
          <p className="text-sm text-white/60">Premium Referrals</p>
          <p className="text-xs text-yellow-400 mt-1">
            {Math.max(0, 10 - stats.paidReferrals)} more for ₹100
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mb-3">
            <DollarSign className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white/90">₹{stats.withdrawableAmount}</h3>
          <p className="text-sm text-white/60">Withdrawable</p>
        </div>
      </div>

      {stats.recentReferrals.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Recent Referrals</h3>
          <div className="space-y-3">
            {stats.recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90">{referral.name}</p>
                    <p className="text-xs text-white/60">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {referral.isPremium && (
                    <Crown className="h-4 w-4 text-yellow-400" />
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    referral.status === 'COMPLETED' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {referral.status === 'COMPLETED' ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}