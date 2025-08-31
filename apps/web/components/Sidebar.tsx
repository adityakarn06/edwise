"use client";
import {
  BookCheck,
  BookOpen,
  BotMessageSquare,
  HandCoins,
  House,
  Library,
  MessageCircleQuestionMark,
  PanelRight,
  Menu,
  X,
  PanelLeft,
  Zap,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isMobile) {
    return (
      <>
        {/* Hamburger button */}
        {!isMobileMenuOpen && (
          <button
            className="fixed top-3 left-4 z-50 p-2 bg-black/95 rounded-md text-white/80 hover:bg-black/50 transition-colors cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
        )}

        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-64 bg-black/95 text-white/80 transform transition-transform duration-300 ease-in-out">
              <div className="h-[8%] flex items-center justify-between border-b border-white/10 p-3">
                <Image
                  src="/logo.png"
                  alt="Edwise Logo"
                  width={140}
                  height={140}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/dashboard");
                    closeMobileMenu();
                  }}
                />
                <button
                  className="rounded-md p-1 cursor-pointer hover:bg-slate-700"
                  onClick={closeMobileMenu}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col h-full justify-between p-2">
                <div>
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/dashboard");
                      closeMobileMenu();
                    }}
                    text="Dashboard"
                    icon={<House className="h-4 w-4 text-white/60" />}
                    isCollapsed={false}
                  />
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/ask-pdf");
                      closeMobileMenu();
                    }}
                    text="Ask your pdf"
                    icon={
                      <BotMessageSquare className="h-4 w-4 text-white/60" />
                    }
                    isCollapsed={false}
                  />
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/mcq-generator");
                      closeMobileMenu();
                    }}
                    text="MCQ generator"
                    icon={<BookCheck className="h-4 w-4 text-white/60" />}
                    isCollapsed={false}
                  />
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/community");
                      closeMobileMenu();
                    }}
                    text="Study groups"
                    icon={<BookOpen className="h-4 w-4 text-white/60" />}
                    isCollapsed={false}
                  />
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/resources");
                      closeMobileMenu();
                    }}
                    text="Your resources"
                    icon={<Library className="h-4 w-4 text-white/60" />}
                    isCollapsed={false}
                  />
                  <SidebarItem
                    onClickFn={() => {
                      router.push("/help");
                      closeMobileMenu();
                    }}
                    text="Feedback"
                    icon={
                      <MessageCircleQuestionMark className="h-4 w-4 text-white/60" />
                    }
                    isCollapsed={false}
                  />
                </div>
                <div className="m-2 flex flex-col gap-2 mb-16">
                  <hr className="border-white/10 mb-2" />
                  {isCollapsed ? null : (
                    <div className="flex flex-col gap-1 p-4 border border-white/10 bg-white/6 rounded-md mb-2">
                      <h2 className="text-md text-white/90">Free Plan</h2>
                      <p className="text-xs text-white/50">
                        0 / 10 messages used
                      </p>
                      <div className="h-2 bg-white/40 rounded mt-2"></div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      router.push("/upgrade");
                      closeMobileMenu();
                    }}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black text-sm py-2 rounded-lg w-full cursor-pointer"
                  >
                    <Zap size={16} />
                    <p>Upgrade Plan</p>
                  </button>
                  <button
                    onClick={() => {
                      router.push("/invite");
                      closeMobileMenu();
                    }}
                    className="flex items-center justify-center gap-2 bg-transparent hover:border-white/90 text-white border-1 border-white/50 text-sm py-2 rounded-lg w-full cursor-pointer"
                  >
                    <HandCoins size={16} />
                    <p>Invite & Earn</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={`flex h-screen flex-col bg-black/95 border-r-1 border-white/8 text-white/80 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="h-[8%] flex items-center justify-between border-b border-white/10 p-3">
        {!isCollapsed && (
          <Image
            src="/logo.png"
            alt="Edwise Logo"
            width={140}
            height={140}
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          />
        )}
        <button
          className="rounded-md p-1 cursor-pointer hover:bg-slate-700 ml-auto"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
        </button>
      </div>
      <div className="flex flex-col h-full justify-between p-2">
        <div>
          <SidebarItem
            onClickFn={() => router.push("/dashboard")}
            text="Dashboard"
            icon={<House className="h-4 w-4 text-white/60" />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            onClickFn={() => router.push("/ask-pdf")}
            text="Ask your pdf"
            icon={<BotMessageSquare className="h-4 w-4 text-white/60" />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            onClickFn={() => router.push("/mcq-generator")}
            text="MCQ generator"
            icon={<BookCheck className="h-4 w-4 text-white/60" />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            onClickFn={() => router.push("/community")}
            text="Study groups"
            icon={<BookOpen className="h-4 w-4 text-white/60" />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            onClickFn={() => router.push("/resources")}
            text="Your resources"
            icon={<Library className="h-4 w-4 text-white/60" />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            onClickFn={() => router.push("/help")}
            text="Feedback"
            icon={
              <MessageCircleQuestionMark className="h-4 w-4 text-white/60" />
            }
            isCollapsed={isCollapsed}
          />
        </div>
        <div className="m-2 flex flex-col gap-2">
          <hr className="border-white/10 mb-2" />
          {isCollapsed ? null : (
            <div className="flex flex-col gap-1 p-4 border border-white/10 bg-white/6 rounded-md mb-2">
              <h2 className="text-md text-white/90">Free Plan</h2>
              <p className="text-xs text-white/50">0 / 10 messages used</p>
              <div className="h-2 bg-white/40 rounded mt-2"></div>
            </div>
          )}
          <button
            onClick={() => router.push("/upgrade")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black text-sm py-2 rounded-lg w-full cursor-pointer"
          >
            <Zap size={16} />
            {isCollapsed ? null : <p>Upgrade to pro</p>}
          </button>
          <button
            onClick={() => router.push("/invite")}
            className="flex items-center justify-center gap-2 bg-transparent hover:border-white/90 text-white border-1 border-white/50 text-sm py-2 rounded-lg w-full cursor-pointer"
          >
            <HandCoins size={16} />
            {isCollapsed ? null : <p>Invite & Earn</p>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
