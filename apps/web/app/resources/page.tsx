"use client";
import { ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const resourceOptions = [
    { label: "Books", icon: <SquareArrowOutUpRight className="h-4 w-4" />, onClick: () => toast.success("This button has no functionality yet!") },
    { label: "Videos", icon: <SquareArrowOutUpRight className="h-4 w-4" />, onClick: () => toast.success("This button has no functionality yet!") },
    { label: "Notes", icon: <SquareArrowOutUpRight className="h-4 w-4" />, onClick: () => toast.success("This button has no functionality yet!") },
    { label: "Organisers", icon: <SquareArrowOutUpRight className="h-4 w-4" />, onClick: () => toast.success("This button has no functionality yet!") },
];

const BookImages = [
    "/bookImage1.png",
    "/bookImage2.png",
    "/bookImage3.png",
    "/bookImage4.png",
];

export default function Page() {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-[18%]">
                <Sidebar />
            </div>
            <div className="w-[82%] h-screen flex flex-col">
                <div className="h-[8%]">
                    <Navbar ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />} ctaText="Upgrade" onCtaClick={() => toast.success("This button has no functionality yet!")}/>
                </div>
                <div className="flex flex-col items-center h-[92%] bg-black/90">
                    <h1 className="text-white/90 text-5xl font-medium mt-16">
                        Browse Resources
                    </h1>
                    <div className="mt-8 space-y-4">
                        <SearchBar />
                        {resourceOptions.map((option, index) => (
                            <button
                                key={index}
                                className="mx-2 px-6 py-2 w-38 text-md bg-white/6 text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={option.onClick}
                            >
                                <div className="flex items-center justify-center">
                                    {option.icon}
                                    <span className="ml-2">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="mt-12 w-full max-w-4xl px-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-white/90 text-xl">Book Recommendation</h2>
                            <button
                                className="px-2 py-1 text-sm bg-white/90 text-black/90 rounded-md cursor-pointer hover:bg-white transition-colors"
                                onClick={() => toast.success("This button has no functionality yet!")}
                            >
                                <div className="flex items-center justify-center">
                                    <span className="ml-2">View all</span>
                                    <ChevronRight className="size-4 color-white" />
                                </div>
                            </button>  
                        </div>
                        
                        <div className="mt-6 grid grid-cols-4 gap-8">
                            {BookImages.map((image, index) => (
                                <div key={index} className="rounded-lg overflow-hidden shadow-md shadow-white/20 cursor-pointer hover:shadow-white/30 hover:shadow-xl transition-shadow"> 
                                    <Image
                                    src={image}
                                    alt={`Book ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}