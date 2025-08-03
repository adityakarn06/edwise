"use client";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { BookOpenCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import McqGeneratorUI from "@/components/McqGenerator";
import ExamComponent from "@/components/ExamComponent";
import api from "@/lib/api";

interface McqData {
    question: string;
    options: string[];
    answer: string;
}

const getMCQData = async (): Promise<McqData[]> => {
  try {
    const result = await api.get("/mcq/data");
    return result.data.MCQs;  
  } catch (error) {
    console.error("failed to get mcq data")
    return [];
  } 
}

export default function Page() {
  const [mcqData, setMcqData] = useState<McqData[]>([]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedOption([...selectedOption, checkedId]);
    } else {
      setSelectedOption(selectedOption.filter(id => id !== checkedId));
    }
   }

  useEffect(() => {
    getMCQData()
      .then((data) => setMcqData(data))
      .catch((error) => console.error("Error fetching MCQ data:", error));
  }, []);

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
              <ExamComponent mcqData={mcqData} />
            </div>
        )}
      </div>
    </div>
  );
}