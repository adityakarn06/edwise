"use client";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import api from "@/lib/api";

export default function FileUpload() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to upload files</p>
          <a
            href="/sign-in"
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

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
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-2">Upload your PDF</h1>
        <p className="text-sm text-gray-600">
          Welcome, {session?.user?.name || session?.user?.email}! 👋
        </p>
      </div>
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg hover:scale-105 transition-transform"
        >
          <Upload className="w-10 h-10 text-white" />
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
          className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
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