import { SquareArrowOutUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Page() {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-[18%]">
                <Sidebar />
            </div>
            <div className="w-[82%] h-screen flex flex-col">
                <div className="h-[8%]">
                    <Navbar ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />} ctaText="Upgrade" />
                </div>
                <div className="flex items-center justify-center h-[92%] bg-black/90 text-white/80 text-2xl font-medium">
                    <h1>Under construction...</h1>
                </div>
            </div>
        </div>
    );
}