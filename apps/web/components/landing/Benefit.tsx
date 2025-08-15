import { GraduationCap, Target, Zap } from "lucide-react";


export default function BenefitComponent() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Leverage advanced AI to personalize your study experience"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Focused Study Sessions", 
      description: "Structured learning paths designed for maximum retention"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Exam Ready",
      description: "Comprehensive preparation tools for academic success"
    }
  ];

    return (
        <section id="how-it-works" className="relative overflow-hidden py-6 md:py-8">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 mb-8">
              <span className="text-sm font-medium text-white/80">How It Works</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-8">
              Three Steps to
              <br />
                Academic Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-24">
            <div className="text-center group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-b from-white/20 to-black/80 border border-white/12 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  1
                </div>
                <h3 className="text-2xl font-medium mb-4 text-white group-hover:text-white/90 transition-colors">Upload Your Materials</h3>
                <p className="text-white/60 group-hover:text-white/70 transition-colors leading-relaxed">
                  Simply upload your PDF documents and let our AI analyze and understand the content.
                </p>
              </div>
            </div>
            
            <div className="text-center group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-b from-white/20 to-black/80 border border-white/12 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  2
                </div>
                <h3 className="text-2xl font-medum mb-4 text-white group-hover:text-white/90 transition-colors">Interactive Learning</h3>
                <p className="text-white/60 group-hover:text-white/70 transition-colors leading-relaxed">
                  Chat with your documents, generate practice questions, and access curated resources.
                </p>
              </div>
            </div>
            
            <div className="text-center group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-b from-white/20 to-black/80 border border-white/12 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  3
                </div>
                <h3 className="text-2xl font-medium mb-4 text-white group-hover:text-white/90 transition-colors">Collaborate & Excel</h3>
                <p className="text-white/60 group-hover:text-white/70 transition-colors leading-relaxed">
                  Join study groups, share insights, and achieve your academic goals together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}