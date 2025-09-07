"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Copy, Check, Share2 } from "lucide-react";
import api from "../lib/api";

export default function ReferCodeCard() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReferralCode = async () => {
      if (session?.user) {
        setLoading(true);
        try {
          const response = await api.get('/referral/code');
          setReferralCode(response.data.referralCode);
        } catch (error) {
          console.error('Error fetching referral code:', error);
          toast.error("Failed to load referral code");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReferralCode();
  }, [session]);
    
  const copyToClipboard = async () => {
    try {
      const referralLink = `${window.location.origin}/sign-up/?ref=${referralCode}`;
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
        const referralLink = `${window.location.origin}/sign-up?ref=${referralCode}`;
        const subject = "Join Edwise - Your AI Study Companion!";
        const body = `Hey! I've been using Edwise for my studies and it's amazing! Join using my referral link and we both get credits: ${referralLink}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }
    }
  ];
      
  return (
    <div className="flex flex-col gap-2 items-start justify-start p-5 sm:p-6 border border-white/10 bg-white/6 rounded-lg text-white/90 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-all">
      <div className="mb-2">
        <h2 className="text-white/90 text-lg sm:text-xl font-medium">Your Referral Code</h2>
      </div>
      <div className="w-full space-y-4">
        <div className="bg-black/50 border border-white/20 rounded-lg p-4">
          <p className="text-xs sm:text-sm text-white/60 mb-2 font-light">Referral Code</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <code className="text-base sm:text-lg font-mono text-green-400 break-all">
              {loading ? "Loading..." : referralCode || "Loading..."}
            </code>
            <button
              onClick={copyToClipboard}
              disabled={!referralCode || loading}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-white/60 font-light">Share your referral link:</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                disabled={loading || !referralCode}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/40 text-white/80 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors"
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