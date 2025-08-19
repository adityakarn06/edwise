"use client";
import { useState } from "react";
import { CloudUpload, Info } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface UploadResourceProp {
  setIsUploadOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadResourceClientComponent({
  setIsUploadOpen,
}: UploadResourceProp) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploadMetadataOpen, setIsUploadMetadataOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await api.post("/resources/pdf", formData, {
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
          toast.success("Upload successful!");
          setFileUrl(fileUrl);
          setIsUploadMetadataOpen(true);
        },
        onError: (error: any) => {
          console.error("Upload error:", error);
          toast.error("Error uploading file");
        },
      });
    },
  });

  const updateMetadataOfPdf = async (metadata: {
    title: string;
    description: string;
    tags: string[];
    fileUrl: string
  }) => {
    try {
      await api.post("/resources/pdf/metadata", metadata);
      setUploading(false);
      toast.success("Metadata updated successfully!");
      setIsUploadMetadataOpen(false);
      setIsUploadOpen && setIsUploadOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating metadata:", error);
      toast.error("Failed to update metadata");
    }
  };

  const onMetadataSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    if (!title || !description || !tags) {
      toast.error("Please fill in all fields");
      return;
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    if (tagsArray.length === 0) {
      toast.error("Please provide at least one tag");
      return;
    }
    if (!fileUrl) {
        toast.error("please upload that file again");
        return;
    }
    try {
        await updateMetadataOfPdf({ title, description, tags: tagsArray, fileUrl });
    } catch (error) {
      console.error("Error updating metadata:", error);
      toast.error("Failed to update metadata");
      return;
    }
  };

  return (
    <>
        {!isUploadMetadataOpen ? (
            <div className="flex flex-col z-10 bg-[#262626] rounded-lg shadow-lg w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[28vw] p-4 sm:p-6 md:p-8 h-auto md:h-[60vh]">
            <div className="text-start mb-4 sm:mb-5 md:mb-6">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 text-white">
                Upload your PDF
                </h1>
                <p className="text-xs sm:text-sm md:text-sm text-white/60">
                Publish your pdf resources for the community. Please ensure the PDF is
                not larger than 10MB.
                </p>
            </div>
            <div className="flex w-full mb-4 sm:mb-5 md:mb-6 p-2 sm:p-2.5 rounded-lg bg-gradient-to-tr from-blue-200 to-indigo-200 relative">
                <div className="mr-2">
                <Info className="text-blue-700 h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-blue-800">
                Your PDF will be first reviewed and then made available to the
                community.
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
        ) : (
            <div className="flex flex-col z-10 bg-[#262626] rounded-lg shadow-lg w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[28vw] p-4 sm:p-6 md:p-8 h-auto md:h-[60vh]">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-white">
                    Resource Metadata
                </h1>
                <p className="text-xs sm:text-sm md:text-sm text-white/60 mb-4">
                    Please provide additional details about your resource.
                </p>
                <form
                    onSubmit={onMetadataSubmitHandler}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-xs sm:text-sm text-white mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Enter resource title"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm text-white mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                            placeholder="Enter resource description"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm text-white mb-1">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            required
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Enter tags for the resource"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-semibold shadow hover:bg-blue-700 transition"
                    >
                        Submit Metadata
                    </button>
                </form>
            </div>
        )}
    </>
    
  );
}
