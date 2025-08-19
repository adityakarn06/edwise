import { BookCheck, BookOpen, BotMessageSquare } from "lucide-react"
import FeatureComponent from "./featureComponent"
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-full p-4 sm:p-6 md:px-[8vw] md:py-8 lg:px-[11vw] bg-black/90 w-full">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <h1 className="text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium p-2 sm:p-4">Welcome to Edwise</h1>
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-lg md:max-w-2xl mb-4 sm:mb-6 md:mb-8 px-2">
              Your AI-powered study companion. Upload PDFs, generate quizzes, and collaborate with peers to maximize your learning potential.
            </p>
          </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4 w-full max-w-7xl">
              <FeatureComponent 
                icon={<BotMessageSquare className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />} 
                heading="Chat with PDF" 
                feature="Upload your PDFs and ask questions to get instant, accurate answers based on the document content." 
                onClickFn={() => router.push("/ask-pdf")}
              />
              <FeatureComponent 
                icon={<BookCheck className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />} 
                heading="MCQ Generator" 
                feature="Automatically create multiple-choice questions from your study materials to test your knowledge."
                onClickFn={() => router.push("/mcq-generator")}
              />
              <FeatureComponent 
                icon={<BookOpen className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />} 
                heading="Study Group" 
                feature="Collaborate with peers in virtual study rooms to share resources, discuss topics, and learn together."
                onClickFn={() => router.push("/community")}
              />
            </div>
        </div>
  )
}

export default Dashboard