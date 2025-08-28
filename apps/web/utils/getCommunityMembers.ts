import api from "@/lib/api";

interface Member {
    id: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
}

export const getCommunityMembers = async ( roomId: string) => {
    try {
        const response = await api.get(`/community/members/${roomId}`);
        if (response.status === 200) {
            const members = response.data;
            return members as Member[];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching community members:", error);
        return [];
    }
};