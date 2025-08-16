"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Users, Globe, Plus, ArrowLeft, BookOpen, Video, FileText, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface RoomFormData {
  name: string;
  description: string;
  privacy: "public" | "private";
  roomType: "study" | "discussion" | "project" | "exam-prep";
  maxMembers: number;
}

export default function CreateRoomPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RoomFormData>({
    name: "",
    description: "",
    privacy: "public",
    roomType: "study",
    maxMembers: 10,
  });

  const roomTypes = [
    {
      id: "study",
      name: "Study Group",
      description: "Collaborative learning and note sharing",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "discussion",
      name: "Discussion Forum",
      description: "Topic-based discussions and Q&A",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "project",
      name: "Project Team",
      description: "Work together on assignments and projects",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "exam-prep",
      name: "Exam Preparation",
      description: "Practice tests and exam strategies",
      icon: <Video className="h-5 w-5" />,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrivacyChange = (privacy: "public" | "private") => {
    setFormData(prev => ({
      ...prev,
      privacy,
    }));
  };

  const handleRoomTypeChange = (roomType: string) => {
    setFormData(prev => ({
      ...prev,
      roomType: roomType as RoomFormData["roomType"],
    }));
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

    setIsLoading(true);

    try {
      const response = await api.post("/community/create-room", {
        slug: formData.name.trim(),
        // description: formData.description.trim(),
      });

      toast.success("Room created successfully!");
      router.push(`/room/${response.data.roomId}`);
    } catch (error: any) {
      console.error("Error creating room:", error);
      toast.error(error.response?.data?.message || "Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[8%]">
          <Navbar 
            headingIcon={<Plus className="h-4 w-4 text-white" />}
            headingText="Create Room"
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
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Room Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter room name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-colors"
                  maxLength={50}
                />
                <p className="text-xs text-white/40 mt-1">
                  {formData.name.length}/50 characters
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this room is for"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-colors resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-white/40 mt-1">
                  {formData.description.length}/200 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Room Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roomTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleRoomTypeChange(type.id)}
                      className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        formData.roomType === type.id
                          ? "border-blue-400 bg-blue-400/10 text-blue-400"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {type.icon}
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <p className="text-xs opacity-70">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Privacy *
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handlePrivacyChange("public")}
                    className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${
                      formData.privacy === "public"
                        ? "border-green-400 bg-green-400/10 text-green-400"
                        : "border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="h-5 w-5" />
                      <span className="font-medium">Public</span>
                    </div>
                    <p className="text-xs opacity-70">
                      Anyone can find and join this room
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrivacyChange("private")}
                    className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${
                      formData.privacy === "private"
                        ? "border-orange-400 bg-orange-400/10 text-orange-400"
                        : "border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Lock className="h-5 w-5" />
                      <span className="font-medium">Private</span>
                    </div>
                    <p className="text-xs opacity-70">
                      Only invited members can join this room
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="maxMembers" className="block text-sm font-medium text-white/80 mb-2">
                  Maximum Members
                </label>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-white/60" />
                  <input
                    type="number"
                    id="maxMembers"
                    name="maxMembers"
                    value={formData.maxMembers}
                    onChange={handleInputChange}
                    min="2"
                    max="50"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-colors"
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">
                  Between 2 and 50 members
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-3 px-4 border border-white/20 text-white/80 rounded-lg hover:bg-white/5 hover:border-white/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isLoading ? "Creating..." : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}