"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-[#080809] border-b-2 border-white/10 docked full-width top-0 sticky z-50 shadow-[0_10px_40px_-15px_rgba(240,10,136,0.08)] relative overflow-visible">
      {/* Pop stripes line at the very top */}
      <div className="h-1 w-full pop-stripes absolute top-0 left-0 z-30" />

      <nav className="flex justify-between items-center w-full px-8 py-4.5 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="relative flex items-center gap-3.5"
          >
            <div className="relative w-11 h-11 border-2 border-white p-1 bg-black shadow-[2px_2px_0px_0px_#f00a88]">
              <Image 
                src="/logo.png" 
                alt="Fastit Music India" 
                fill 
                className="object-contain p-0.5"
              />
            </div>
            <span className="hidden sm:inline-block text-xl font-black italic bg-gradient-to-r from-[#ffc301] to-[#f00a88] bg-clip-text text-transparent font-display tracking-tighter">
              Fastit Music India
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-display tracking-tighter transition-all duration-300" href="/">
              Home
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:scale-105" href="/about">
              About
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:scale-105" href="/services">
              Services
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:scale-105" href="/artists">
              Artists
            </Link>
            <Link className="text-white/70 hover:text-white transition-colors font-display tracking-tighter hover:scale-105" href="/releases">
              Releases
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6 relative">
          <div className="hidden lg:block absolute left-[-100px] top-[32px] rotate-[-6deg] select-none pointer-events-none">
            <span className="font-handwriting text-secondary text-lg">* 90% payout</span>
          </div>
          <Link 
            href="/apply" 
            className="btn-neubrutalist px-5 py-2 rounded-none font-bold hover:scale-105 transition-all active:scale-95 duration-300 text-sm"
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
