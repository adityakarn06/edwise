"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
    headingIcon?: React.ReactNode;
    headingText?: string;
    ctaText: string;
    ctaIcon: React.ReactNode;
    onCtaClick?: () => void;
}

export default function Navbar({ headingIcon, headingText, ctaText, ctaIcon, onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-full items-center justify-between px-4 py-2 border border-white/10 bg-black/95 text-white">
      <div className="flex items-center gap-2 p-2 rounded-md">
        {headingText && (
          <>
            <div className="bg-white/10 p-1 rounded-md">
                {headingIcon}
            </div>
            <span className="font-medium text-md">{headingText}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onCtaClick} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg border border-slate-700">
          {ctaIcon}
          {ctaText}
        </button>
        <SignedOut>
          <div className="relative">
            <div 
              className="h-8 w-8 p-1 rounded-4xl bg-white/70 flex items-center justify-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <User className="h-4 w-4 text-black/80" />
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-black/50 rounded-md shadow-xl border border-white/20 z-10">
                <Link href="/sign-in" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
                  Sign In
                </Link>
                <Link href="/sign-up" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}