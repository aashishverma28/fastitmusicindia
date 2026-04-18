"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-surface/70 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-[0_10px_40px_-15px_rgba(255,136,182,0.06)]">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="relative flex items-center gap-2"
          >
            <div className="relative w-12 h-12">
              <Image 
                src="/logo.jpg" 
                alt="Fastit Music India" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline-block text-xl font-black italic bg-gradient-to-r from-[#ffd709] to-[#ff88b6] bg-clip-text text-transparent font-display tracking-tighter">
              Fastit Music India
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-display tracking-tighter transition-all duration-300" href="/">
              Home
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:glow-primary hover:scale-105" href="/about">
              About
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:glow-primary hover:scale-105" href="/services">
              Services
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:glow-primary hover:scale-105" href="/artists">
              Artists
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:glow-primary hover:scale-105" href="/releases">
              Releases
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/apply" 
            className="btn-gradient px-6 py-2 rounded-full font-bold hover:scale-105 transition-all active:scale-95 duration-300"
          >
            Apply Now
          </Link>
          <Link 
            href="/login" 
            className="text-white/70 hover:text-white font-bold transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
