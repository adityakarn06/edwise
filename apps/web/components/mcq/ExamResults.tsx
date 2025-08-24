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
            <div className="sticky top-0 z-20 bg-[#131313] border-b border-white/20 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-white">Exam Results</h1>
                        <div className="flex items-center gap-3">
                            <Trophy className="h-8 w-8 text-yellow-400" />
                            <span className="text-2xl font-bold text-white">{grade}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{totalCorrect}</div>
                            <div className="text-sm text-white/60">Correct Answers</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{totalQuestions - totalCorrect}</div>
                            <div className="text-sm text-white/60">Wrong Answers</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{answeredCount}</div>
                            <div className="text-sm text-white/60">Questions Attempted</div>
                        </div>
                        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
                            <div className={`text-2xl font-bold mb-1 ${getGradeColor(grade)}`}>{percentage}%</div>
                            <div className="text-sm text-white/60">Score</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* results content */}
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Detailed Results</h2>
                    <p className="text-white/70 text-sm">
                        Review your answers and see the correct solutions for each question.
                    </p>
                </div>

                <div className="space-y-6">
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
                            
                            {/* question result */}
                            <div className="absolute top-4 right-4">
                                {isQuestionAnswered(questionIndex) ? (
                                    isCorrectAnswer(questionIndex, Array.from(selectedOptions.get(questionIndex) || [])[0] || 0) ? (
                                        <div className="flex items-center gap-2 bg-green-400/20 border border-green-400/30 rounded-full px-3 py-1">
                                            <CheckCircle size={16} className="text-green-400" />
                                            <span className="text-green-400 text-sm font-medium">Correct</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 bg-red-400/20 border border-red-400/30 rounded-full px-3 py-1">
                                            <XCircle size={16} className="text-red-400" />
                                            <span className="text-red-400 text-sm font-medium">Incorrect</span>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-3 py-1">
                                        <Clock size={16} className="text-yellow-400" />
                                        <span className="text-yellow-400 text-sm font-medium">Skipped</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* summary */}
                <div className="mt-12 p-6 bg-white/5 border border-white/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-white font-medium mb-2">Strengths</h4>
                            <ul className="space-y-1 text-sm text-white/70">
                                <li>• Answered {answeredCount} out of {totalQuestions} questions</li>
                                <li>• Achieved {percentage}% accuracy</li>
                                {percentage >= 70 && <li>• Good understanding of the material</li>}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-2">Areas for Improvement</h4>
                            <ul className="space-y-1 text-sm text-white/70">
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
