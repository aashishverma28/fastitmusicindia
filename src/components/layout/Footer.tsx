"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-[#080809] w-full relative overflow-visible border-t-3 border-white">
      {/* Top stripes line divider */}
      <div className="h-2 w-full pop-stripes border-b-2 border-white" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 px-12 py-20 w-full max-w-[1920px] mx-auto">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 border border-white/20 p-0.5 bg-black">
              <Image 
                src={theme === "light" ? "/logo-light.png" : "/logo.png"} 
                alt="Fastit Music India" 
                fill 
                className="object-contain p-0.5" 
              />
            </div>
            <div className="flex items-center gap-1.5 select-none font-display tracking-tighter">
              <span className="text-xl font-black text-foreground">Fastit</span>
              <span className="text-base font-medium text-white/70">Music India</span>
              <span className="text-primary font-black text-xl -ml-0.5">.</span>
            </div>
          </Link>
          <p className="text-white/60 leading-relaxed font-sans font-medium text-sm">
            The sonic heartbeat of India&apos;s independent music movement. We don&apos;t just distribute; we accelerate careers.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs">Distribution</h4>
          <nav className="flex flex-col gap-3">
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/artists">Artists</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/labels">Labels</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/pricing">Pricing</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/services">Services</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs">Company</h4>
          <nav className="flex flex-col gap-3">
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/about">About Us</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/career">Careers</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/privacy">Privacy Policy</Link>
            <Link className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" href="/terms">Terms of Service</Link>
            <span className="text-white/40 font-semibold text-sm">Office: Assam, India</span>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs">Useful Links</h4>
          <nav className="flex flex-col gap-3">
            <a 
              className="text-white/50 hover:text-secondary transition-colors hover:translate-x-1 font-semibold text-sm" 
              href="https://smartlink.fastitmusic.in/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Smartlink
            </a>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-widest text-xs">Connect</h4>
          <div className="flex gap-6">
            <a href="https://instagram.com/fastitmusicindia" target="_blank" className="text-white/50 hover:text-primary transition-colors font-bold text-sm">Instagram</a>
            <a href="https://x.com/fastitmusicind" target="_blank" className="text-white/50 hover:text-primary transition-colors font-bold text-sm">X</a>
            <a href="https://www.youtube.com/@FastitMusicIndia?sub_confirmation=1" target="_blank" className="text-white/50 hover:text-red-500 transition-colors font-bold text-sm">YouTube</a>
          </div>
          <div className="mt-8">
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Newsletter 
              <span className="font-handwriting text-primary text-lg lowercase tracking-normal font-normal ml-2 inline-block rotate-2">
                * strictly zero spam!
              </span>
            </p>
            <div className="flex bg-black border-2 border-white rounded-none p-1 shadow-[3px_3px_0px_0px_#00b0fc]">
              <input 
                suppressHydrationWarning
                className="bg-transparent border-none focus:ring-0 text-white px-4 w-full text-xs outline-none font-sans font-semibold" 
                placeholder="Your email" 
                type="email"
              />
              <button 
                suppressHydrationWarning
                className="btn-neubrutalist px-5 py-2 rounded-none font-bold text-xs shadow-none border-none hover:scale-100"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1920px] mx-auto">
        <p className="text-white/50 text-xs font-medium">© 2026 Fastit Music India. All Rights Reserved.</p>
        <p className="text-white/40 text-xs font-medium">Made with <span className="text-red-500">❤️</span> by Fastit Group Solutions Pvt.Ltd</p>
        <div className="flex gap-8 items-center">
          <Link className="text-primary text-xs font-black uppercase tracking-wider" href="/login">Artist Portal</Link>
          <Link className="text-white/40 text-xs font-semibold" href="/support">Support Center</Link>
        </div>
      </div>
    </footer>
  );
}
