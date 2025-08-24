interface ProgressOverviewProps {
    totalQuestions: number;
    answeredQuestions: number;
    showCorrectAnswers: boolean;
}

export default function ProgressOverview({
    totalQuestions,
    answeredQuestions,
    showCorrectAnswers
}: ProgressOverviewProps) {
    return (
        <div className="space-y-6 p-4">
            <div className="bg-none size-[14vw] rounded-full border-12 border-white/20 flex items-center justify-center">
                <h2 className="text-4xl font-medium text-white">
                    {answeredQuestions}/{totalQuestions}
                </h2>
            </div>
            <div className="p-6 bg-[#131313] rounded-lg border border-white/20 w-full">
                <h2 className="text-lg font-medium text-white mb-4">Progress</h2>
                <p className="text-sm text-white/70 mb-2">
                    Total Questions: {totalQuestions}
                </p>
                <p className="text-sm text-white/70 mb-2">
                    Answered Questions: {answeredQuestions}
                </p>
                <p className="text-sm text-white/70">
                    Unanswered Questions: {totalQuestions - answeredQuestions}
                </p>
            </div>
        </div>
    );
}
