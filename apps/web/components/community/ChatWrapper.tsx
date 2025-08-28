"use client";
import { MessageCircleMore, Option, SquareArrowOutUpRight, Users } from "lucide-react";
import Navbar from "../Navbar";
import Chat from "./Chat";
import { useRouter } from "next/navigation";
import ChatSidebar from "./ChatSidebar";
import { useState } from "react";
import CommunityMembers from "./Members";


export default function CommunityWrapper({ slug, roomId }: { slug: string, roomId: string }) {
    const [showMembers, setShowMembers] = useState(false);
    const router = useRouter();
    return (
        <div className="h-screen w-full flex flex-row">
                <div className="h-full w-[25%]">
                  <ChatSidebar />  
                </div>
                <div className="h-full w-[75%] flex flex-col">
                    <div className="h-[8%]">
                        <Navbar 
                            headingText={decodeURI(slug)} 
                            headingIcon={<MessageCircleMore />} 
                            giveOptions={false}
                            ctaIcon={<Users className="h-4 w-4" />}
                            onCtaClick={() => setShowMembers(!showMembers)}
                            ctaText={showMembers ? "Hide Members" : "Members"} 
                        />
                    </div>
                    <div className="h-[92%] bg-black/85">
                        {showMembers ? (
                            <div className="flex h-full w-full flex-row">
                                <div className="h-full w-[70%]">
                                    <Chat roomId={roomId} />
                                </div>
                                <div className="h-full w-[30%] border-l border-gray-700">
                                    <CommunityMembers showMembers={showMembers} roomId={roomId} />     
                                </div>
                            </div>
                        ) : (
                            <Chat roomId={roomId} />
                        )}
                    </div> 
                </div>
                
        </div>
    )
}