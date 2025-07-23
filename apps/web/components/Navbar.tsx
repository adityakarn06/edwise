import { Bot, ChevronDown, Plus, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border border-white/10 bg-black/95 text-white">
      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-800 cursor-pointer">
        <div className="bg-white p-1 rounded-md">
          <Bot className="h-4 w-4 text-black" />
        </div>
        <span className="font-medium text-md">Chat With Pdf</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg border border-slate-700">
          <Plus className="h-4 w-4" />
          New Chat
        </button>
        <div className="h-8 w-8 p-1 rounded-4xl bg-orange-200 flex items-center justify-center cursor-pointer">
          <User className="h-4 w-4 text-slate-900" />
        </div>
      </div>
    </div>
  );
}