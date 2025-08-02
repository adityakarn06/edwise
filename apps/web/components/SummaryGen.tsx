"use client";
import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

interface Summary {
    section: string;
    text: string;
}

interface SummaryGenComponentProps {
    currentPdfUrl: string;
    onSummaryGenerated?: (summary: Summary[]) => void;
}

export default function SummaryGenComponent({ currentPdfUrl, onSummaryGenerated }: SummaryGenComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<Summary[]>([]);
    const [showSumnmary, setShowSummary] = useState<boolean>(false);

    const handleGenerateSummary = async () => {
        if (!currentPdfUrl) {
            toast.error("Please select a document first");
            return;
        }

        try {
            setIsLoading(true);

            const { data } = await api.post('/summary', {
                fileUrl: currentPdfUrl,
            });

            if (data.summary && Array.isArray(data.summary)) {
                setSummary(data.summary);
                setShowSummary(true);

                if (onSummaryGenerated) {
                    onSummaryGenerated(data.summary);
                
                toast.success("Summary generated successfully!");
                }
                else {
                    toast.error("Failed to generate summary");
                }
            }
        } catch (error) {
            console.error("Error in SummaryGenComponent:", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleQuestions = () => {
        if (summary.length > 0) {
            setShowSummary(!showSumnmary);
        }
    };

    return (
        <div>
            <button className="px-4 py-2 text-sm text-white/80 border border-white/15 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 hover:border-white/20 hover:text-white/90 transition-color" 
                onClick={handleGenerateSummary} 
                disabled={isLoading}
            >
                {isLoading ? "Generating..." : "Generate Summary"}
            </button>
        </div>
    )
}