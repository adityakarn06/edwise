"use client";
import { useRef, useState } from "react";
import { CloudUpload, Info, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import api from "@/lib/api";

export default function FileUpload() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const result = await api.post('/upload/pdf', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (result.status === 200) {
        setMessage("Upload successful!");
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      
      if (err.response?.status === 401) {
        setMessage("Authentication failed. Please sign in again.");
      } else if (err.response?.status === 413) {
        setMessage("File too large. Please upload a smaller PDF.");
      } else if (err.response?.status === 400) {
        setMessage("Invalid file format. Please upload a PDF file.");
      } else {
        setMessage(`${err.response?.data?.error || err.message || "Error uploading file"}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
      <div className="flex flex-col p-8 z-10 h-[60vh] w-[28vw] bg-[#262626] rounded-lg shadow-lg">
        <div className="text-start mb-6">
          <h1 className="text-xl font-semibold mb-2 text-white">Upload your PDF</h1>
          <p className="text-sm text-white/60">
            Generate text embeddings from your files to enable chat functionality. Please use PDF format.
          </p>
        </div>
        <div className="flex w-full mb-6 p-2 rounded-lg bg-gradient-to-tr from-blue-200 to-indigo-200 relative">
          <div className="mr-2">
            <Info color="blue" size="18px" /> 
          </div>
          <p className="text-xs text-blue-800">
            Please ensure the PDF is not larger than 10MB and contains text data for optimal results.
          </p>
        </div>
        <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
          <label
            htmlFor="pdf-upload"
            className="w-full border border-white/40 border-dashed cursor-pointer mb-4"
          >
            <div className="flex flex-col items-center justify-center w-full py-6 hover:scale-105 transition-transform">
              <div className="p-2 border border-white/30 rounded-lg mb-2">
                <CloudUpload size={20} color="white" />
              </div>
              <p className="text-white/90 text-sm">Drag and drop your PDF here or</p>
              <p className="text-blue-300 text-sm underline">click to upload</p>
            </div>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && (
            <span className="text-sm text-gray-700 font-medium">{file.name}</span>
          )}
          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Next"}
          </button>
          {message && (
            <span
              className={`text-sm font-medium ${
                message === "Upload successful!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </span>
          )}
        </form>
      </div>
    
  );
}