"use client";
import { ArrowLeft, MessageCircleMore, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "../Navbar";
import Chat from "./Chat";
import { useRouter } from "next/navigation";
import ChatSidebar from "./ChatSidebar";


export default function CommunityWrapper({ slug, roomId }: { slug: string, roomId: string }) {
    const router = useRouter();
    return (
        <div className="h-screen w-full flex flex-row">
                <div className="h-full w-[40%]">
                  <ChatSidebar />  
                </div>
                <div className="h-full w-[60%] flex flex-col">
                    <div className="h-[8%]">
                        <Navbar 
                            headingText={decodeURI(slug)} 
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
                </div>
                
        </div>
    )
}