import { Bot, ChevronDown, Plus, User } from "lucide-react";

interface NavbarProps {
    headingIcon?: React.ReactNode;
    headingText?: string;
    ctaText: string;
    ctaIcon: React.ReactNode;
    onCtaClick?: () => void;
}

export default function Navbar({ headingIcon, headingText, ctaText, ctaIcon, onCtaClick }: NavbarProps) {
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
        <div className="h-8 w-8 p-1 rounded-4xl bg-white/70 flex items-center justify-center cursor-pointer">
          <User className="h-4 w-4 text-black/80" />
        </div>
      </div>
    </div>
  );
}