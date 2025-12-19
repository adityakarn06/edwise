"use client";
import ExamHomepage from "@/components/mcq/ExamHomepage";
import Navbar from "@/components/Navbar";
import { useUsageStats } from "@/hooks/useUsageStats";
import {
  BookOpenCheck,
  Crown,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Page from "@/components/mcq/McqWrapper";

enum OptionType {
  PDF = "pdf",
  YOUTUBE = "youtube",
}

export default function ExamPage() {
  const { isPremium } = useUsageStats();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const onOptionClickHandler = (option: OptionType) => {
    setSelectedOption(option);
  }

  if (selectedOption) {
    return <Page />
  }

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          headingIcon={<BookOpenCheck className="h-4 w-4 text-white" />}
          headingText="Generate MCQs"
          ctaIcon={
            isPremium ? (
              <Crown className="h-4 w-4" />
            ) : (
              <SquareArrowOutUpRight className="h-4 w-4" />
            )
          }
          ctaText={isPremium ? "Premium" : "Upgrade"}
          onCtaClick={() => router.push("/upgrade")}
        />
      </div>

      <div className="h-[92%] w-full">
        <ExamHomepage onOptionClickHandler={onOptionClickHandler} />
      </div>
    </>
  );
}