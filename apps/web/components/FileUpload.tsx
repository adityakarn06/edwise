"use client";
import { useState } from "react";
import { CloudUpload, Info } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface FileUploadProp {
  setCurrentPdfUrl: React.Dispatch<React.SetStateAction<string>>;
  setUploadOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FileUpload({ setCurrentPdfUrl, setUploadOpen }: FileUploadProp) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await api.post("/upload/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data.fileUrl;
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
        onSuccess: (fileUrl) => {
          setUploading(false);
          setCurrentPdfUrl(fileUrl);
          toast.success("Upload successful!");
          setUploadOpen && setUploadOpen(false);
          router.refresh();
        },
        onError: (error: any) => {
          console.error("Upload error:", error);
          toast.error("Error uploading file");
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
          Generate text embeddings from your files to enable chat functionality.
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
        {uploading ? "Uploading..." : "Next"}
      </button>
    </div>
  );
}
