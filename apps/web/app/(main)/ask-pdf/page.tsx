"use client";
import Navbar from "@/components/Navbar";
import DocumentView from "@/components/DocumentView";
import { Bot, SquareArrowOutUpRight, X } from "lucide-react";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { useEffect } from "react";
import { getAllDoc } from "@/utils/getDoc";
import toast from "react-hot-toast";
import ChatComponent from "@/components/ChatComponent";

export default function AskPdf() {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    getAllDoc()
      .then((docs) => {
        if (docs && docs.length > 0) {
          const urls = docs.map((doc: { fileUrl: string }) => doc.fileUrl);
          setPdfUrls(urls);
          if (urls.length > 0 && urls[0]) {
            setCurrentPdfUrl(urls[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setPdfUrls([]);
      });
  }, []);

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          openFileUpload={setIsUploadOpen}
          pdfs={pdfUrls}
          setCurrentPdf={setCurrentPdfUrl}
          giveOptions={true}
          headingIcon={<Bot className="h-4 w-4 text-white" />}
          headingText="Chat with pdf"
          ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText="Upgrade"
          onCtaClick={() =>
            toast.success("This button has no functionality yet!")
          }
        />
      </div>
      {!currentPdfUrl || isUploadOpen ? (
        <div className="flex items-center justify-center h-[92%] w-full bg-black/90">
          <FileUpload
            setUploadOpen={setIsUploadOpen}
            setCurrentPdfUrl={setCurrentPdfUrl}
          />
        </div>
      ) : (
        <div className="flex flex-row h-[92%] relative">
          {/* for mobile */}
          {isPdfOpen ? (
            <div className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-8">
              <div className="bg-white/10 p-6 rounded-lg shadow-lg max-w-2xl w-full h-full relative">
                <DocumentView pdfUrl={currentPdfUrl} interactive={true} />
                <button
                  onClick={() => {
                    setIsPdfOpen(false);
                  }}
                  className="absolute top-2 left-2 text-white hover:text-gray-300 cursor-pointer"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
            </div>
          ) : (
            <div
             onClick={() => setIsPdfOpen(true)}
             className="absolute left-2 top-2 md:hidden bg-black/90 border border-white/20 rounded-md overflow-hidden shadow-lg w-[20vw] h-[25vw] z-10 cursor-pointer">
              <DocumentView pdfUrl={currentPdfUrl} interactive={false} />
            </div>
          )}

          {/* for desktop */}
          <div className="hidden md:flex w-[50%] border-l border-r border-white/20 bg-black">
            <DocumentView pdfUrl={currentPdfUrl} />
          </div>

          <div className="w-full md:w-[50%]">
            <ChatComponent currentPdfUrl={currentPdfUrl} />
          </div>
        </div>
      )}
    </>
  );
}
