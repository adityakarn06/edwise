import { ArrowRight, Brain } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
        <div className="absolute"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Transform Your Learning
              <br />
              <span>
                with AI Intelligence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Revolutionize your study experience with interactive PDF conversations, automated question generation, and virtual library.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/sign-up">
                    <button className="group text-black bg-gradient-to-b from-white via-white/90 to-white/30 hover:bg-blue-700 cursor-pointer px-8 py-4 rounded-lg font-medium text-md transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>  
                </Link>
                <Link href="/video-demo">
                    <button className="border-2 border-white/12 bg-gradient-to-b from-white/10 to-black/80 hover:border-gray-500 px-8 py-4 rounded-lg font-medium text-md transition-colors cursor-pointer">
                        Watch Demo
                    </button>
                </Link>
              
            </div>
          </div>
        </div>
      </section>
    )
}