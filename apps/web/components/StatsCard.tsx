import { CreditCard, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

interface ReferralStats {
    totalReferrals: number;
    totalEarnings: number;
    pendingCredits: number;
    lifetimeEarnings: number;
}

export default function StatsCard() {

  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    totalEarnings: 0,
    pendingCredits: 0,
    lifetimeEarnings: 0
  });

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-3">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white/90">{stats.totalReferrals}</h3>
            <p className="text-sm text-white/60">Total Referrals</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-3">
              <CreditCard className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white/90">{stats.totalEarnings}</h3>
            <p className="text-sm text-white/60">Available Credits</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-lg mb-3">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white/90">{stats.pendingCredits}</h3>
            <p className="text-sm text-white/60">Pending Credits</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mb-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white/90">{stats.lifetimeEarnings}</h3>
            <p className="text-sm text-white/60">Lifetime Earnings</p>
          </div>
        </div>
    )
}