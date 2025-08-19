"use client";
import { SquareArrowOutUpRight, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import InvitePage from "@/components/Invite";
import toast from "react-hot-toast";

export default function Page() {
  return (
    <>
      <div className="h-[8%]">
        <Navbar
          headingIcon={<Gift className="h-5 w-5" />}
          headingText="Invite & Earn"
          giveOptions={false}
          ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText="Upgrade"
          onCtaClick={() =>
            toast.success("This button has no functionality yet!")
          }
        />
      </div>
      <div className="h-[92%]">
        <InvitePage />
      </div>
    </>
  );
}
