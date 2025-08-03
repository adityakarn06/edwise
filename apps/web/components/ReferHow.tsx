
export default function ReferHow() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white/90 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-white/90">Share Your Link</h3>
                  <p className="text-sm text-white/60">Send your unique referral link to friends and classmates</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-white/90">They Sign Up</h3>
                  <p className="text-sm text-white/60">Your friend creates an account using your referral link</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-white/90">Both Earn Credits</h3>
                  <p className="text-sm text-white/60">You both receive 50 credits when they complete their first study session</p>
                </div>
              </div>
            </div>
          </div>
    )
}