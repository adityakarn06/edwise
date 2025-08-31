"use client";
import { ArrowLeft, MessageCircleMore, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Chat from "@/components/community/Chat";
import ChatSidebar from "@/components/community/ChatSidebar";
import { useState } from "react";
import CommunityMembers from "@/components/community/Members";
import {
  getCommunitiesExceptUser,
  getUserCommunities,
} from "@/utils/getCommunity";
import { useRouter } from "next/navigation";

interface Community {
  id: string;
  slug: string;
  description: string;
  thumbnail?: string;
  adminId?: string;
  memberCount?: number;
}

interface UserCommunity {
  id: string;
  slug: string;
  description: string;
  thumbnail?: string;
  adminId?: string;
  memberCount?: number;
  messages?: {
    id: string;
    message: string;
    roomId: string;
    userId: string;
    timestamp: string;
  }[];
}

export default function MobileCommunityHome() {
  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const [roomIdState, setRoomId] = useState("");
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  const refreshCommunities = () => {
    getUserCommunities(setUserCommunities);
    getCommunitiesExceptUser(setCommunities);
  };

  return (
    <div className="flex md:hidden flex-col h-screen w-full">
      {roomIdState && roomSlug ? (
        <div className="h-full w-full flex flex-col">
          <div className="h-[8%]">
            <Navbar
              headingText={roomSlug}
              headingIcon={<MessageCircleMore />}
              giveOptions={true}
              optionType="community"
              memberCount={
                userCommunities.find((comm) => comm.slug === roomSlug)
                  ?.memberCount || 0
              }
              ctaLeftButton={true}
              ctaLeftIcon={
                <Users className="h-5 w-5 text-white/90 cursor-pointer" />
              }
              ctaLeftButtonClick={() => setShowMembers(!showMembers)}
              ctaIcon={<ArrowLeft className="h-4 w-4" />}
              onCtaClick={() => {setRoomId(""); setRoomSlug("")}}
              ctaText={"Back"}
            />
          </div>
          <div className="h-[92%] bg-black/85">
            {showMembers ? (
              <div className="flex h-full w-full flex-row relative">
                <div className="h-full w-full">
                  <Chat roomId={roomIdState} />
                </div>
                <div className="h-full absolute right-0 top-0 z-50 w-[70%] bg-green-800 border-l border-gray-700">
                  <CommunityMembers
                    showMembers={showMembers}
                    setShowMembers={setShowMembers}
                    roomId={roomIdState}
                  />
                </div>
              </div>
            ) : (
              <Chat roomId={roomIdState} />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <ChatSidebar
            setShowMemberModal={setShowMembers}
            userCommunities={userCommunities}
            communities={communities}
            refreshCommunities={refreshCommunities}
            isMobile={true}
            setRoomId={setRoomId}
            setRoomSlug={setRoomSlug}
          />
        </div>
      )}
    </div>
  );
}
