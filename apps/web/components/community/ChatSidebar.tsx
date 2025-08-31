import { Plus } from "lucide-react";
import ChatSearchBar from "./ChatSearchbar";
import { useEffect, useState } from "react";
import { getCommunitiesExceptUser, getUserCommunities } from "@/utils/getCommunity";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Community {
    id: string;
    slug: string;
    description: string;
    thumbnail?: string;
    adminId?: string;
}

interface UserCommunity {
    id: string;
    slug: string;
    description: string;
    thumbnail?: string;
    adminId?: string;
    messages?: {
        id: string;
        message: string;
        roomId: string;
        userId: string;
        timestamp: string;
    }[];
}

const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
        return `${diffInSeconds} secs`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} mins`;
    } else {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hrs`;
    }
};

export default function ChatSidebar() {
    const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const router = useRouter();

    const filteredCommunities = communities.filter((community) => {
        if (!searchValue.trim()) return true;
        const searchTerm = searchValue.toLowerCase();
        return (
            community.slug.toLowerCase().includes(searchTerm) ||
            community.description.toLowerCase().includes(searchTerm)
        );
    });

    const filteredUserCommunities = userCommunities.filter((community) => {
        if (!searchValue.trim()) return true;
        const searchTerm = searchValue.toLowerCase();
        return (
            community.slug.toLowerCase().includes(searchTerm) ||
            community.description.toLowerCase().includes(searchTerm)
        );
    });

    const handleJoinCommunityClick = async( slug: string, roomId: string ) => {
        try {
            if (!roomId) {
                throw new Error("room id is required");
            }
            const joined = await api.post("/community/join-room", { roomId });
            if (joined.status !== 200) {
                toast.error("Failed to join community");
            }
            toast.success("Joined community successfully!");
            router.push(`/community/chat/${slug}/${roomId}`);
        } catch (error) {
            console.error("Error joining community:", error);
            toast.error("Failed to join community");
        }
    };

    useEffect(() => {
        getUserCommunities(setUserCommunities);
        getCommunitiesExceptUser(setCommunities);
    }, []);

    return (
        <div className="w-full h-full border-r border-white/10 bg-black/93 text-white/95 flex flex-col p-4">
            <nav className="flex justify-between items-center">
                <h1 className="font-medium text-xl">Communities</h1>
                <Link href="/community/create-room" prefetch={false}>
                    <div className="flex items-center gap-1 cursor-pointer hover:bg-white/5">
                        <Plus className="h-4 w-4 text-white/70" />
                        <p className="text-sm text-white/70">Create New</p>
                    </div>
                </Link>
            </nav>
            <section className="mt-4 flex flex-col gap-4">
                <div className="p-1">
                   <ChatSearchBar 
                       searchValue={searchValue}
                       onSearchChange={setSearchValue}
                       placeholder="Search groups..."
                   /> 
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm text-white/60">
                        Explore
                        {searchValue.trim() && filteredCommunities.length > 0 && (
                            <span className="ml-2 text-xs">({filteredCommunities.length})</span>
                        )}
                    </h3>
                    <div className="flex flex-row gap-3 h-full overflow-x-scroll hide-scrollbar">
                        {filteredCommunities && filteredCommunities.length > 0 ? filteredCommunities.map((item) => (
                                <div key={item.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                                    <Image
                                        src={item.thumbnail || '/communityDefaultThumbnail.png'}
                                        alt={item.slug}
                                        width={50}
                                        height={50}
                                        onClick={() => handleJoinCommunityClick(item.slug, item.id)}
                                        className="h-12 w-12 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                                    />
                                    <span className="text-xs text-white/60 text-center max-w-[60px] truncate">
                                        {item.slug}
                                    </span>
                                </div>
                        )) : searchValue.trim() ? (
                            <p className="text-white/40 text-xs">No communities found matching "{searchValue}"</p>
                        ) : (
                            <p className="text-white/40 text-xs">No communities to explore</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm text-white/60">
                        Your Communities
                        {searchValue.trim() && filteredUserCommunities.length > 0 && (
                            <span className="ml-2 text-xs">({filteredUserCommunities.length})</span>
                        )}
                    </h3>
                    <div className="flex flex-col gap-2 overflow-y-auto hide-scrollbar">
                        {filteredUserCommunities && filteredUserCommunities.length > 0 ? filteredUserCommunities.map((item) => (
                            <Link href={`/community/chat/${item.slug}/${item.id}`} key={item.id} prefetch={false}>
                                <div 
                                    key={item.id}
                                    className="flex gap-2 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
                                >
                                    <Image
                                        key={item.id}
                                        src={item.thumbnail || '/communityDefaultThumbnail.png'}
                                        alt={item.slug}
                                        width={50}
                                        height={50}
                                        className="h-12 w-12 rounded-full object-cover hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm">{item.slug}</p>
                                            {item?.messages && item.messages.length > 0 && item.messages[0]?.timestamp && (
                                                <p className="text-xs text-white/50">{formatTime(item.messages[0].timestamp)} ago</p>
                                            )}
                                        </div>
                                         
                                        {item?.messages && item.messages.length > 0  && (
                                            item.messages[0]?.message && item.messages[0]?.message.length > 30 ? (
                                                <p className="text-xs text-white/50 overflow-hidden max-w-[90%] whitespace-nowrap text-ellipsis">{item.messages[0]?.message.slice(0, 30)}...</p>
                                            ) : (
                                                <p className="text-xs text-white/50 overflow-hidden max-w-[90%] whitespace-nowrap text-ellipsis">{item.messages[0]?.message}</p>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )) : searchValue.trim() ? (
                            <p className="text-white/40 text-xs">No communities found matching "{searchValue}"</p>
                        ) : (
                            <p className="text-white/40 text-xs">Join some communities to see them here</p>
                        )}
                    </div>
                </div>

                {searchValue.trim() && filteredCommunities.length === 0 && filteredUserCommunities.length === 0 && (
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setSearchValue("")}
                            className="text-white/60 hover:text-white text-xs underline cursor-pointer"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}