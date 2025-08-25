"use client";
import { User, LogOut, ChevronDown, ChevronUp, Trash, CloudUpload, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

interface NavbarProps {
  headingIcon?: React.ReactNode;
  headingText?: string;
  giveOptions?: boolean;
  pdfs?: string[];
  setCurrentPdf?: React.Dispatch<React.SetStateAction<string>>;
  openFileUpload?: React.Dispatch<React.SetStateAction<boolean>>;
  ctaText: string;
  ctaIcon: React.ReactNode;
  onCtaClick?: () => void;
}

export default function Navbar({
  headingIcon,
  headingText,
  giveOptions = false,
  pdfs,
  setCurrentPdf,
  openFileUpload,
  ctaText,
  ctaIcon,
  onCtaClick,
}: NavbarProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
          <div className="flex flex-col justify-center h-full relative">
            <div className="flex gap-2 items-center">
              <div className="bg-white/10 p-1 rounded-md">{headingIcon}</div>
              <span className="font-medium text-md">{headingText}</span>
              {giveOptions && (
                <>
                  <div
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={() => setIsOptionOpen(!isOptionOpen)}
                  >
                    {isOptionOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </>
              )}
            </div>
            {isOptionOpen && (
              <div className="z-50 absolute flex flex-col gap-2 top-full left-0 mt-4 bg-white p-2 rounded-md border-3 border-black min-w-[120px]">
                {pdfs && pdfs.length > 0 && 
                  pdfs.map((pdf: string, index: number) => (
                    pdf && (
                      <div
                        key={index}
                        className="flex gap-2 justify-center items-center"
                      >
                          <div 
                            onClick={() => {
                              if (setCurrentPdf) {
                                setCurrentPdf(pdf);
                              }
                              setIsOptionOpen(false);
                              openFileUpload?.(false);
                            }}
                            className="p-1 rounded-md text-sm text-black hover:border hover:border-black transition-colors cursor-pointer w-[180px] overflow-hidden">
                              {pdf.length > 20 ? `${pdf.slice(0, 20)}...` : pdf}
                          </div>
                          <div>
                            <Trash 
                              onClick={() => {
                                console.log(`Delete PDF: ${pdf}`);
                                toast.success("This button has no functionality yet!");
                              }}
                              className="text-black p-1 rounded-full border-1 cursor-pointer hover:bg-black hover:text-white transition-color"
                            />
                          </div>
                      </div>
                    )
                  ))
                }
                
                <div className="flex gap-2 justify-center items-center">
                  <div
                   onClick={() => {
                    if (openFileUpload) {
                      openFileUpload(true);
                    }
                    setIsOptionOpen(false);
                    }}
                   className="p-1 rounded-md text-sm text-black hover:border hover:border-black transition-colors cursor-pointer w-[180px] overflow-hidden">
                    Upload new pdf
                  </div>
                  <div>
                    <Plus
                     onClick={() => {
                      if (openFileUpload) {
                        openFileUpload(true);
                      }
                      setIsOptionOpen(false);
                      }}
                     className="text-black p-1 rounded-full border-1 cursor-pointer hover:bg-black hover:text-white transition-color" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onCtaClick}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg border border-slate-700"
        >
          {ctaIcon}
          {ctaText}
        </button>
        <div className="relative" ref={dropdownRef}>
          <div
            className="h-8 w-8 rounded-4xl bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={24}
                height={24}
                className="h-8 w-8 rounded-full"
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
