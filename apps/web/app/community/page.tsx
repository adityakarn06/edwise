"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
import CommunityHomepage from "@/components/community/CommunityHomepage";

export default function Page() {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-[18%]">
                <Sidebar />
            </div>
            <div className="w-[82%] h-screen flex flex-col">
                <div className="h-[8%]">
                    <Navbar giveOptions={false} ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />} ctaText="Upgrade" onCtaClick={() => toast.success("This button has no functionality yet!")} />
                </div>
                <div className="h-[92%] bg-black/90">
                    <CommunityHomepage />
                </div>
            </div>
        </div>
    );
}