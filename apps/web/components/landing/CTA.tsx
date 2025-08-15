import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="pb-10 md:pb-20 pt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-black/90 bg-gradient-to-r from-white/90 to-white/80 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-black/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using Edwise to excel in their academic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/sign-up">
                    <button className="bg-black/90 text-white/90 hover:bg-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2 cursor-pointer hover:scale-105">
                        <span>Get Started Free</span>
                        <ArrowRight className="w-5 h-5" />
                    </button> 
                </Link>
              <p className="text-black/90 text-sm">
                No credit card required • Start learning in seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}