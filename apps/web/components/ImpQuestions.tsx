"use client";
import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

interface ImportantQuestion {
    question: string;
    answer: string;
}

interface GenImpQuesComponentProps {
    currentPdfUrl: string;
    onQuestionsGenerated?: (questions: ImportantQuestion[]) => void;
}

export default function GenImpQuesComponent({ 
    currentPdfUrl, 
    onQuestionsGenerated 
}: GenImpQuesComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [impQues, setImpQues] = useState<ImportantQuestion[]>([]);
    const [showQuestions, setShowQuestions] = useState(false);

    const handleImpQuesGen = async () => {
        if (!currentPdfUrl) {
            toast.error("Please select a document first");
            return;
        }

        try {
            setIsLoading(true);
            
            const { data } = await api.post(`/imp-ques`, {
                fileUrl: currentPdfUrl,
            });
            
            if (data.importantQuestions && Array.isArray(data.importantQuestions)) {
                setImpQues(data.importantQuestions);
                setShowQuestions(true);
                
                // Pass the questions to the parent component if callback exists
                if (onQuestionsGenerated) {
                    onQuestionsGenerated(data.importantQuestions);
                }
                
                toast.success("Important questions generated successfully!");
            } else {
                toast.error("Failed to generate important questions");
            }
        } catch (error) {
            console.error("Error in ImpQues generation:", error);
            toast.error("Failed to generate important questions");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleQuestions = () => {
        if (impQues.length > 0) {
            setShowQuestions(!showQuestions);
        }
    };

    return (
        <div className="w-full">
            <button 
                className="px-4 py-2 text-sm text-white/80 border border-white/15 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 hover:border-white/20 hover:text-white/90 transition-color" 
                onClick={handleImpQuesGen} 
                disabled={isLoading}
            >
                {isLoading ? "Creating..." : "Important Questions"}
            </button>
            
        </div>
    );
}