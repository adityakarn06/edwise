"use client";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { BookOpenCheck, Plus } from "lucide-react";
import { useState } from "react";
import McqGeneratorUI from "@/components/McqGenerator";

interface McqData {
    question: string;
    options: string[];
    answer: string;
}

export default function Page() {
  const [mcqData, setMcqData] = useState<McqData[]>([]);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[18%]">
        <Sidebar />
      </div>
      <div className="w-[82%] h-screen flex flex-col">
        <div className="h-[8%]">
          <Navbar headingIcon={<BookOpenCheck className="h-4 w-4 text-white"/>} headingText="MCQ from PDF" ctaIcon={<Plus className="h-4 w-4" />} ctaText="New Exam" />
        </div>
        {!mcqData || mcqData.length === 0 ? (
            <div className="flex items-center justify-center h-[92%] w-full bg-black/90">
              <McqGeneratorUI setMcqData={setMcqData} />
            </div>
        ) : (
            <div className="flex flex-row h-[92%] overflow-y-auto bg-black/80">
              <div className="w-full">
            {mcqData.map((mcq, index) => (
              <div key={index} className="p-4 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">{mcq.question}</h2>
                <ul className="list-disc pl-5">
                  {mcq.options.map((option, optIndex) => (
                <li key={optIndex} className="text-white/80">{option}</li>
                  ))}
                </ul>
                <p className="text-green-400">Answer: {mcq.answer}</p>
              </div>
            ))}
              </div>
            </div>
        )}
      </div>
    </div>
  );
}