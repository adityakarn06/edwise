import Navbar from "../../components/Navbar";
import DocumentView from "../../components/DocumentView";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import { Bot, Plus } from "lucide-react";

export default function AskPdf() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[8%]">
          <Navbar headingIcon={<Bot className="h-4 w-4 text-white"/>} headingText="Chat with pdf" ctaIcon={<Plus className="h-4 w-4" />} ctaText="New chat" />
        </div>
        <div className="flex flex-row h-[92%]">
          <div className="w-[50%] border-l border-r border-white/20 bg-black">
            <DocumentView pdfUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
          </div>
          <div className="w-[50%]">
            <ChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
}