"use client";
import Navbar from "@/components/Navbar";
import { BookOpenCheck, Plus } from "lucide-react";
import { useState } from "react";
import McqGeneratorUI from "@/components/McqGenerator";
import ExamComponent from "@/components/ExamComponent";
import { useMcqDocuments } from "@/hooks/useMcqDocuments";

export default function Page() {
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  
  const {
    fileNames, 
    fileIds,
    fileUrls, 
    mcqData,
    setCurrentPdfUrl, 
    setMcqData,
    refreshDocuments 
  } = useMcqDocuments();

  return (
    <>
      <div className="h-[8%]">
        <Navbar
          openFileUpload={setIsUploadOpen}
          pdfs={fileNames}
          pdfIds={fileIds}
          pdfUrls={fileUrls}
          setCurrentPdf={setCurrentPdfUrl}
          onDocumentDeleted={refreshDocuments}
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
        <McqGeneratorUI setCurrentPdfUrl={setCurrentPdfUrl} setIsUploadOpen={setIsUploadOpen} setMcqData={setMcqData} onUploadComplete={refreshDocuments} />
      </div>
      ) : (
        !mcqData || mcqData.length === 0 ? (
          <div className="flex items-center justify-center h-[92%] w-full bg-[#131313]">
            <McqGeneratorUI setCurrentPdfUrl={setCurrentPdfUrl} setIsUploadOpen={setIsUploadOpen} setMcqData={setMcqData} onUploadComplete={refreshDocuments} />
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
