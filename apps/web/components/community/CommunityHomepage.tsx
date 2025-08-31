"use client";
import Image from "next/image";
import SearchBar from "../SearchBar";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getAllCommunities, getUserCommunities } from "@/utils/getCommunity";

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

export default function CommunityHomepage() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCommunities = allCommunities.filter((community) => {
    if (!searchValue.trim()) return true;
    return community.slug.toLowerCase().includes(searchValue.toLowerCase()) ||
           community.description.toLowerCase().includes(searchValue.toLowerCase());
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
        !isMobile ? (
          router.push(`/community/chat/${slug}/${roomId}`)
        ) : (
          router.push(`/community/home`)
        );
        
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
    !isMobile && userCommunities && userCommunities.length > 0 && userCommunities[0] ? (
      router.push(`/community/chat/${userCommunities[0].slug}/${userCommunities[0].id}`)
    ) : (
      router.push(`/community/home`)
    );
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
          <SearchBar 
            placeholder="search for study groups..." 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-400">Loading communities...</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[70vh] pb-8 overflow-y-auto scrollbar-hide">
          {filteredCommunities.length > 0 ? (
            <>
              {searchValue.trim() && (
                <div className="text-gray-400 text-sm mb-4">
                  Found {filteredCommunities.length} communities matching "{searchValue}"
                </div>
              )}
              {filteredCommunities.map((community) => (
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
                        <span>{community.memberCount} members</span>
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
          ) : searchValue.trim() ? (
            <div className="bg-white/5 rounded-xl p-8 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">
                No Communities Found
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                No communities match your search for "{searchValue}". Try different keywords or create your own!
              </p>
              <button
                onClick={() => setSearchValue("")}
                className="text-white font-semibold hover:font-bold text-sm underline cursor-pointer">
                Clear search
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white/5 rounded-xl p-8 text-center">
                <h3 className="text-white text-lg font-semibold mb-2">
                  No Communities Found
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Be the first to create a learning community!
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
