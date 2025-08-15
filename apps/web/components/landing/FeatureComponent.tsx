import { BookOpen, FileText, MessageSquare, Users } from "lucide-react";

export default function FeatureComponent() {
    const features = [
        {
          icon: <MessageSquare className="w-8 h-8" />,
          title: "Chat with PDF",
          description: "Interactive conversations with your study materials. Ask questions and get instant answers from any PDF document."
        },
        {
          icon: <FileText className="w-8 h-8" />,
          title: "MCQ Generator", 
          description: "Automatically generate multiple choice questions from your PDFs to test your knowledge and prepare for exams."
        },
        {
          icon: <BookOpen className="w-8 h-8" />,
          title: "Study Resources",
          description: "Access curated exam resources, study guides, and materials tailored to your academic needs."
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "Student Groups",
          description: "Join focused study groups with like-minded students to collaborate and enhance your learning experience."
        }
      ];
    
    return (
        <section id="features" className="relative overflow-hidden py-20 md:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features for
                <br />
                <span>Smarter Learning</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-b from-white/10 to-black/80 border border-white/12 rounded-2xl p-8 hover:bg-gradient-to-b hover:from-white/15 hover:to-black/90 hover:border-gray-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-white/90 mb-6 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-white group-hover:text-white/90 transition-colors">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}