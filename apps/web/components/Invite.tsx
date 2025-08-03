import { Gift } from "lucide-react";
import ReferHow from "./ReferHow";
import ReferCodeCard from "./ReferCodeCard";
import StatsCard from "./StatsCard";

export default function InvitePage() {

  return (
    <div className="h-full bg-black/90 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            <Gift className="h-4 w-4" />
            Earn Credits by Inviting Friends
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white/90">
            Invite & Earn
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Share Edwise with your friends and earn credits for every successful referral. 
            Help others discover the power of AI-assisted learning while growing your credit balance.
          </p>
        </div>

        <StatsCard />

        <div className="grid md:grid-cols-2 gap-8">
          <ReferCodeCard />
          <ReferHow />
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-xl p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-white/90">Credit Rewards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50</div>
                <p className="text-white/60">Credits for you</p>
                <p className="text-sm text-white/50">When friend signs up</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">50</div>
                <p className="text-white/60">Credits for friend</p>
                <p className="text-sm text-white/50">Welcome bonus</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">100</div>
                <p className="text-white/60">Bonus credits</p>
                <p className="text-sm text-white/50">After 5 successful referrals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-white/60 space-y-2">
            <li>• Credits are awarded when referred users complete their first study session</li>
            <li>• Credits can be used for premium features, additional AI queries, and advanced tools</li>
            <li>• Referral credits expire after 12 months of inactivity</li>
            <li>• Fraudulent referrals or self-referrals will result in credit forfeiture</li>
            <li>• Edwise reserves the right to modify the referral program at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}