"use client";
import { BookCheck, BookOpen, BotMessageSquare, ChevronLeft, FileText, HandCoins, House, Library, MessageCircleQuestionMark, MessageSquare, PanelRight, Plus, Search } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col bg-black/95 text-white/80">
      <div className="h-[8%] flex items-center justify-between border-b border-white/10 p-3">
        <Image
          src="/logo.png"
          alt="Edwise Logo"
          width={140}
          height={140}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <button className="rounded-md p-1 cursor-pointer hover:bg-slate-700">
          <PanelRight size={20} />
        </button>
      </div>
      <div className="flex flex-col h-full justify-between p-2">
        <div>
          <SidebarItem onClickFn={() => router.push("/")} text="Home" icon={<House className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/ask-pdf")} text="Ask your pdf" icon={<BotMessageSquare className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/mcq-generator")} text="MCQ generator" icon={<BookCheck className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/resources")} text="Your resources" icon={<Library className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/community")} text="Study groups" icon={<BookOpen className="h-4 w-4 text-white/60" />} />
        </div>
        <div>
          <SidebarItem onClickFn={() => router.push("/invite")} text="Invite & Earn" icon={<HandCoins className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/help")} text="Feedback" icon={<MessageCircleQuestionMark className="h-4 w-4 text-white/60" />} />
        </div>  
      </div>
      
    </div>
  );
};
export default Sidebar;