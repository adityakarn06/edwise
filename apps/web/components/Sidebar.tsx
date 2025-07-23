"use client";
import { ChevronLeft, FileText, MessageSquare, PanelRight, Plus, Search } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col bg-black/95 text-white/80">
      <div className="h-[8%] flex items-center justify-between border-b border-white/10 p-3">
          <h1 className="text-xl font-bold">Edwise</h1>
        <button className="rounded-md p-1 hover:bg-slate-700">
          <PanelRight size={20} />
        </button>
      </div>
      <div className="flex flex-col h-full justify-between p-2">
        <div>
          <SidebarItem onClickFn={() => router.push("/")} text="Home" icon={<FileText className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/ask-pdf")} text="Ask your pdf" icon={<FileText className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/mcq-generator")} text="MCQ generator" icon={<FileText className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/resources")} text="Your resources" icon={<FileText className="h-4 w-4 text-white/60" />} />
          <SidebarItem onClickFn={() => router.push("/community")} text="Study groups" icon={<FileText className="h-4 w-4 text-white/60" />} />
        </div>
        <div>
          UPGRADE
        </div>  
      </div>
      
    </div>
  );
};
export default Sidebar;