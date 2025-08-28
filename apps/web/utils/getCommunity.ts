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

export const getUserCommunities = async ( setUserCommunities: React.Dispatch<React.SetStateAction<UserCommunity[]>> ) => {
    try {
        const response = await api.get("/community/user-rooms");
        if (response.status === 200) {
            const userCommunities = response.data;
            console.log("Fetched user communities:", userCommunities);
            setUserCommunities(userCommunities);
        }
    } catch (error) {
        console.error("Error fetching user communities:", error);
    }
}

export const getAllCommunities = async ( setAllCommunities: React.Dispatch<React.SetStateAction<Community[]>> ) => {
      try {
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
      }
};

export const getCommunitiesExceptUser = async ( setCommunities: React.Dispatch<React.SetStateAction<Community[]>> ) => {
    try {
      const response = await api.get("/community/rooms-except-user");
      if (response.status === 200) {
        const communities = response.data;
        setCommunities(communities);
      } else {
        setCommunities([]);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      setCommunities([]);
    }
}