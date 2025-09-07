import toast from "react-hot-toast";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import { Settings2 } from "lucide-react";
import { useState } from "react";

interface ChatBoxProps {
    isLoading: boolean;
    setMessage: (message: string) => void;
    handleSendChatMessage: () => void;
    chatMode: "document" | "ai";
    setChatMode: (mode: "document" | "ai") => void;
}

export default function ChatBox({ isLoading, setMessage, handleSendChatMessage, chatMode, setChatMode }: ChatBoxProps) {
    const [optionsOpen, setOptionsOpen] = useState(false);

    return (
        <div className="flex items-center w-full gap-2">
          <div
            onClick={() => setOptionsOpen(!optionsOpen)}
            title="Settings"
          >
            {optionsOpen && (
                <div className="absolute bottom-16 bg-gray-700 border border-gray-700 rounded-md p-2 shadow-lg z-10">
                    <p onClick={() => setChatMode("document")} className={`text-white hover:bg-black  text-sm p-2 cursor-pointer rounded-md ${chatMode === "document" && "bg-black"}`}>From Document Only</p>
                    <p onClick={() => setChatMode("ai")} className={`text-white hover:bg-black ${chatMode === "ai" && "bg-black"} text-sm p-2 cursor-pointer rounded-md`}>Enhanced by AI</p>
                </div>
            )}
            <Settings2 className="h-4 w-4 text-white cursor-pointer" />
          </div>
          {!isLoading ? (
            <PlaceholdersAndVanishInput
            placeholders={["Hello", "How are you?", "What is your name?"]}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSendChatMessage}
            />
          ) : (
            <PlaceholdersAndVanishInput
            placeholders={["Hello", "How are you?", "What is your name?"]}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={() => {
              toast.error("Please wait for the response to be generated.");
            }}
            />
          )}
        </div>
    )
}