import { Gift, Crown, DollarSign } from "lucide-react";
import ReferHow from "./ReferHow";
import ReferCodeCard from "./ReferCodeCard";
import StatsCard from "./StatsCard";
import WithdrawCard from "./WithdrawCard";

export default function InvitePage() {

  return (
    <div className="h-full bg-black/90 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            <Gift className="h-4 w-4" />
            Earn Credits & Cash by Inviting Friends
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white/90">
            Invite & Earn
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Share Edwise with your friends and earn instant credits, premium access, and real cash rewards for every successful referral. 
            Help others discover the power of AI-assisted learning while growing your earnings immediately.
          </p>
        </div>

        <StatsCard />

        <div className="grid md:grid-cols-2 gap-8">
          <ReferCodeCard />
          <ReferHow />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-white/90">Instant Rewards</h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">+20</div>
                  <p className="text-white/60">Bonus Credits</p>
                  <p className="text-sm text-white/50">Instant reward when friend signs up</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-white/90">Milestone Rewards</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Crown className="h-8 w-8 text-yellow-400" />
                  <div className="text-left">
                    <div className="font-bold text-yellow-400">1 Month Premium Free</div>
                    <p className="text-sm text-white/60">10 successful referrals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <div className="text-left">
                    <div className="font-bold text-green-400">₹100 Cash Reward</div>
                    <p className="text-sm text-white/60">10 paid subscription referrals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WithdrawCard />

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-white/60 space-y-2">
            <li>• Free users get 20 bonus credits (added to daily limit) instantly when someone signs up with their referral code</li>
            <li>• 10 successful referrals = 1 month free premium access</li>
            <li>• 10 users who upgrade to paid subscription through your referrals = ₹100 cash reward</li>
            <li>• Cash rewards can be withdrawn anytime with minimum withdrawal of ₹100</li>
            <li>• Referral credits are awarded instantly upon successful signup with your referral code</li>
            <li>• Fraudulent referrals or self-referrals will result in credit forfeiture and account suspension</li>
            <li>• Edwise reserves the right to modify the referral program at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}