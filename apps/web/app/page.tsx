import ChatComponent from "../components/ChatComponent";
import FileUpload from "../components/FileUpload";

export default function Page() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUpload />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
