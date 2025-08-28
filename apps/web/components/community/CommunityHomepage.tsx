"use client";
import Image from "next/image";
import SearchBar from "../SearchBar";
import { ArrowUpRight, MessageSquareShare, Plus, Users } from "lucide-react";
import { use, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getAllCommunities, getUserCommunities } from "@/utils/getCommunity";

interface Community {
  id: string;
  slug: string;
  description: string;
  thumbnail?: string;
  privacy?: string;
  adminId?: string;
}

interface UserCommunity {
  id: string;
  slug: string;
  description: string;
  thumbnail?: string;
  privacy?: string;
  adminId?: string;
  messages?: {
      id: string;
      message: string;
      roomId: string;
      userId: string;
      timestamp: string;
  }[];
}

export default function CommunityHomepage() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
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
    setIsLoading(true);
    getAllCommunities(setAllCommunities);
    getUserCommunities(setUserCommunities);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    {userCommunities && userCommunities.length > 0 && userCommunities[0] &&
      router.push(`/community/chat/${userCommunities[0].slug}/${userCommunities[0].id}`)
    }
  }, [userCommunities]);

  return (
    <div className="bg-black/10 h-full p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl sm:text-3xl font-semibold">
            Explore Communities
          </h1>
          <div className="flex-shrink-0">
                    <button
                      onClick={() => router.push("/community/create-room")}
                      className="flex justify-center items-center hover:bg-white/90 text-white/90 hover:text-black/90 px-6 py-2 rounded-lg border border-white/20 transition-all cursor-pointer">
                      Create Group
                    </button>
                  </div>
        </div>
        <div className="max-w-lg">
          <SearchBar placeholder="search for study groups..." />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-400">Loading communities...</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[70vh] pb-8 overflow-y-auto scrollbar-hide">
          {allCommunities.length > 0 ? (
            <>
              {allCommunities.map((community) => (
                <div key={community.id} className="bg-white/6 rounded-xl p-4 transition-colors border border-white/10 hover:border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={community.thumbnail || '/communityDefaultThumbnail.png'}
                        alt={community.slug}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-white text-lg font-medium mb-1">
                        {community.slug}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {community.description.length > 80 
                          ? `${community.description.slice(0, 80)}...` 
                          : community.description
                        }
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{Math.floor(Math.random() * 5000) + 1000} members</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button 
                        onClick={() => handleJoinCommunityClick(community.slug, community.id)}
                        className="flex items-center justify-center bg-white/90 hover:bg-white text-black/90 hover:text-black px-6 py-2 rounded-lg transition-colors cursor-pointer hover:scale-105">
                        Join Group
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
            </>
          ) : (
            <>
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <h3 className="text-white text-lg font-semibold mb-2">
                  No Communities Found
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Be the first to create a learning community!
                </p>
              </div>
              
              {/* Create Your Own Card */}
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 border-dashed hover:bg-gray-750 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-white text-lg font-semibold mb-1">
                      Create Your Own Group
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      Start your own learning community and connect with like-minded students.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => router.push("/community/create-room")}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                      Create Group
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
