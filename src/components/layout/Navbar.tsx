"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
            <div className="hidden sm:flex items-center gap-1.5 select-none font-display tracking-tighter">
              <span className="text-2xl font-black text-foreground">Fastit</span>
              <span className="text-lg font-medium text-white/70">Music India</span>
              <span className="text-primary font-black text-2xl -ml-0.5">.</span>
            </div>
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
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 border-2 border-white text-white flex items-center justify-center bg-black hover:scale-105 hover:bg-white hover:text-black transition-all duration-200 active:scale-95 shadow-[2px_2px_0px_0px_#ffc301] cursor-pointer"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 fill-current" />
            ) : (
              <Sun className="w-5 h-5 fill-current" />
            )}
          </button>

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
