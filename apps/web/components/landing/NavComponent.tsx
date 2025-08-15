import { X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center justify-center">
              <Image
                        src="/logo.png"
                        alt="Edwise Logo"
                        width={150}
                        height={150}
                        className="cursor-pointer"
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-sm px-6 py-2 border border-white/12 bg-white/8 rounded-2xl">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4 text-sm">
                <Link href="#contact" className="">Contact</Link>
                <Link href={"sign-up"}>
                  <button className="px-4 py-2 bg-gradient-to-b from-white/40 to-white/8 rounded-lg cursor-pointer">Try it now</button>
                </Link>
            </div>

            {/* mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors">About</a>
              <button className="w-full bg-white/90 hover:white text-black/90 hover:text-black px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    )
}