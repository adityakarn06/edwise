import Navbar from "../../components/Navbar";
import DocumentView from "../../components/DocumentView";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";

export default function Page() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[7%]">
          <Navbar />
        </div>
        <div className="flex flex-row h-[93%]">
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