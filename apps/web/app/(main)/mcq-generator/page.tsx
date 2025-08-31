"use client";
import Navbar from "@/components/Navbar";
import { BookOpenCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import McqGeneratorUI from "@/components/McqGenerator";
import ExamComponent from "@/components/ExamComponent";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getMcqDocs } from "@/utils/getDoc";

interface McqData {
  question: string;
  options: string[];
  answer: string;
}

const getMCQData = async (currentPdfUrl: string): Promise<McqData[]> => {
  try {
    const result = await api.get(`/mcq/data?fileUrl=${currentPdfUrl}`);
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
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");

  useEffect(() => {
    if (currentPdfUrl) {
      getMCQData(currentPdfUrl)
      .then((data) => setMcqData(data))
      .catch((error) => console.error("Error fetching MCQ data:", error));
    }
  }, [currentPdfUrl]);

  useEffect(() => {
    getMcqDocs()
        .then((docs) => {
          if (docs && docs.length > 0) {
            const urls = docs.map((doc: { fileUrl: string }) => doc.fileUrl);
            setPdfs(urls);
            if (urls.length > 0 && urls[0]) {
              setCurrentPdfUrl(urls[0]);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
          setPdfs([]);
        });
    }, []);

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          openFileUpload={setIsUploadOpen}
          pdfs={pdfs}
          setCurrentPdf={setCurrentPdfUrl}
          giveOptions={true}
          optionType="pdf"
          headingIcon={<BookOpenCheck className="h-4 w-4 text-white" />}
          headingText="MCQ from PDF"
          ctaIcon={<Plus className="h-4 w-4" />}
          ctaText="New Exam"
          onCtaClick={() =>
            setIsUploadOpen(true)
          }
        />
      </div>

      {isUploadOpen ? (
        <div className="flex items-center justify-center h-[92%] w-full bg-[#131313]">
        <McqGeneratorUI setCurrentPdfUrl={setCurrentPdfUrl} setIsUploadOpen={setIsUploadOpen} setMcqData={setMcqData} />
      </div>
      ) : (
        !mcqData || mcqData.length === 0 ? (
          <div className="flex items-center justify-center h-[92%] w-full bg-[#131313]">
            <McqGeneratorUI setCurrentPdfUrl={setCurrentPdfUrl} setIsUploadOpen={setIsUploadOpen} setMcqData={setMcqData} />
          </div>
        ) : (
          <div className="flex flex-row h-[92%] overflow-y-auto bg-[#131313]">
            <ExamComponent mcqData={mcqData} />
          </div>
        )
      )}   
    </>
  );
}
