"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import Dashboard from "@/components/Dashboard";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className="h-[8%]">
        <Navbar
          giveOptions={false}
          ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText="Upgrade"
          onCtaClick={() => router.push('/upgrade')}
        />
      </div>
      <div className="h-[92%] overflow-y-auto">
        <Dashboard />
      </div>
    </>
  );
}
