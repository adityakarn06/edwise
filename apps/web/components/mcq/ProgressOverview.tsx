import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressOverviewProps {
    totalQuestions: number;
    answeredQuestions: number;
}

export default function ProgressOverview({
    totalQuestions,
    answeredQuestions,
}: ProgressOverviewProps) {
    return (
        <div className="p-4 flex flex-col items-center gap-6">
            <div className='bg-transparent size-[20vw] md:size-[14vw]'>
                <CircularProgressbar minValue={1} maxValue={totalQuestions} value={answeredQuestions} text={`${answeredQuestions}/${totalQuestions}`} 
                strokeWidth={6}
                styles={buildStyles({
                    // pathColor: `#22c55e`,
                    textColor: '#ffffff',
                })} />;    
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
