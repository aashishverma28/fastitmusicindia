"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [baseDomain, setBaseDomain] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname.startsWith("career.")) {
        // We are on the subdomain. Point links to main domain.
        const hostWithoutSubdomain = window.location.host.replace(/^career\./, "");
        setBaseDomain(window.location.host.includes("localhost") ? `http://${hostWithoutSubdomain}` : "https://fastitmusic.in");
      }
    }
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname ? pathname.startsWith(href) : false;
  };

  return (
    <header className="bg-[#080809] border-b-2 border-white/10 docked full-width top-0 sticky z-50 shadow-[0_10px_40px_-15px_rgba(240,10,136,0.08)] relative overflow-visible">
      {/* Pop stripes line at the very top */}
      <div className="h-1 w-full pop-stripes absolute top-0 left-0 z-30" />

      <nav className="flex justify-between items-center w-full px-8 py-4.5 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <Link 
            href={baseDomain ? `${baseDomain}/` : "/"} 
            className="relative flex items-center gap-3.5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative w-11 h-11 border-2 border-white p-1 bg-black shadow-[2px_2px_0px_0px_#f00a88]">
              <Image 
                src={theme === "light" ? "/logo-light.png" : "/logo.png"} 
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
            <Link 
              className={`font-display tracking-tighter transition-all duration-300 border-b-2 pb-1 ${
                isActive("/") 
                  ? "text-primary font-bold border-primary" 
                  : "text-white/70 hover:text-white border-transparent hover:scale-105"
              }`} 
              href={baseDomain ? `${baseDomain}/` : "/"}
            >
              Home
            </Link>
            <Link 
              className={`font-display tracking-tighter transition-all duration-300 border-b-2 pb-1 ${
                isActive("/about") 
                  ? "text-primary font-bold border-primary" 
                  : "text-white/70 hover:text-white border-transparent hover:scale-105"
              }`} 
              href={baseDomain ? `${baseDomain}/about` : "/about"}
            >
              About
            </Link>
            <Link 
              className={`font-display tracking-tighter transition-all duration-300 border-b-2 pb-1 ${
                isActive("/services") 
                  ? "text-primary font-bold border-primary" 
                  : "text-white/70 hover:text-white border-transparent hover:scale-105"
              }`} 
              href={baseDomain ? `${baseDomain}/services` : "/services"}
            >
              Services
            </Link>
            <Link 
              className={`font-display tracking-tighter transition-all duration-300 border-b-2 pb-1 ${
                isActive("/artists") 
                  ? "text-primary font-bold border-primary" 
                  : "text-white/70 hover:text-white border-transparent hover:scale-105"
              }`} 
              href={baseDomain ? `${baseDomain}/artists` : "/artists"}
            >
              Artists
            </Link>
            <Link 
              className={`font-display tracking-tighter transition-all duration-300 border-b-2 pb-1 ${
                isActive("/releases") 
                  ? "text-primary font-bold border-primary" 
                  : "text-white/70 hover:text-white border-transparent hover:scale-105"
              }`} 
              href={baseDomain ? `${baseDomain}/releases` : "/releases"}
            >
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
            href={baseDomain ? `${baseDomain}/apply` : "/apply"} 
            className="hidden md:inline-block btn-neubrutalist px-5 py-2 rounded-none font-bold hover:scale-105 transition-all active:scale-95 duration-300 text-sm"
          >
            Apply Now
          </Link>
          <Link 
            href={baseDomain ? `${baseDomain}/login` : "/login"} 
            className="hidden md:inline-block text-white/70 hover:text-white font-bold transition-colors"
          >
            Login
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 border-2 border-white text-white flex items-center justify-center bg-black hover:scale-105 hover:bg-white hover:text-black transition-all duration-200 active:scale-95 shadow-[2px_2px_0px_0px_#f00a88] cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%-2px)] left-0 w-full bg-[#080809] border-b-2 border-white/20 px-8 py-8 flex flex-col gap-6 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-x-2 border-white/10">
          <Link 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-display text-xl transition-all ${
              isActive("/") ? "text-primary font-black" : "text-white/70 hover:text-white"
            }`}
            href={baseDomain ? `${baseDomain}/` : "/"}
          >
            Home
          </Link>
          <Link 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-display text-xl transition-all ${
              isActive("/about") ? "text-primary font-black" : "text-white/70 hover:text-white"
            }`}
            href={baseDomain ? `${baseDomain}/about` : "/about"}
          >
            About
          </Link>
          <Link 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-display text-xl transition-all ${
              isActive("/services") ? "text-primary font-black" : "text-white/70 hover:text-white"
            }`}
            href={baseDomain ? `${baseDomain}/services` : "/services"}
          >
            Services
          </Link>
          <Link 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-display text-xl transition-all ${
              isActive("/artists") ? "text-primary font-black" : "text-white/70 hover:text-white"
            }`}
            href={baseDomain ? `${baseDomain}/artists` : "/artists"}
          >
            Artists
          </Link>
          <Link 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-display text-xl transition-all ${
              isActive("/releases") ? "text-primary font-black" : "text-white/70 hover:text-white"
            }`}
            href={baseDomain ? `${baseDomain}/releases` : "/releases"}
          >
            Releases
          </Link>
          
          <hr className="border-white/10" />
          
          <div className="flex flex-col gap-4">
            <Link 
              onClick={() => setIsMobileMenuOpen(false)}
              href={baseDomain ? `${baseDomain}/login` : "/login"} 
              className="w-full text-center text-white/70 hover:text-white font-bold py-3 transition-colors border border-white/10"
            >
              Login
            </Link>
            <Link 
              onClick={() => setIsMobileMenuOpen(false)}
              href={baseDomain ? `${baseDomain}/apply` : "/apply"} 
              className="w-full text-center btn-neubrutalist py-3 rounded-none font-bold block"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
