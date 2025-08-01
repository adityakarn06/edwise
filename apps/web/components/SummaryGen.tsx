"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SummaryGenComponent() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = () => {
        try {
            setIsLoading(true);
            const intervalId = setInterval(() => {
                console.log("Generating summary...");
                // Simulate summary generation
                // In a real application, you would call an API or perform some logic here
            }, 1000);
            toast.error("This feature is under development. Stay tuned for updates!");
            
            // Clear interval after some time (e.g., 5 seconds)
            setTimeout(() => {
                clearInterval(intervalId);
                setIsLoading(false);
            }, 5000);
        } catch (error) {
            console.error("Error in SummaryGenComponent:", error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button className="px-4 py-2 text-sm text-white/80 border border-white/15 bg-white/10 rounded-lg cursor-pointer hover:bg-white/15 hover:border-white/20 hover:text-white/90 transition-color" onClick={handleGenerateSummary} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Summary"}
            </button>
        </div>
    )
}