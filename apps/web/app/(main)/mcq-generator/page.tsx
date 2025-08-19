"use client";
import Navbar from "@/components/Navbar";
import { BookOpenCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import McqGeneratorUI from "@/components/McqGenerator";
import ExamComponent from "@/components/ExamComponent";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface McqData {
  question: string;
  options: string[];
  answer: string;
}

const getMCQData = async (): Promise<McqData[]> => {
  try {
    const result = await api.get("/mcq/data");
    if (!result.data || !Array.isArray(result.data.MCQs)) {
      return [];
    }
    return result.data.MCQs;
  } catch (error) {
    return [];
  }
};

export default function Page() {
  const [mcqData, setMcqData] = useState<McqData[]>([]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedOption([...selectedOption, checkedId]);
    } else {
      setSelectedOption(selectedOption.filter((id) => id !== checkedId));
    }
  };

  useEffect(() => {
    getMCQData()
      .then((data) => setMcqData(data))
      .catch((error) => console.error("Error fetching MCQ data:", error));
  }, []);

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          giveOptions={true}
          headingIcon={<BookOpenCheck className="h-4 w-4 text-white" />}
          headingText="MCQ from PDF"
          ctaIcon={<Plus className="h-4 w-4" />}
          ctaText="New Exam"
          onCtaClick={() =>
            toast.success("This button has no functionality yet!")
          }
        />
      </div>
      {!mcqData || mcqData.length === 0 ? (
        <div className="flex items-center justify-center h-[92%] w-full bg-[#131313]">
          <McqGeneratorUI setMcqData={setMcqData} />
        </div>
      ) : (
        <div className="flex flex-row h-[92%] overflow-y-auto bg-[#131313]">
          <ExamComponent mcqData={mcqData} />
        </div>
      )}
    </>
  );
}
