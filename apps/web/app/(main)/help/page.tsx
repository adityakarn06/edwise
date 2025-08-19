"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import Feedback from "@/components/Feedback";

export default function Page() {
  return (
    <>
      <div className="h-[8%]">
        <Navbar
          giveOptions={false}
          ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText="Upgrade"
          onCtaClick={() =>
            toast.success("This button has no functionality yet!")
          }
        />
      </div>
      <div className="flex items-center justify-center h-[92%] bg-black/90 text-white/80 text-2xl font-medium">
        <Feedback />
      </div>
    </>
  );
}
