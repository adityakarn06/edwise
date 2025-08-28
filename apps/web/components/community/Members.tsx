import { getCommunityMembers } from "@/utils/getCommunityMembers"
import { User } from "lucide-react";
import { useEffect, useState } from "react"

export default function CommunityMembers( { showMembers, roomId }: { showMembers: boolean, roomId: string } ) {
    const [members, setMembers] = useState<any[]>([]);
    
    useEffect(() => {
        if (showMembers) {
            getCommunityMembers(roomId)
            .then(setMembers);
        }
    }, [showMembers, roomId]);
    
    if (!showMembers) {
        return null;
    }
    
    return (
        <div className="flex h-full w-full flex-col text-white p-4 overflow-y-auto hide-scrollbar">
            <h2 className="mb-4 text-md font-medium text-white/50">MEMBERS</h2>
            {members && members.length > 0 ? (
                members.map((member) => (
                    <div key={member.id} className="mb-4 flex items-center space-x-4">
                        {member.avatarUrl ? (
                            <img src={member.avatarUrl} alt={member.name || member.email} className="h-8 w-8 rounded-full" />
                        ) : (
                            <div className="flex h-8 w-8 p-2 items-center justify-center rounded-full border text-md">
                                <User className="text-gray-100" />
                            </div>
                        )}
                        <div className="">
                            <p>
                                {member.name || "Unnamed User"}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No members found</div>
            )}
        </div>
    )
}