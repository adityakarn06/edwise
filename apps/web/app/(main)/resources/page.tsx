"use client";
import { ChevronRight, CloudUpload, SquareArrowOutUpRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadResourceClientComponent from "@/components/UploadResourceClient";
import api from "@/lib/api";
import DocumentView from "@/components/DocumentView";

interface Resource {
    id: string;
    title: string;
    description: string;
    fileURL: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    tags: string[];
    categories: string | null;
    thumbnail: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    uploadedById: string;
}

export default function Page() {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    const [resources, setResources] = useState<Resource[]>([]);
    const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const resourceOptions = [
      {
        label: "Books",
        onClick: () => {
          setSelectedCategory(selectedCategory === "Books" ? "" : "Books");
          setSearchValue("");
        },
      },
      {
        label: "Notes", 
        onClick: () => {
          setSelectedCategory(selectedCategory === "Notes" ? "" : "Notes");
          setSearchValue("");
        },
      },
      {
        label: "Organisers",
        onClick: () => {
          setSelectedCategory(selectedCategory === "Organisers" ? "" : "Organisers");
          setSearchValue("");
        },
      },
      {
        label: "PYQs",
        onClick: () => {
          setSelectedCategory(selectedCategory === "PYQs" ? "" : "PYQs");
          setSearchValue("");
        },
      },
    ];

    const filteredResources = resources.filter((resource) => {
        // First filter by category if selected
        if (selectedCategory && resource.categories !== selectedCategory) {
            return false;
        }
        
        // Then filter by search term if provided
        if (!searchValue.trim()) return true;
        const searchTerm = searchValue.toLowerCase();
        return (
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm) ||
            resource.fileName.toLowerCase().includes(searchTerm) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            (resource.categories && resource.categories.toLowerCase().includes(searchTerm))
        );
    });

    const getAllResources = async() => {
        try {
            const res = await api.get("/resources")
            const resources = res.data;
            setResources(resources);
        } catch (error) {
            console.error("error in getting all resources", error);
            setResources([]);
        }
    }

    useEffect(() => {
        getAllResources();
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="h-[8%]">
                <Navbar
                    giveOptions={false}
                    ctaIcon={<CloudUpload className="h-4 w-4" />}
                    ctaText="Upload"
                    onCtaClick={() => setIsUploadOpen(!isUploadOpen)}
                />
            </div>
            {isUploadOpen ? (
                <div className="flex items-center justify-center h-[92%] w-full bg-black/90">
                    <UploadResourceClientComponent setIsUploadOpen={setIsUploadOpen} />
                </div>
            ) : (
                <div className="flex flex-col items-center h-full py-4 bg-black/90 overflow-scroll">
                    <h1 className="text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-4 sm:mt-8 md:mt-12 px-4 text-center">
                        Browse Resources
                    </h1>
                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 w-full max-w-2xl px-4 text-center">
                        <SearchBar 
                            showOptions={true}
                            searchValue={searchValue} 
                            onSearchChange={setSearchValue} 
                            placeholder="find resources, notes, etc." 
                        />
                        {resourceOptions.map((option, index) => (
                            <button
                                key={index}
                                className={`mx-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 w-24 sm:w-36 text-sm sm:text-base rounded-lg cursor-pointer transition-colors ${
                                    selectedCategory === option.label 
                                        ? 'bg-white/20 text-white border border-white/30' 
                                        : 'bg-white/6 text-white hover:bg-white/10'
                                }`}
                                onClick={option.onClick}
                            >
                                <div className="flex items-center justify-center">
                                    <span className="ml-2 text-sm sm:text-base md:text-lg">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>


                    <div className="mt-10 sm:mt-12 w-full max-w-4xl px-4">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h2 className="text-white/90 text-lg sm:text-xl">
                                {selectedCategory ? `${selectedCategory} Resources` : 'All Resources'}
                            </h2>
                            <span className="text-white/60 text-sm">
                                {(searchValue.trim() || selectedCategory) 
                                    ? `${filteredResources.length} of ${resources.length} resources found`
                                    : `${resources.length} resources found`
                                }
                            </span>
                        </div>

                        {/* Show filter info */}
                        {(searchValue.trim() || selectedCategory) && (
                            <div className="mt-4 text-white/60 text-sm flex flex-wrap gap-2">
                                {selectedCategory && (
                                    <span className="bg-white/10 px-2 py-1 rounded text-xs">
                                        Category: {selectedCategory}
                                        <button 
                                            onClick={() => setSelectedCategory("")}
                                            className="ml-2 text-white/80 hover:text-white"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {searchValue.trim() && (
                                    <span className="bg-white/10 px-2 py-1 rounded text-xs">
                                        Search: "{searchValue}"
                                        <button 
                                            onClick={() => setSearchValue("")}
                                            className="ml-2 text-white/80 hover:text-white"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredResources.map((resource) => (
                                <div
                                    key={resource.id}
                                    onClick={() => {
                                        setSelectedPdf(resource.fileURL);
                                        setIsPdfOpen(true);
                                    }}
                                    className="rounded-lg overflow-hidden cursor-pointer bg-white/6 border border-white/10 p-1 flex flex-col justify-between"
                                >
                                    {resource.thumbnail ? (
                                        <Image
                                            src={resource.thumbnail}
                                            alt={resource.title}
                                            width={200}
                                            height={200}
                                            className="w-full h-40 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-40 flex items-center justify-center">
                                            <DocumentView pdfUrl={resource.fileURL} interactive={false} />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-grow mt-2 px-2 gap-1">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-white/90 font-medium text-sm line-clamp-1 w-[70%]">
                                                {resource.title}
                                            </h3>
                                            <div className="text-white/50 text-xs w-[30%] text-right">
                                                {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
                                            </div>      
                                        </div>
                                        <p className="text-white/60 text-xs line-clamp-2">
                                            {resource.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 my-2">
                                            {resource.tags.slice(0, 2).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {resource.tags.length > 2 && (
                                                <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                                                    +{resource.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredResources.length === 0 && (searchValue.trim() || selectedCategory) && (
                            <div className="mt-6 text-center">
                                <div className="bg-white/5 rounded-xl p-8">
                                    <h3 className="text-white text-lg font-semibold mb-2">
                                        No Resources Found
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4">
                                        {selectedCategory && searchValue.trim() 
                                            ? `No resources match "${searchValue}" in the ${selectedCategory} category.`
                                            : selectedCategory 
                                            ? `No resources found in the ${selectedCategory} category.`
                                            : `No resources match your search for "${searchValue}".`
                                        }
                                        {" "}Try different keywords or upload a new resource!
                                    </p>
                                    <div className="flex gap-2 justify-center">
                                        {searchValue.trim() && (
                                            <button
                                                onClick={() => setSearchValue("")}
                                                className="text-white font-semibold hover:font-bold text-sm underline cursor-pointer"
                                            >
                                                Clear search
                                            </button>
                                        )}
                                        {selectedCategory && (
                                            <button
                                                onClick={() => setSelectedCategory("")}
                                                className="text-white font-semibold hover:font-bold text-sm underline cursor-pointer"
                                            >
                                                Clear category
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {resources.length === 0 && !searchValue.trim() && !selectedCategory && (
                            <div className="mt-6 text-center text-white/60">
                                <p>No resources found. Upload your first resource!</p>
                            </div>
                        )}
                        
                        {isPdfOpen && selectedPdf && (
                            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8">
                                <div className="bg-white/10 p-6 rounded-lg shadow-lg max-w-2xl w-full h-full relative">
                                    <DocumentView pdfUrl={selectedPdf} interactive={true} />
                                    <button
                                        onClick={() => {
                                            setIsPdfOpen(false);
                                            setSelectedPdf(null);
                                        }}
                                        className="absolute top-2 left-2 text-white hover:text-gray-300 cursor-pointer"
                                    >
                                        <X className="h-8 w-8" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
