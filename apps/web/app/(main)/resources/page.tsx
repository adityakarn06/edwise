"use client";
import { ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const resourceOptions = [
  {
    label: "Books",
    icon: <SquareArrowOutUpRight className="h-4 w-4" />,
    onClick: () => toast.success("This button has no functionality yet!"),
  },
  {
    label: "Videos",
    icon: <SquareArrowOutUpRight className="h-4 w-4" />,
    onClick: () => toast.success("This button has no functionality yet!"),
  },
  {
    label: "Notes",
    icon: <SquareArrowOutUpRight className="h-4 w-4" />,
    onClick: () => toast.success("This button has no functionality yet!"),
  },
  {
    label: "Organisers",
    icon: <SquareArrowOutUpRight className="h-4 w-4" />,
    onClick: () => toast.success("This button has no functionality yet!"),
  },
];

const BookImages = [
  "/bookImage1.png",
  "/bookImage2.png",
  "/bookImage3.png",
  "/bookImage4.png",
];

export default function Page() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[8%]">
        <Navbar
          giveOptions={false}
          ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />}
          ctaText="Upgrade"
          onCtaClick={() =>
            toast.success("This button has no functionality yet!")
          }
        />
      </div>
      <div className="flex flex-col items-center h-[92%] bg-black/90">
        <h1 className="text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-8 sm:mt-12 md:mt-16 px-4 text-center">
          Browse Resources
        </h1>
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 w-full max-w-2xl px-4">
          <SearchBar placeholder="find resources, notes, etc." />
          {resourceOptions.map((option, index) => (
            <button
              key={index}
              className="mx-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 w-full sm:w-auto text-sm sm:text-base bg-white/6 text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              onClick={option.onClick}
            >
              <div className="flex items-center justify-center">
                {option.icon}
                <span className="ml-2 text-sm sm:text-base md:text-lg">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-10 sm:mt-12 w-full max-w-4xl px-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-white/90 text-lg sm:text-xl">Book Recommendation</h2>
            <button
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-white/90 text-black/90 rounded-md cursor-pointer hover:bg-white transition-colors"
              onClick={() =>
                toast.success("This button has no functionality yet!")
              }
            >
              <div className="flex items-center justify-center">
                <span className="ml-2">View all</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 color-white" />
              </div>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-8">
            {BookImages.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md shadow-white/20 cursor-pointer hover:shadow-white/30 hover:shadow-xl transition-shadow"
              >
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
  );
}
