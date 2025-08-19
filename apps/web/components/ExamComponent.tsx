import { useState, useEffect } from "react";
import { CircleCheckBig, Circle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface ExamComponentProps {
    mcqData: {
        question: string;
        options: string[];
        answer: string;
    }[];
}

export default function ExamComponent({ mcqData }: ExamComponentProps) {
    if (!mcqData || mcqData.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full text-white">
                No MCQs available. Please upload a PDF to generate MCQs.
            </div>
        );
    }
    const [selectedOptions, setSelectedOptions] = useState<Map<number, Set<number>>>(
        new Map()
    );
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState<number>(10 * 60); // 10 min in seconds
    const [isOverviwOpen, setIsOverviewOpen] = useState<boolean>(false);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
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
    }

    const getOptionIcon = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);
        const isAnswered = isQuestionAnswered(questionIndex);
        const isCorrect = isCorrectAnswer(questionIndex, optionIndex);

        if (isAnswered && isCorrect) {
            return (
                <CircleCheckBig 
                    size={20} 
                    className="text-green-400" 
                />
            );
        }

        if (isSelected && isAnswered && !isCorrect) {
            return (
                <XCircle 
                    size={20} 
                    className="text-red-400" 
                />
            );
        }

        if (isSelected && !isAnswered) {
            return (
                <CircleCheckBig 
                    size={20} 
                    className="text-blue-400" 
                />
            );
        }

        return (
            <Circle 
                size={20} 
                className="text-white/40 group-hover:text-white/60" 
            />
        );
    };

    const getOptionStyles = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);
        const isAnswered = isQuestionAnswered(questionIndex);
        const isCorrect = isCorrectAnswer(questionIndex, optionIndex);

        if (isAnswered && isCorrect) {
            return "border-green-400/50 bg-green-400/10";
        }

        if (isSelected && isAnswered && !isCorrect) {
            return "border-red-400/50 bg-red-400/10";
        }

        if (isSelected && !isAnswered) {
            return "border-blue-400/50 bg-blue-400/10";
        }

        return "border-white/10 hover:border-white/30 hover:bg-white/5";
    };

    const getOptionTextStyles = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);
        const isAnswered = isQuestionAnswered(questionIndex);
        const isCorrect = isCorrectAnswer(questionIndex, optionIndex);

        if (isAnswered && isCorrect) {
            return "text-green-400 font-medium";
        }

        if (isSelected && isAnswered && !isCorrect) {
            return "text-red-400 font-medium";
        }

        if (isSelected) {
            return "text-white font-medium";
        }

        return "text-white/80";
    };

    return (
        <div className="w-full relative h-full">
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
                        {isOverviwOpen ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOverviewOpen(false)}
                                    className="px-4 py-2 text-md bg-white/90 text-black/90 rounded-lg hover:bg-white cursor-pointer transition-colors"
                                >
                                    Hide Overview
                                </button>
                                <div className="z-50 absolute mt-4 space-y-6 p-4 flex flex-col items-center bg-white/12 border border-white/50 backdrop-blur-md rounded-lg shadow-lg">
                                    <div className="bg-none size-40 rounded-full border-12 border-white/20 flex items-center justify-center">
                                        <h2 className="text-4xl font-medium text-white">
                                            {getTotalCorrectAnswer()}/{mcqData.length}
                                        </h2>
                                    </div>
                                    <div className="p-6 bg-[#131313] rounded-lg border border-white/20 w-full">
                                        <h2 className="text-lg font-medium text-white mb-4">Summary</h2>
                                        <p className="text-sm text-white/70 mb-2">
                                            Total Questions: {mcqData.length}
                                        </p>
                                        <p className="text-sm text-white/70 mb-2">
                                            Answered Questions: {answeredQuestions.size}
                                        </p>
                                        <p className="text-sm text-white/70">
                                            Unanswered Questions: {mcqData.length - answeredQuestions.size}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsOverviewOpen(true)}
                                className="px-4 py-2 text-md text-white/90 border border-white/90 rounded-lg hover:bg-white/80 hover:text-black/80 cursor-pointer transition-colors"
                            >
                                Show Overview
                            </button>
                        )}
                    </div>
                    
                    <button
                        onClick={() => toast.success("This button has no purpose buddy!")}
                        className="px-8 py-2 text-md bg-white/90 text-black/90 rounded-lg hover:bg-[#E63838] hover:text-white cursor-pointer transition-colors">
                        Submit
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-4 p-6 col-span-2">
                    {mcqData.map((mcq, questionIndex) => (
                        <div 
                            key={questionIndex} 
                            className="p-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm"
                        >
                            <h3 className="text-sm font-normal text-white mb-4">
                                Question {questionIndex + 1} of {mcqData.length}
                            </h3>

                            <h1 className="text-lg font-medium text-white mb-4 word-wrap">
                                {mcq.question}
                            </h1>
                            
                            <div className="space-y-3 mb-4">
                                {mcq.options.map((option, optionIndex) => (
                                    <button
                                        key={optionIndex}
                                        onClick={() => handleOptionToggle(questionIndex, optionIndex)}
                                        className={`flex items-center w-full p-3 text-left rounded-lg border transition-all duration-200 group ${getOptionStyles(questionIndex, optionIndex)}`}
                                    >
                                        <div className="flex-shrink-0 mr-3">
                                            {getOptionIcon(questionIndex, optionIndex)}
                                        </div>
                                        <span className={`text-sm ${getOptionTextStyles(questionIndex, optionIndex)} word-wrap`}>
                                            {String.fromCharCode(65 + optionIndex)}. {option}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            
                            {isQuestionAnswered(questionIndex) && (
                                <div className="pt-3 border-t border-white/10">
                                    <p className="text-green-400 text-sm font-medium">
                                        Correct Answer: {mcq.answer}
                                    </p>
                                </div>
                            )}
                    </div>
                    ))}
                </div>
                <div className="mt-18 space-y-6 p-4 mr-4 flex-col items-center h-full hidden sm:flex">
                    <div className="bg-none size-[14vw] rounded-full border-12 border-white/20 flex items-center justify-center">
                        <h2 className="text-4xl font-medium text-white">
                            {getTotalCorrectAnswer()}/{mcqData.length}
                        </h2>
                    </div>
                    <div className="p-6 bg-[#131313] rounded-lg border border-white/20 w-full">
                        <h2 className="text-lg font-medium text-white mb-4">Summary</h2>
                        <p className="text-sm text-white/70 mb-2">
                            Total Questions: {mcqData.length}
                        </p>
                        <p className="text-sm text-white/70 mb-2">
                            Answered Questions: {answeredQuestions.size}
                        </p>
                        <p className="text-sm text-white/70">
                            Unanswered Questions: {mcqData.length - answeredQuestions.size}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}