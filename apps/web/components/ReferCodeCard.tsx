"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Copy, Check, Share2 } from "lucide-react";


export default function ReferCodeCard() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");

    useEffect(() => {
        // Generate referral code based on user ID or email
        if (session?.user?.email) {
          const code = `EDW${btoa(session.user.email).slice(0, 8).toUpperCase()}`;
          setReferralCode(code);
        }
      }, [session]);
    
      const copyToClipboard = async () => {
        try {
          const referralLink = `${window.location.origin}?ref=${referralCode}`;
          await navigator.clipboard.writeText(referralLink);
          setCopied(true);
          toast.success("Referral link copied to clipboard!");
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          toast.error("Failed to copy to clipboard");
        }
      };
    
      const shareOptions = [
        {
          name: "Copy Link",
          icon: <Copy className="h-4 w-4" />,
          action: copyToClipboard
        },
        {
          name: "Share via Email",
          icon: <Share2 className="h-4 w-4" />,
          action: () => {
            const referralLink = `${window.location.origin}?ref=${referralCode}`;
            const subject = "Join Edwise - Your AI Study Companion!";
            const body = `Hey! I've been using Edwise for my studies and it's amazing! Join using my referral link and we both get credits: ${referralLink}`;
            window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
          }
        }
      ];
      
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white/90 mb-4">Your Referral Code</h2>
            <div className="space-y-4">
              <div className="bg-black/50 border border-white/20 rounded-lg p-4">
                <p className="text-sm text-white/60 mb-2">Referral Code</p>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono text-green-400">{referralCode || "Loading..."}</code>
                  <button
                    onClick={copyToClipboard}
                    disabled={!referralCode}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-white/60">Share your referral link:</p>
                <div className="flex gap-2">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      {option.icon}
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
    )
}