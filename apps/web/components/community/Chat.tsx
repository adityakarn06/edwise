"use client";

import { useState, useEffect } from "react";
import useSocket from "@/hooks/useSocket";
import { Send, User } from "lucide-react";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

export default function Chat({ roomId }: { roomId: string }) {
  const { data: session } = useSession();
  const socketRef = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchRoomHistory = async () => {
    if (!roomId) {
      console.error("Room ID is required to fetch history.");
      return;
    }
    try {
      const { data } = await api.get(`/community/history/${roomId}`);
      if (!data || data.length === 0) {
        setMessages([]);
        return;
      }
      setMessages(data);
    } catch (error) {
      console.error("Error fetching room history:", error);
    }
  };

  useEffect(() => {
    if (roomId && socketRef.current) {
      socketRef.current.emit("join_room", roomId);
    }
  }, [roomId, socketRef]);

  useEffect(() => {
    fetchRoomHistory();

    // for new messages
    if (!socketRef.current) return;

    socketRef.current.on("receive_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socketRef.current.on("error_message", (msg) => {
      alert(msg);
    });

    return () => {
      socketRef.current?.off("receive_message");
      socketRef.current?.off("error_message");
    };
  }, [socketRef]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth", 
      })
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && roomId) {
      socketRef.current?.emit("send_message", { roomId: roomId, message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/30 text-gray-100 relative" id="chat-container">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/chatBackground.png')" }}
      ></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              (msg.sender === session?.user?.id) || (msg?.user?.id === session?.user?.id)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-2">
              {(msg.sender !== session?.user?.id) && (msg?.user?.id !== session?.user?.id) ? (
                msg?.user?.avatarUrl ? (
                  <Image
                    src={msg?.user?.avatarUrl}
                    alt="User Avatar"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 p-1 text-gray-100 bg-gray-800 rounded-full" />
                  </div>
                )
              ) : null}

              <div
                className={`max-w-xs px-4 py-2 rounded-xl shadow-md text-sm ${
                  (msg.sender === session?.user?.id) || (msg?.user?.id === session?.user?.id)
                    ? "bg-white/20 text-white rounded-br-none mr-2"
                    : "bg-white/10 text-gray-200 rounded-tl-none"
                }`}
              >
                {(msg.sender === session?.user?.id) || (msg?.user?.id === session?.user?.id) ? (
                  <p className="text-xs text-gray-400 mb-1">You</p>
                ) : (
                  <p className="text-xs text-gray-400 mb-1">{msg?.user?.name || msg?.user?.email}</p>
                )}
                <p className="text-md">{msg.message}</p>
                <span className="block text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 flex items-center gap-2 relative z-10">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white/80 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white/80"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 rounded-full bg-white/90 hover:bg-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <Send size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
}
