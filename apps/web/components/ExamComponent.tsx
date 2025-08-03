import { useState } from "react";
import { CircleCheckBig, Circle, XCircle } from "lucide-react";

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
        <div className="w-full space-y-6">
            {mcqData.map((mcq, questionIndex) => (
                <div 
                    key={questionIndex} 
                    className="p-6 border border-white/20 rounded-lg bg-gray-900/50 backdrop-blur-sm"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Question {questionIndex + 1}: {mcq.question}
                    </h2>
                    
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
                                <span className={`text-sm ${getOptionTextStyles(questionIndex, optionIndex)}`}>
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
    );
}