import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface ContextMenuState {
  isVisible: boolean;
  x: number;
  y: number;
  communityId: string;
  communitySlug: string;
}

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onLeaveCommunity: () => void;
  onViewMembers: () => void;
}

export default function ContextMenu({ 
  position, 
  onClose, 
  onLeaveCommunity, 
  onViewMembers 
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Small delay to prevent immediate closing
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-50 w-[160px] py-1"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translateX(-50%)' // Center horizontally on cursor
      }}
    >
      <button
        onClick={onLeaveCommunity}
        className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left transition-colors"
      >
        Leave Community
      </button>
      <button
        onClick={onViewMembers}
        className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
      >
        View Members
      </button>
    </div>
  );
}

interface UseCommunityContextMenuProps {
  onRefreshCommunities: () => void;
  setShowMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useCommunityContextMenu({ onRefreshCommunities, setShowMemberModal }: UseCommunityContextMenuProps) {

  const handleLeaveCommunity = async (communityId: string) => {
    try {
      const response = await api.post('/community/leave-room', { 
        roomId: communityId 
      });
      
      if (response.status === 200) {
        toast.success('Left community successfully!');
        onRefreshCommunities();
      } else {
        toast.error('Failed to leave community');
      }
    } catch (error) {
      console.error('Error leaving community:', error);
      toast.error('Failed to leave community');
    }
  };

  const handleViewMembers = (communitySlug: string) => {
    setShowMemberModal(true);
  };

  return {
    handleLeaveCommunity,
    handleViewMembers
  };
}

export type { ContextMenuState };