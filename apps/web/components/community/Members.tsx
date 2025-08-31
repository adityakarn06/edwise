import { getCommunityMembers } from "@/utils/getCommunityMembers";
import { PanelRightClose, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function CommunityMembers({
  showMembers,
  roomId,
  setShowMembers
}: {
  showMembers: boolean;
  roomId: string;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (showMembers) {
      getCommunityMembers(roomId).then(setMembers);
    }
  }, [showMembers, roomId]);

  if (!showMembers) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col text-white p-4 overflow-y-auto hide-scrollbar relative">
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowMembers(false)}>
            <PanelRightClose className="h-6 w-6 text-white/90" />
        </div>
      <h2 className="mb-4 text-md font-medium text-white/50">ONLINE</h2>
      {members &&
        members.length > 0 &&
        members.map(
          (member) =>
            member.status === "ONLINE" && (
              <div key={member.id} className="mb-4 flex items-center space-x-4">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name || member.email}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 p-2 items-center justify-center rounded-full border text-md">
                    <User className="text-gray-100" />
                  </div>
                )}
                <div className="">
                  <p>{member.name || "Unnamed User"}</p>
                </div>
              </div>
            )
        )}

      <h2 className="mb-4 text-md font-medium text-white/50">OFFLINE</h2>
      {members &&
        members.length > 0 &&
        members.map(
          (member) =>
            member.status === "OFFLINE" && (
              <div key={member.id} className="mb-4 flex items-center space-x-4">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name || member.email}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="flex h-8 w-8 p-2 items-center justify-center rounded-full border text-md">
                    <User className="text-gray-100" />
                  </div>
                )}
                <div className="">
                  <p>{member.name || "Unnamed User"}</p>
                </div>
              </div>
            )
        )}
    </div>
  );
}
