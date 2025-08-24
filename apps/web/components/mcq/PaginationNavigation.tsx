import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavigationProps {
    currentQuestion: number;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
    isAnswered: boolean;
}

export default function PaginationNavigation({
    currentQuestion,
    totalQuestions,
    onPrevious,
    onNext,
    isAnswered
}: PaginationNavigationProps) {
    return (
        <div className="flex items-center justify-between p-6 border-t border-white/20 bg-[#131313]">
            <button
                onClick={onPrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentQuestion === 0
                        ? "text-white/40 cursor-not-allowed"
                        : "text-white hover:bg-white/10"
                }`}
            >
                <ChevronLeft size={20} />
                Previous
            </button>

            <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">
                    {currentQuestion + 1} of {totalQuestions}
                </span>
            </div>

            <button
                onClick={onNext}
                disabled={currentQuestion === totalQuestions - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentQuestion === totalQuestions - 1
                        ? "text-white/40 cursor-not-allowed"
                        : "text-white hover:bg-white/10"
                }`}
            >
                Next
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
