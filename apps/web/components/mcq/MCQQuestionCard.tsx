import { CircleCheckBig, Circle, XCircle } from "lucide-react";

interface MCQQuestionCardProps {
    mcq: { question: string; options: string[]; answer: string };
    questionIndex: number;
    totalQuestions: number;
    selectedOptions: Map<number, Set<number>>;
    answeredQuestions: Set<number>;
    onOptionToggle: (questionIndex: number, optionIndex: number) => void;
    isOptionSelected: (questionIndex: number, optionIndex: number) => boolean;
    isQuestionAnswered: (questionIndex: number) => boolean;
    isCorrectAnswer: (questionIndex: number, optionIndex: number) => boolean;
    showAnswers: boolean;
}

export default function MCQQuestionCard({
    mcq,
    questionIndex,
    totalQuestions,
    selectedOptions,
    answeredQuestions,
    onOptionToggle,
    isOptionSelected,
    isQuestionAnswered,
    isCorrectAnswer,
    showAnswers
}: MCQQuestionCardProps) {
    const getOptionIcon = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);
        const isAnswered = isQuestionAnswered(questionIndex);

        if (showAnswers) {
            const isCorrect = isCorrectAnswer(questionIndex, optionIndex);
            
            if (isCorrect) {
                return <CircleCheckBig size={20} className="text-green-400" />;
            }

            if (isSelected && !isCorrect) {
                return <XCircle size={20} className="text-red-400" />;
            }
        }

        if (isSelected) {
            return <CircleCheckBig size={20} className="text-blue-400" />;
        }

        return <Circle size={20} className="text-white/40 group-hover:text-white/60" />;
    };

    const getOptionStyles = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);
        const isAnswered = isQuestionAnswered(questionIndex);

        if (showAnswers) {
            const isCorrect = isCorrectAnswer(questionIndex, optionIndex);
            
            if (isCorrect) {
                return "border-green-400/50 bg-green-400/10";
            }

            if (isSelected && !isCorrect) {
                return "border-red-400/50 bg-red-400/10";
            }
        }

        if (isSelected) {
            return "border-blue-400/50 bg-blue-400/10";
        }

        return "border-white/10 hover:border-white/30 hover:bg-white/5";
    };

    const getOptionTextStyles = (questionIndex: number, optionIndex: number) => {
        const isSelected = isOptionSelected(questionIndex, optionIndex);

        if (showAnswers) {
            const isCorrect = isCorrectAnswer(questionIndex, optionIndex);
            
            if (isCorrect) {
                return "text-green-400 font-medium";
            }

            if (isSelected && !isCorrect) {
                return "text-red-400 font-medium";
            }
        }

        if (isSelected) {
            return "text-white font-medium";
        }

        return "text-white/80";
    };

    return (
        <div className="p-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
            <h3 className="text-sm font-normal text-white mb-4">
                Question {questionIndex + 1} of {totalQuestions}
            </h3>

            <h1 className="text-lg font-medium text-white mb-4 word-wrap">
                {mcq.question}
            </h1>
            
            <div className="space-y-3 mb-4">
                {mcq.options.map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        onClick={() => onOptionToggle(questionIndex, optionIndex)}
                        className={`flex items-center w-full p-3 text-left rounded-lg border transition-all duration-200 group cursor-pointer ${getOptionStyles(questionIndex, optionIndex)}`}
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
            
            {showAnswers && (
                <div className="pt-3 border-t border-white/10">
                    <p className="text-green-400 text-sm font-medium">
                        Correct Answer: {mcq.answer}
                    </p>
                </div>
            )}
        </div>
    );
}
