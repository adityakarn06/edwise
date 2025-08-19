"use client";
import Image from "next/image";
import SearchBar from "../SearchBar";
import { ArrowUpRight, MessageSquareShare, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Community {
  id: string;
  slug: string;
  description?: string;
}

export default function CommunityHomepage() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
    const getCommunities = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/community/rooms");
        if (response.status === 200) {
          const communities = response.data;
          setAllCommunities(communities);
        } else {
          setAllCommunities([]);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        setAllCommunities([]);
      } finally {
        setIsLoading(false);
      }
    };

    const getUserCommunities = async () => {
        try {
            const response = await api.get("/community/user-rooms");
            if (response.status === 200) {
                const userCommunities = response.data;
                setUserCommunities(userCommunities);
            }
        } catch (error) {
            console.error("Error fetching user communities:", error);
        }
    }

    getCommunities();
    getUserCommunities();
  }, []);

  return (
    <div>
      <div className="m-4 sm:m-6 md:m-8">
        <h1 className="text-white/90 text-2xl sm:text-3xl md:text-4xl font-semibold w-full max-w-2xl px-4">
          Explore Communities
        </h1>
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 w-full max-w-2xl px-4">
          <SearchBar placeholder="search for study groups..." />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-white/70">Loading communities...</p>
        </div>
      ) : (
        <div className="flex gap-3 sm:gap-4 md:gap-6 w-full px-4 mx-4 sm:mx-6 md:mx-8 mt-8 sm:mt-12 md:mt-16">
          {allCommunities.length > 0 ? (
            <>
                {userCommunities.length > 0 && (
                    <div className="flex flex-col items-center gap-2 h-60 sm:h-64 md:h-72 w-40 sm:w-48 md:w-52 p-3 sm:p-4 text-black/90 bg-white/90 rounded-lg overflow-hidden">
                        <h2 className="text-base sm:text-lg">Your Communities</h2>
                        {userCommunities.map((community) => (
                            <button 
                                key={community.id}
                                onClick={() => router.push(`/community/chat/${community.slug}/${community.id}`)}
                                className="bg-black/90 text-xs sm:text-sm min-h-9 sm:min-h-10 w-full flex justify-center text-white/90 px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-md hover:bg-black transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <span className="mr-1">
                                        <MessageSquareShare className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </span>
                                    <span>Open {community.slug}</span>
                                </div>
                            </button>
                            
                        ))}
                    </div>
                )}
                {allCommunities.map((community) => (
                <div key={community.id} className="flex flex-col items-center gap-2 h-60 sm:h-64 md:h-72 w-40 sm:w-48 md:w-52 p-3 sm:p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-base sm:text-lg">{community.slug}</h2>
                    <button 
                        onClick={() => handleJoinCommunityClick(community.slug, community.id)}
                        className="bg-white/90 text-xs sm:text-sm text-black/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1">
                            <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                        </div>
                    </button>
                    <Image
                    src="/bookImage1.png"
                    alt={community.slug}
                    width={140}
                    height={190}
                    className="object-cover rounded-xl mt-12 sm:mt-14 md:mt-16 ml-22 blur-xs"
                    />
                </div>
                ))}
            
                <div className="flex flex-col items-center gap-2 h-60 sm:h-64 md:h-72 w-40 sm:w-48 md:w-52 p-3 sm:p-4 text-white/90 border border-white/60 rounded-lg overflow-hidden">
                    <h2 className="text-base sm:text-lg">Create Your Own</h2>
                    <button
                        onClick={() => router.push("/community/create-room")}
                        className="bg-white/90 text-xs sm:text-sm text-black/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Create now</span>
                            <span className="ml-1">
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                        </div>
                    </button>
                    <Image
                    src="/bookImage1.png"
                    alt=""
                    width={140}
                    height={190}
                    className="object-cover rounded-xl mt-12 sm:mt-14 md:mt-16 ml-22 blur-xs"
                    />
                </div>
            </>
          ) : (
            <>
                <div className="flex items-center justify-center h-60 sm:h-64 md:h-72 w-40 sm:w-48 md:w-52 p-3 sm:p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-base sm:text-lg">No community found</h2>
                </div>
              <div className="flex flex-col items-center gap-2 h-60 sm:h-64 md:h-72 w-40 sm:w-48 md:w-52 p-3 sm:p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                <h2 className="text-base sm:text-lg">Create Your Own</h2>
                <button
                    onClick={() => router.push("/community/create-room")}
                    className="bg-white/90 text-xs sm:text-sm text-black/90 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-white transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <span>Create now</span>
                        <span className="ml-1">
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                    </div>
                </button>
                <Image
                  src="/bookImage1.png"
                  alt=""
                  width={140}
                  height={190}
                  className="object-cover rounded-xl mt-12 sm:mt-14 md:mt-16 ml-22 blur-xs"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
