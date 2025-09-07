import { Crown, DollarSign, Gift } from "lucide-react";

export default function ReferHow() {
    return (
        <div className="flex flex-col gap-2 items-start justify-start p-5 sm:p-6 border border-white/10 bg-white/6 rounded-lg text-white/90 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all">
            <div className="mb-2">
                <h2 className="text-white/90 text-lg sm:text-xl font-medium">How It Works</h2>
            </div>
            <div className="w-full space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white/90 text-sm sm:text-base">Share Your Link</h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light">Send your unique referral link to friends and classmates</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white/90 text-sm sm:text-base">They Sign Up</h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light">Your friend creates an account using your referral link</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white/90 text-sm sm:text-base">Earn Rewards</h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light">You instantly receive credits and milestone rewards are unlocked</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-white/10">
              <h3 className="font-medium text-white/90 mb-3 text-sm sm:text-base">Reward Tiers</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  <span className="text-white/60 font-light">+20 instant credits per signup (free users)</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  <span className="text-white/60 font-light">1 month premium at 10 referrals</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span className="text-white/60 font-light">₹100 cash at 10 paid referrals</span>
                </div>
              </div>
            </div>
          </div>
    )
}