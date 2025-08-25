import { Trophy, CheckCircle, XCircle, Clock } from "lucide-react";
import MCQQuestionCard from "./MCQQuestionCard";

interface ExamResultsProps {
    mcqData: {
        question: string;
        options: string[];
        answer: string;
    }[];
    selectedOptions: Map<number, Set<number>>;
    answeredQuestions: Set<number>;
    totalCorrect: number;
    totalQuestions: number;
    answeredCount: number;
}

export default function ExamResults({
    mcqData,
    selectedOptions,
    answeredQuestions,
    totalCorrect,
    totalQuestions,
    answeredCount
}: ExamResultsProps) {
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);
    const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F';

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'text-green-400';
            case 'B': return 'text-blue-400';
            case 'C': return 'text-yellow-400';
            case 'D': return 'text-orange-400';
            case 'F': return 'text-red-400';
            default: return 'text-white';
        }
    };

    const isOptionSelected = (questionIndex: number, optionIndex: number): boolean => {
        return selectedOptions.get(questionIndex)?.has(optionIndex) || false;
    };

    const isQuestionAnswered = (questionIndex: number): boolean => {
        return answeredQuestions.has(questionIndex);
    };

    const isCorrectAnswer = (questionIndex: number, optionIndex: number): boolean => {
        const question = mcqData[questionIndex];
        if (!question || !question.options[optionIndex]) {
            return false;
        }
        
        const correctAnswerLetter = question.answer.trim().toUpperCase();
        const expectedLetter = String.fromCharCode(65 + optionIndex);
        
        return correctAnswerLetter === expectedLetter;
    };

    const handleOptionToggle = () => {
        // no-op during results view
    };

    return (
        <div className="w-full h-full bg-[#0a0a0a] overflow-y-auto">
            <div className="sticky top-0 z-20 bg-[#131313] border-b border-white/20 p-3 sm:p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between mb-4 sm:mb-6 gap-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Exam Results</h1>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Trophy className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white/90" />
                            <span className="text-xl sm:text-xl md:text-2xl font-bold text-white">{grade}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                        <div className="bg-white/5 border border-white/20 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{totalCorrect}</div>
                            <div className="text-xs sm:text-sm text-white/60">Correct</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{totalQuestions - totalCorrect}</div>
                            <div className="text-xs sm:text-sm text-white/60">Wrong</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{answeredCount}</div>
                            <div className="text-xs sm:text-sm text-white/60">Attempted</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-3 sm:p-4 text-center">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 ${getGradeColor(grade)}`}>{percentage}%</div>
                            <div className="text-xs sm:text-sm text-white/60">Score</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* results content */}
            <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Detailed Results</h2>
                    <p className="text-white/70 text-xs sm:text-sm">
                        Review your answers and see the correct solutions for each question.
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {mcqData.map((mcq, questionIndex) => (
                        <div key={questionIndex} className="relative">
                            <MCQQuestionCard
                                mcq={mcq}
                                questionIndex={questionIndex}
                                totalQuestions={mcqData.length}
                                selectedOptions={selectedOptions}
                                answeredQuestions={answeredQuestions}
                                onOptionToggle={handleOptionToggle}
                                isOptionSelected={isOptionSelected}
                                isQuestionAnswered={isQuestionAnswered}
                                isCorrectAnswer={isCorrectAnswer}
                                showAnswers={true}
                            />
                            
                            {/* question result - mobile optimized */}
                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                                {isQuestionAnswered(questionIndex) ? (
                                    isCorrectAnswer(questionIndex, Array.from(selectedOptions.get(questionIndex) || [])[0] || 0) ? (
                                        <div className="flex items-center gap-1 sm:gap-2 bg-green-400/20 border border-green-400/30 rounded-full px-2 sm:px-3 py-1">
                                            <CheckCircle size={14} className="text-green-400 sm:hidden" />
                                            <CheckCircle size={16} className="text-green-400 hidden sm:block" />
                                            <span className="text-green-400 text-xs sm:text-sm font-medium hidden sm:inline">Correct</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 sm:gap-2 bg-red-400/20 border border-red-400/30 rounded-full px-2 sm:px-3 py-1">
                                            <XCircle size={14} className="text-red-400 sm:hidden" />
                                            <XCircle size={16} className="text-red-400 hidden sm:block" />
                                            <span className="text-red-400 text-xs sm:text-sm font-medium hidden sm:inline">Incorrect</span>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center gap-1 sm:gap-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 sm:px-3 py-1">
                                        <Clock size={14} className="text-yellow-400 sm:hidden" />
                                        <Clock size={16} className="text-yellow-400 hidden sm:block" />
                                        <span className="text-yellow-400 text-xs sm:text-sm font-medium hidden sm:inline">Skipped</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* summary - mobile optimized */}
                <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white/5 border border-white/20 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Performance Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Strengths</h4>
                            <ul className="space-y-1 text-xs sm:text-sm text-white/70">
                                <li>• Answered {answeredCount} out of {totalQuestions} questions</li>
                                <li>• Achieved {percentage}% accuracy</li>
                                {percentage >= 70 && <li>• Good understanding of the material</li>}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Areas for Improvement</h4>
                            <ul className="space-y-1 text-xs sm:text-sm text-white/70">
                                {totalQuestions - answeredCount > 0 && <li>• {totalQuestions - answeredCount} questions were skipped</li>}
                                {totalQuestions - totalCorrect > 0 && <li>• {totalQuestions - totalCorrect} incorrect answers</li>}
                                {percentage < 70 && <li>• Consider reviewing the material</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
