"use client";
import { useState } from "react";
import { CloudUpload, Info } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUsageStats } from '@/hooks/useUsageStats';

interface McqData {
    question: string;
    options: string[];
    answer: string;
}

interface McqGeneratorUIProp {
  setMcqData: React.Dispatch<React.SetStateAction<McqData[]>>;
  setIsUploadOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPdfUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function McqGeneratorUI({ setMcqData, setIsUploadOpen, setCurrentPdfUrl }: McqGeneratorUIProp) {
  const router = useRouter();
  const { isPremium } = useUsageStats();
  const [uploading, setUploading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await api.post("/mcq", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        toast.error("Please select a PDF file to upload.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10 mb
        toast.error("Please upload a smaller file");
        return;
      }
      mutate(file, {
        onSuccess: async (data) => {
          setUploading(false);
          const mcqData = data.MCQs;
          const fileUrl = data.fileUrl;
          setMcqData(mcqData);
          setCurrentPdfUrl(fileUrl);
          setIsUploadOpen?.(false);
          toast.success("MCQ genarated successfully!");
          router.refresh();
        },
        onError: (error: any) => {
          console.error("Generation error:", error);
          setUploading(false);
          
          // usage limit exceeded
          if (error.response?.status === 429) {
            const errorData = error.response.data;
            if (errorData.usageType === 'totalRequests') {
              toast.error(`Daily total request limit exceeded (${errorData.currentUsage}/${errorData.limit})`);
            } else {
              toast.error(`Daily MCQ generation limit exceeded (${errorData.currentUsage}/${errorData.limit})`);
            }
            
            // upgrade alert for free users only
            if (!isPremium) {
              setTimeout(() => {
                const message = errorData.usageType === 'totalRequests'
                  ? 'You\'ve reached your daily total request limit. Would you like to upgrade to premium for unlimited access?'
                  : 'You\'ve reached your daily MCQ generation limit. Would you like to upgrade to premium for unlimited access?';
                
                if (confirm(message)) {
                  router.push('/upgrade');
                }
              }, 1000);
            }
          } else {
            toast.error("Error generating MCQs");
          }
        },
      });
    },
  });

  return (
    <div className="flex flex-col z-10 bg-[#262626] rounded-lg shadow-lg w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[28vw] p-4 sm:p-6 md:p-8 h-auto md:h-[60vh]">
      <div className="text-start mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 text-white">
          Upload your PDF
        </h1>
        <p className="text-xs sm:text-sm md:text-sm text-white/60">
          Generate customized MCQs from your files to test your knowledge.
          Please use PDF format.
        </p>
      </div>
      <div className="flex w-full mb-4 sm:mb-5 md:mb-6 p-2 sm:p-2.5 rounded-lg bg-gradient-to-tr from-blue-200 to-indigo-200 relative">
        <div className="mr-2">
          <Info className="text-blue-700 h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </div>
        <p className="text-[11px] sm:text-xs md:text-sm text-blue-800">
          Please ensure the PDF is not larger than 10MB and contains text data
          for optimal results.
        </p>
      </div>
      <div
        {...getRootProps({
          className:
            "w-full h-36 sm:h-40 md:h-44 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors",
        })}
      >
        <input {...getInputProps()} />
        <>
          <div className="flex flex-col items-center">
            <CloudUpload className="text-white h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
            <p className="text-white/90 text-xs sm:text-sm mt-2">
              Drag and drop your PDF here or
            </p>
            <button className="text-blue-300 text-xs sm:text-sm underline mt-1">
              click to upload
            </button>
          </div>
        </>
      </div>
      <button
        type="submit"
        disabled={true}
        className="mt-3 sm:mt-4 w-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Generate MCQs"}
      </button>
    </div>
  );
}
