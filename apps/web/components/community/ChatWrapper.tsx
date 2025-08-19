"use client";
import { ArrowLeft, MessageCircleMore, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "../Navbar";
import toast from "react-hot-toast";
import Chat from "./Chat";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";


export default function CommunityWrapper({ slug, roomId }: { slug: string, roomId: string }) {
    const router = useRouter();
    return (
        <>
                <div className="h-[8%]">
                    <Navbar 
                        headingText={slug} 
                        headingIcon={<MessageCircleMore />} 
                        giveOptions={false}
                        ctaIcon={<ArrowLeft className="h-4 w-4" />}
                        ctaText="Back"
                        onCtaClick={() => router.back()} 
                    />
                </div>
                <div className="h-[92%] bg-black/90">
                    <Chat roomId={roomId} />
                </div>
            </>
    )
}