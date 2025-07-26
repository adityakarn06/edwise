"use client";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface NavbarProps {
    headingIcon?: React.ReactNode;
    headingText?: string;
    ctaText: string;
    ctaIcon: React.ReactNode;
    onCtaClick?: () => void;
}

export default function Navbar({ headingIcon, headingText, ctaText, ctaIcon, onCtaClick }: NavbarProps) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
  };

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
          <div className="relative" ref={dropdownRef}>
            <div 
              className="h-8 w-8 p-1 rounded-4xl bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {session?.user?.image ? (
                <Image 
                  src={session.user.image}
                  alt="User Avatar"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <User className="h-4 w-4 text-black/80" />
              )}
            </div>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}