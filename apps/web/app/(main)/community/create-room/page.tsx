"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  ArrowLeft,
  Upload,
  X,
  Image,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RoomFormData {
  name: string;
  description: string;
  thumbnail?: File | null;
}

interface CreateRoomResponse {
  roomId: string;
  slug: string;
  description: string;
  thumbnail?: string;
}

export default function CreateRoomPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<RoomFormData>({
    name: "",
    description: "",
    thumbnail: null,
  });

  const createRoomMutation = useMutation({
    mutationFn: async (data: RoomFormData): Promise<CreateRoomResponse> => {
      const formDataToSend = new FormData();
      formDataToSend.append("slug", data.name.trim());
      formDataToSend.append("description", data.description.trim());
      
      if (data.thumbnail) {
        formDataToSend.append("thumbnail", data.thumbnail);
      }

      const response = await api.post("/community/create-room", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["user-rooms"] });
      
      joinRoomMutation.mutate(data.roomId);
    },
    onError: (error: any) => {
      console.error("Error creating room:", error);
      const errorMessage = error.response?.data?.error || "Failed to create room";
      toast.error(errorMessage);
    },
  });

  const joinRoomMutation = useMutation({
    mutationFn: async (roomId: string) => {
      const response = await api.post("/community/join-room", { roomId });
      return response.data;
    },
    onSuccess: (_, roomId) => {
      router.push(`/community/chat/${formData.name.trim()}/${roomId}`);
    },
    onError: (error: any) => {
      console.error("Error joining room:", error);
      toast.error("Failed to join the room, but room was created successfully");
      router.push("/community");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, thumbnail: file }));
      
      // preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Room name is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Room description is required");
      return;
    }

    createRoomMutation.mutate(formData);
  };

  const isLoading = createRoomMutation.isPending || joinRoomMutation.isPending;

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          headingIcon={<Plus className="h-4 w-4 text-white" />}
          headingText="Create Room"
          giveOptions={false}
          ctaIcon={<ArrowLeft className="h-4 w-4" />}
          ctaText="Back"
          onCtaClick={() => router.back()}
        />
      </div>

      <div className="h-[92%] bg-black/90 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-white/90 mb-2">
              Create a New Room
            </h1>
            <p className="text-white/60">
              Set up a collaborative space for learning and discussion
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Room Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter room name"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-border-white focus:bg-white/10 transition-colors"
                maxLength={50}
                required
              />
              <p className="text-xs text-white/40 mt-1">
                {formData.name.length}/50 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this room is for"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:bg-white/10 transition-colors resize-none"
                maxLength={200}
                required
              />
              <p className="text-xs text-white/40 mt-1">
                {formData.description.length}/200 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Room Thumbnail
              </label>
              <div className="space-y-3">
                {thumbnailPreview ? (
                  <div className="relative">
                    <div className="w-full h-48 bg-white/5 border border-white/20 rounded-lg overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <div className="w-full h-48 bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center hover:border-white/30 hover:bg-white/10 transition-colors">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/10 rounded-full">
                          <Image className="h-6 w-6 text-white/60" />
                        </div>
                        <div className="text-center">
                          <p className="text-white/80 font-medium">Upload Thumbnail</p>
                          <p className="text-xs text-white/40">PNG, JPG up to 2MB</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/90 text-black text-sm rounded-md">
                          <Upload className="h-3 w-3" />
                          Choose File
                        </div>
                      </div>
                    </div>
                  </label>
                )}
                <p className="text-xs text-white/40">
                  Add a visual representation for your room to make it more appealing
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 px-4 border border-white/20 text-white/80 rounded-lg hover:bg-white/5 hover:border-white/30 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.name.trim() ||
                  !formData.description.trim()
                }
                className="flex-1 py-3 px-4 bg-white/90 text-black/90 hover:text-black rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
              >
                {isLoading ? "Creating..." : "Create Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
