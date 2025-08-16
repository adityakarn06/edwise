"use client";

import { useState, useEffect } from "react";
import useSocket from "@/hooks/useSocket";
import { Send, LogIn } from "lucide-react";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export default function Chat({ roomId }: { roomId: string }) {
  const socketRef = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (roomId && socketRef.current) {
      socketRef.current.emit("join_room", roomId);
    }
  }, [roomId, socketRef]);

  // for new messages
  useEffect(() => {
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

  const sendMessage = () => {
    if (message.trim() && roomId) {
      socketRef.current?.emit("send_message", { roomId: roomId, message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/30 text-gray-100">

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === socketRef.current?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-md text-sm ${
                msg.sender === socketRef.current?.id
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-200 rounded-bl-none"
              }`}
            >
              <p>{msg.message}</p>
              <span className="block text-xs text-gray-400 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 flex items-center gap-2">
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
