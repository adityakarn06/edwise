"use client";
import { User, LogOut, ChevronDown, ChevronUp, Trash, Plus, Bell, UserMinus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

interface NavbarProps {
  headingIcon?: React.ReactNode;
  headingText?: string;
  giveOptions?: boolean;
  optionType?: "community" | "pdf";
  memberCount?: number;
  pdfs?: string[];
  setCurrentPdf?: React.Dispatch<React.SetStateAction<string>>;
  openFileUpload?: React.Dispatch<React.SetStateAction<boolean>>;
  ctaLeftButton?: boolean;
  ctaLeftIcon?: React.ReactNode;
  ctaLeftButtonClick?: () => void;
  ctaText: string;
  ctaIcon: React.ReactNode;
  onCtaClick?: () => void;
}

export default function Navbar({
  headingIcon,
  headingText,
  giveOptions = false,
  optionType,
  memberCount,
  pdfs,
  setCurrentPdf,
  openFileUpload,
  ctaLeftButton,
  ctaLeftIcon,
  ctaLeftButtonClick,
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
              <div className="flex flex-col leading-tight">
                <p className="font-medium text-md">{headingText}</p>
                {memberCount !== undefined && (
                    <p className="text-xs text-gray-400">{memberCount} member{memberCount !== 1 ? "s" : ""}</p>
                )}
              </div>
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
            {optionType && isOptionOpen && optionType==="pdf" && (
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

            {optionType && isOptionOpen && optionType==="community" && (
              <div className="z-50 absolute flex flex-col gap-2 top-full left-0 mt-4 bg-white p-2 rounded-md border-3 border-black min-w-[120px]">
                <div 
                  className="flex gap-2 justify-center items-center"
                  onClick={() => {
                    toast.error("Right click on this community in sidebar for option to leave it!");
                    setIsOptionOpen(false);
                    }}>
                  <div
                   className="p-1 rounded-md text-sm text-red-600 hover:border hover:border-black transition-colors cursor-pointer w-[180px] overflow-hidden">
                    Leave Community
                  </div>
                  <div>
                    <UserMinus
                     className="text-red-600 p-1 rounded-full border-1 cursor-pointer hover:bg-red-600 hover:text-white transition-color" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell onClick={() => toast.success("adding this feature soon")} className="h-5 w-5 text-white/90 cursor-pointer" />
          {ctaLeftButton && (
            <button
              onClick={ctaLeftButtonClick}
            >
              {ctaLeftIcon}
            </button>
          )}
          <button
            onClick={onCtaClick}
            className="flex items-center gap-2 text-white/90 text-sm py-1.5 px-3 rounded-lg border-1 border-white/60 hover:bg-white/90 hover:text-black/90"
          >
            {ctaIcon}
            {ctaText}
          </button>  
        </div>
        

        <div className="w-px h-5 bg-white/20"></div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="rounded-4xl flex gap-2 items-center justify-center cursor-pointer hover:scale-105 transition-transform"
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
              <User className="h-4 w-4 text-white/80" />
            )}
            <div className="hidden md:flex items-center justify-between gap-1">
              {
                session?.user?.name && (
                  <span className="text-white/80">{session.user.name}</span>
                )
              }
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-white/90" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/90" />
              )}  
            </div>
            
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
