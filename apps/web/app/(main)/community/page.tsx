"use client";
import { Crown, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CommunityHomepage from "@/components/community/CommunityHomepage";
import { useUsageStats } from "@/hooks/useUsageStats";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isPremium } = useUsageStats();
  const router = useRouter();

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          giveOptions={false}
          ctaIcon={isPremium ? <Crown className="h-4 w-4" /> : <SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText={isPremium ? "Premium" : "Upgrade"}
          onCtaClick={() =>
            router.push("/upgrade")
          }
        />
      </div>
      <div className="h-[92%] bg-black/90">
        <CommunityHomepage />
      </div>
    </>
  );
}
