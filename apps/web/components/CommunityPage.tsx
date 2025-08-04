import Image from "next/image";
import SearchBar from "./SearchBar";
import { ArrowUpRight } from "lucide-react";

export default function CommunityHomepage() {
    return (
        <div>
            <div className="m-8">
                <h1 className="text-4xl text-semibold text-white/90">Explore Communities</h1>
                <div className="w-3/5 mt-4">
                    <SearchBar placeholder="search for study groups..." />    
                </div>
            </div>
            <div className="flex gap-6 w-full mx-8 mt-16">
                <div className="flex flex-col items-center gap-2 h-72 w-52 p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-lg">Edwise Official </h2>
                    <button className="bg-white/90 text-xs text-black/90 px-3 py-1 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1"><ArrowUpRight className="h-4 w-4" /></span>    
                        </div>
                        
                    </button>
                    <Image
                        src="/bookImage1.png"
                        alt=""
                        width={150}
                        height={200}
                        className="object-cover rounded-xl mt-16 ml-22 blur-xs"    
                    />
                </div>
                <div className="flex flex-col items-center gap-2 h-72 w-52 p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-lg">BTech 1st Year </h2>
                    <button className="bg-white/90 text-xs text-black/90 px-3 py-1 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1"><ArrowUpRight className="h-4 w-4" /></span>    
                        </div>
                    </button>
                    <Image
                        src="/bookImage2.png"
                        alt=""
                        width={150}
                        height={200}
                        className="object-cover rounded-xl mt-16 ml-22 blur-xs"    
                    />
                </div>
                <div className="flex flex-col items-center gap-2 h-72 w-52 p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-lg">BTech 2st Year </h2>
                    <button className="bg-white/90 text-xs text-black/90 px-3 py-1 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1"><ArrowUpRight className="h-4 w-4" /></span>    
                        </div>
                    </button>
                    <Image
                        src="/bookImage3.png"
                        alt="Edwise Logo"
                        width={150}
                        height={200}
                        className="object-cover rounded-xl mt-16 ml-22 blur-xs"
                    />
                </div>
                <div className="flex flex-col items-center gap-2 h-72 w-52 p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-lg">BTech 3st Year </h2>
                    <button className="bg-white/90 text-xs text-black/90 px-3 py-1 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1"><ArrowUpRight className="h-4 w-4" /></span>    
                        </div>
                        
                    </button>
                    <Image
                        src="/bookImage4.png"
                        alt="Edwise Logo"
                        width={150}
                        height={200}
                        className="object-cover rounded-xl mt-16 ml-22 blur-xs"    
                    />
                </div>
                <div className="flex flex-col items-center gap-2 h-72 w-52 p-4 text-white/90 bg-white/15 rounded-lg overflow-hidden">
                    <h2 className="text-lg">BTech 4st Year </h2>
                    <button className="bg-white/90 text-xs text-black/90 px-3 py-1 rounded-md hover:bg-white transition-colors cursor-pointer">
                        <div className="flex items-center">
                            <span>Join Community</span>
                            <span className="ml-1"><ArrowUpRight className="h-4 w-4" /></span>    
                        </div>
                        
                    </button>
                    <Image
                        src="/bookImage1.png"
                        alt="Edwise Logo"
                        width={150}
                        height={200}
                        className="object-cover rounded-xl mt-16 ml-22 blur-xs"    
                    />
                </div>
            </div>
        </div>
    )
}