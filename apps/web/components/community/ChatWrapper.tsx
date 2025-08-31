"use client";
import {
  MessageCircleMore,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "../Navbar";
import Chat from "./Chat";
import ChatSidebar from "./ChatSidebar";
import { useState } from "react";
import CommunityMembers from "./Members";
import {
  getCommunitiesExceptUser,
  getUserCommunities,
} from "@/utils/getCommunity";
import toast from "react-hot-toast";

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

export default function CommunityWrapper({
  slug,
  roomId,
}: {
  slug: string;
  roomId: string;
}) {
  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const roomName = decodeURI(slug);

  const refreshCommunities = () => {
    getUserCommunities(setUserCommunities);
    getCommunitiesExceptUser(setCommunities);
  };

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="hidden md:block h-full w-[25%]">
        <ChatSidebar setShowMemberModal={setShowMembers} userCommunities={userCommunities} communities={communities} refreshCommunities={refreshCommunities} />
      </div>
      <div className="h-full w-full md:w-[75%] flex flex-col">
        <div className="h-[8%]">
          <Navbar
            headingText={roomName}
            headingIcon={<MessageCircleMore />}
            giveOptions={true}
            optionType="community"
            memberCount={userCommunities.find((comm) => comm.slug === roomName)?.memberCount || 0}
            ctaLeftButton={true}
            ctaLeftIcon={<Users className="h-5 w-5 text-white/90 cursor-pointer" />}
            ctaLeftButtonClick={() => setShowMembers(!showMembers)}
            ctaIcon={<Zap className="h-4 w-4" />}
            onCtaClick={() => toast.success("This button has no functionality yet!")}
            ctaText={"Upgrade"}
          />
        </div>
        <div className="h-[92%] bg-black/85">
          {showMembers ? (
            <div className="flex h-full w-full flex-row">
              <div className="h-full w-[70%]">
                <Chat roomId={roomId} />
              </div>
              <div className="h-full w-[30%] border-l border-gray-700">
                <CommunityMembers showMembers={showMembers} setShowMembers={setShowMembers} roomId={roomId} />
              </div>
            </div>
          ) : (
            <Chat roomId={roomId} />
          )}
        </div>
      </div>
    </div>
  );
}
