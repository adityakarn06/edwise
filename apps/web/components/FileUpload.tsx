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
}

export default function FileUpload({ setCurrentPdfUrl }: FileUploadProp) {
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
      console.log("got the result")
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
          console.log("mutating 1")
          setUploading(false);
          console.log("mutating 2")
          setCurrentPdfUrl(fileUrl);
          console.log("mutating 3")
          toast.success("Upload successful!");
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
    <div className="flex flex-col p-8 z-10 h-[60vh] w-[28vw] bg-[#262626] rounded-lg shadow-lg">
      <div className="text-start mb-6">
        <h1 className="text-xl font-semibold mb-2 text-white">
          Upload your PDF
        </h1>
        <p className="text-sm text-white/60">
          Generate text embeddings from your files to enable chat functionality.
          Please use PDF format.
        </p>
      </div>
      <div className="flex w-full mb-6 p-2 rounded-lg bg-gradient-to-tr from-blue-200 to-indigo-200 relative">
        <div className="mr-2">
          <Info color="blue" size="18px" />
        </div>
        <p className="text-xs text-blue-800">
          Please ensure the PDF is not larger than 10MB and contains text data
          for optimal results.
        </p>
      </div>
      <div
        {...getRootProps({
          className:
            "w-full h-40 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors",
        })}
      >
        <input {...getInputProps()} />
        <>
          <div className="flex flex-col items-center">
            <CloudUpload size={24} color="white" />
            <p className="text-white/90 text-sm mt-2">
              Drag and drop your PDF here or
            </p>
            <button className="text-blue-300 text-sm underline mt-1">
              click to upload
            </button>
          </div>
        </>
      </div>
      <button
        type="submit"
        disabled={true}
        className="mt-4 w-full px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Next"}
      </button>
    </div>
  );
}
