import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import toast from "react-hot-toast";
import MCQQuestionCard from "./mcq/MCQQuestionCard";
import PaginationNavigation from "./mcq/PaginationNavigation";
import ProgressOverview from "./mcq/ProgressOverview";
import ExamResults from "./mcq/ExamResults";

interface ExamComponentProps {
    mcqData: {
        question: string;
        options: string[];
        answer: string;
    }[];
}

export default function ExamComponent({ mcqData }: ExamComponentProps) {
    const [selectedOptions, setSelectedOptions] = useState<Map<number, Set<number>>>(
        new Map()
    );
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState<number>(10 * 60); // 10 min in seconds
    const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
    
    if (!mcqData || mcqData.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full text-white">
                No MCQs available. Please upload a PDF to generate MCQs.
            </div>
        );
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    handleSubmitExam();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);
    
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionToggle = (questionIndex: number, optionIndex: number) => {
        setSelectedOptions(prev => {
            const newMap = new Map(prev);
            const questionSelections = newMap.get(questionIndex) || new Set<number>();
            
            if (questionSelections.has(optionIndex)) {
                questionSelections.delete(optionIndex);
            } else {
                questionSelections.add(optionIndex);
            }
            
            newMap.set(questionIndex, questionSelections);
            return newMap;
        });

        setAnsweredQuestions(prev => new Set([...prev, questionIndex]));
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

    const getTotalCorrectAnswer = () => {
        let correctCount = 0;
        answeredQuestions.forEach(questionIndex => {
            const question = mcqData[questionIndex];
            if (question) {
                const correctAnswerLetter = question.answer.trim().toUpperCase();
                const selectedOptionsSet = selectedOptions.get(questionIndex);
                if (selectedOptionsSet && selectedOptionsSet.size === 1) {
                    const selectedOptionArray = Array.from(selectedOptionsSet);
                    if (selectedOptionArray.length > 0) {
                        const selectedOptionIndex = selectedOptionArray[0];
                        if (selectedOptionIndex !== undefined) {
                            const expectedLetter = String.fromCharCode(65 + selectedOptionIndex);
                            if (correctAnswerLetter === expectedLetter) {
                                correctCount++;
                            }
                        }
                    }
                }
            }
        });
        return correctCount;
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < mcqData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmitExam = () => {
        setIsExamSubmitted(true);
        toast.success("Exam submitted successfully!");
    };

    const currentQuestion = mcqData[currentQuestionIndex];
    const isCurrentQuestionAnswered = isQuestionAnswered(currentQuestionIndex);

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center w-full h-full text-white">
                Question not found. Please try again.
            </div>
        );
    }

    if (isExamSubmitted) {
        return (
            <ExamResults
                mcqData={mcqData}
                selectedOptions={selectedOptions}
                answeredQuestions={answeredQuestions}
                totalCorrect={getTotalCorrectAnswer()}
                totalQuestions={mcqData.length}
                answeredCount={answeredQuestions.size}
            />
        );
    }

    return (
        <div className="w-full relative h-full flex flex-col">
            <div className="flex items-center justify-between p-6 z-10 bg-[#131313]">
                <div className="flex items-center justify-between">
                    <div className="pr-4">
                        <Clock className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-white/40">Time remaining</p>
                        <p className="text-md text-white/90">{formatTime(timeRemaining)}</p>    
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex md:hidden">
                        {isOverviewOpen ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOverviewOpen(false)}
                                    className="px-4 py-2 text-md bg-white/90 text-black/90 rounded-lg hover:bg-white cursor-pointer transition-colors"
                                >
                                    Hide
                                </button>
                                <div className="z-50 absolute mt-4 space-y-6 p-4 flex flex-col items-center bg-white/12 border border-white/50 backdrop-blur-md rounded-lg shadow-lg">
                                    <ProgressOverview 
                                        totalQuestions={mcqData.length}
                                        answeredQuestions={answeredQuestions.size}
                                    />
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsOverviewOpen(true)}
                                className="px-4 py-2 text-md text-white/80 border-1 border-white/60 hover:border-white/80 rounded-lg cursor-pointer transition-colors"
                            >
                                Overview
                            </button>
                        )}
                    </div>
                    
                    <button
                        onClick={handleSubmitExam}
                        className="px-8 py-2 text-md bg-white/90 text-black/90 rounded-lg hover:bg-[#E63838] hover:text-white cursor-pointer transition-colors">
                        Submit Exam
                    </button>
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="flex-1 p-6">
                    <MCQQuestionCard
                        mcq={currentQuestion}
                        questionIndex={currentQuestionIndex}
                        totalQuestions={mcqData.length}
                        selectedOptions={selectedOptions}
                        answeredQuestions={answeredQuestions}
                        onOptionToggle={handleOptionToggle}
                        isOptionSelected={isOptionSelected}
                        isQuestionAnswered={isQuestionAnswered}
                        isCorrectAnswer={isCorrectAnswer}
                        showAnswers={false}
                    />
                </div>

                <div className="hidden md:block w-[30%] mx-[2vw] px-4">
                    <ProgressOverview 
                        totalQuestions={mcqData.length}
                        answeredQuestions={answeredQuestions.size}
                    />
                </div>
            </div>

            <PaginationNavigation
                currentQuestion={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                totalQuestions={mcqData.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isAnswered={isCurrentQuestionAnswered}
            />
        </div>
    );
}