import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavigationProps {
    currentQuestion: number;
    setCurrentQuestionIndex: (index: number) => void;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
    isAnswered: boolean;
}

export default function PaginationNavigation({
    currentQuestion,
    setCurrentQuestionIndex,
    totalQuestions,
    onPrevious,
    onNext,
    isAnswered
}: PaginationNavigationProps) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;
        
        if (totalQuestions <= maxVisiblePages) {
            for (let i = 0; i < totalQuestions; i++) {
                pages.push(i);
            }
        } else {
            if (currentQuestion < 3) {
                // start:- show first 5 pages + last page
                for (let i = 0; i < 5; i++) {
                    pages.push(i);
                }
                pages.push(-1); // separator
                pages.push(totalQuestions - 1);
            } else if (currentQuestion > totalQuestions - 4) {
                // near end:- show first page + last 5 pages
                pages.push(0);
                pages.push(-1); // separator
                for (let i = totalQuestions - 5; i < totalQuestions; i++) {
                    pages.push(i);
                }
            } else {
                // middle:- show first + current ±1 + last
                pages.push(0);
                pages.push(-1); // separator
                for (let i = currentQuestion - 1; i <= currentQuestion + 1; i++) {
                    pages.push(i);
                }
                pages.push(-1); // separator
                pages.push(totalQuestions - 1);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="w-full flex items-center justify-center py-6 px-6 border-t border-white/20 bg-[#131313]">
            <div className="w-full flex items-center gap-4">
                <button
                    onClick={onPrevious}
                    disabled={currentQuestion === 0}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 ${
                        currentQuestion === 0
                            ? "text-white/90 border-1 border-white/70 cursor-not-allowed"
                            : "text-white/90 hover:bg-white/90 hover:text-black/90 border-1 border-white/70 cursor-pointer"
                    }`}
                >
                    <ChevronLeft size={16} />
                    Prev
                </button>

                <div className="hidden md:flex items-center gap-4">
                    {pageNumbers.map((pageNum, index) => (
                        <div key={index}>
                            {pageNum === -1 ? (
                                // Separator
                                <span className="px-2 text-gray-400">...</span>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex(pageNum)}
                                    className={`w-12 h-12 rounded-lg transition-all duration-200 text-sm ${
                                        pageNum === currentQuestion
                                            ? "bg-white/90 text-black/90 cursor-pointer"
                                            : "text-white/90 hover:bg-white/60 hover:text-black/90 border border-white/30 cursor-pointer"
                                    }`}
                                >
                                    {pageNum + 1}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={onNext}
                    disabled={currentQuestion === totalQuestions - 1}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 ${
                        currentQuestion === totalQuestions - 1
                            ? "text-white/90 border-1 border-white/70 cursor-not-allowed"
                            : "text-white/90 hover:bg-white/90 hover:text-black/90 border-1 border-white/70 cursor-pointer"
                    }`}
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
