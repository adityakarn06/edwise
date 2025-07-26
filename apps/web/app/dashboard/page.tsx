"use client"
import { BookCheck, BookOpen, BotMessageSquare, SquareArrowOutUpRight } from "lucide-react";
import FeatureComponent from "@/components/featureComponent";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%] h-screen">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[8%]">
        <Navbar ctaIcon={<SquareArrowOutUpRight className="h-4 w-4" />} ctaText="Upgrade" />
        </div>
        <div className="flex flex-col justify-center items-center h-[92%] p-[11vw] bg-black/90">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-white/80 text-3xl font-medium p-4">Welcome to Edwise</h1>
            <p className="text-white/40 text-md max-w-2xl mb-8">
              Your AI-powered study companion. Upload PDFs, generate quizzes, and collaborate with peers to maximize your learning potential.
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <FeatureComponent 
                icon={<BotMessageSquare />} 
                heading="Chat with PDF" 
                feature="Upload your PDFs and ask questions to get instant, accurate answers based on the document content." 
                onClickFn={() => router.push("/ask-pdf")}
              />
              <FeatureComponent 
                icon={<BookCheck />} 
                heading="MCQ Generator" 
                feature="Automatically create multiple-choice questions from your study materials to test your knowledge."
                onClickFn={() => router.push("/mcq-generator")}
              />
              <FeatureComponent 
                icon={<BookOpen />} 
                heading="Study Group" 
                feature="Collaborate with peers in virtual study rooms to share resources, discuss topics, and learn together."
                onClickFn={() => router.push("/community")} 
              />
            </div>
        </div>
      </div>
    </div>
  );
}