"use client";
import * as React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import api from "@/lib/api";
import { useSession } from "next-auth/react";

interface IMessages {
  role: "assistant" | "user";
  content?: string;
  refference?: string[];
  sources?: any[];
}

const ChatComponent: React.FC = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<IMessages[]>([]);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    try {
      const { data } = await api.get(`/chat?message=${encodeURIComponent(message)}`);

      const references = data?.sources
        ? data.sources.map((source: any) => {
            // Extract just the filename from the full path
            const fullPath = source.metadata.source;
            const fileName = fullPath.split("/").pop();
            return fileName;
          })
        : [];

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          refference: references,
          sources: data.sources,
        },
      ]);

      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-black/90">
      {messages.length === 0 ? (
      <div className="flex flex-col gap-2 items-center justify-center h-full text-gray-500">
        <p className="text-3xl">Welcome, {session?.user?.name || session?.user?.email}! 👋</p>
        <p className="text-lg">How can I help you today?</p>
      </div>
      ) : (
      <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
        key={index}
        className={`mb-4 ${
          msg?.role === "user" ? "text-right" : "text-left"
        }`}
        >
        <div
          className={`inline-block px-4 py-2 rounded-lg ${
          msg.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
          }`}
        >
          {msg?.content}
        </div>
        {msg.refference && msg.refference.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
          <p className="font-semibold">Sources:</p>
          <ul className="list-disc pl-5 mt-1">
            {msg.refference.map((ref, idx) => (
            <li key={idx}>{ref}</li>
            ))}
          </ul>
          </div>
        )}
        </div>
      ))}
      </div>
      )}
      <div className="p-4">
      <div className="flex items-center w-full">
        <PlaceholdersAndVanishInput
        placeholders={["Hello", "How are you?", "What is your name?"]}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSendChatMessage}
        />
      </div>
      </div>
    </div>
  );
};

export default ChatComponent;
