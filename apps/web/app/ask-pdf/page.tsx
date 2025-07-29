"use client";
import Navbar from "../../components/Navbar";
import DocumentView from "../../components/DocumentView";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import { Bot, Plus } from "lucide-react";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { useEffect } from "react";
import { getAllDoc } from "@/utils/getDoc";

export default function AskPdf() {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  useEffect(() => {
    getAllDoc().then((docs) => {
      console.log("Fetched documents:", docs);
      if (docs && docs.length > 0) {
        const urls = docs.map((doc: { fileUrl: string }) => doc.fileUrl);
        setPdfUrls(urls);
        if (urls.length > 0 && urls[0]) {
          console.log("Setting current PDF URL to:", urls[0]);
          setCurrentPdfUrl(urls[0]);
        }
      }
    }).catch((error) => {
      console.error("Error fetching documents:", error);
      setPdfUrls([]);
    });
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[8%]">
          <Navbar headingIcon={<Bot className="h-4 w-4 text-white"/>} headingText="Chat with pdf" ctaIcon={<Plus className="h-4 w-4" />} ctaText="New chat" />
        </div>
        {!currentPdfUrl ? (
            <div className="flex items-center justify-center h-[92%] w-full bg-black/90">
              <FileUpload setCurrentPdfUrl={setCurrentPdfUrl} />
            </div>
        ) : (
            <div className="flex flex-row h-[92%]">
              <div className="w-[50%] border-l border-r border-white/20 bg-black">
                <DocumentView pdfUrl={currentPdfUrl} />
              </div>
              <div className="w-[50%]">
                <ChatComponent />
              </div>
            </div>
        )}
      </div>
    </div>
  );
}