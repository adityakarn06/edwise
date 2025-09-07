"use client";
import { Crown, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import Dashboard from "@/components/Dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsageStats } from "@/hooks/useUsageStats";
import { useSession } from "next-auth/react";
import { useEffect, Suspense } from "react";
import api from "@/lib/api";

function DashboardContent() {
  const { isPremium } = useUsageStats();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    const processReferral = async () => {
      if (referralCode && session?.user?.id) {
        try {
          const response = await api.post('/referral/process', {
            referralCode: decodeURIComponent(referralCode)
          });
          
          if (response.data.referrerName) {
            toast.success(`Welcome! You've been referred by ${response.data.referrerName}.`);
          }
          
          const url = new URL(window.location.href);
          url.searchParams.delete('ref');
          window.history.replaceState({}, '', url.toString());
        } catch (error: any) {
          if (error.response?.data?.error !== "User already has a referrer") {
            console.error('Error processing referral:', error);
            toast.error('Invalid referral code');
          }
          
          // Remove the ref parameter from URL even on error
          const url = new URL(window.location.href);
          url.searchParams.delete('ref');
          window.history.replaceState({}, '', url.toString());
        }
      }
    };

    processReferral();
  }, [referralCode, session?.user?.id]);

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          giveOptions={false}
          ctaIcon={isPremium ? <Crown className="h-4 w-4" /> : <SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText={isPremium ? "Premium" : "Upgrade"}
          onCtaClick={() => router.push('/upgrade')}
        />
      </div>
      <div className="h-[92%] overflow-y-auto">
        <Dashboard />
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
