"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingParticle {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

// Self-contained high-performance SVG icons (immune to OneDrive file-locking issues)
const IconHome = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconHeadphones = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const IconRotate = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const IconZap = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GENZ_ROASTS = [
  {
    title: "AUDIO ENGINEER IS COOKED 💀",
    desc: "Bro literally exported silence at 24-bit 96kHz and called it ambient experimental indie.",
    badge: "STUDIO TRAUMA",
    color: "#f00a88"
  },
  {
    title: "GHOSTED HARDER THAN YOUR DMs 👻",
    desc: "This URL vanished faster than your Spotify blend invite after you played one phonk track.",
    badge: "LOST IN THE MIX",
    color: "#00b0fc"
  },
  {
    title: "808s CLIPPING IN THE BACKROOMS 🔊",
    desc: "The producer fell asleep on the bass glide button. This page got pushed out of the physical realm.",
    badge: "BASS OVERLOAD",
    color: "#ffc301"
  },
  {
    title: "DELETED AT 3:00 AM BY THE ARTIST 🌙",
    desc: "The singer had an existential crisis, saw their ex liked the snippet, and wiped the master file.",
    badge: "MIDNIGHT REGRET",
    color: "#a855f7"
  },
  {
    title: "NOT THE 404 RIZZ IN 4K 👀",
    desc: "Even Autotune, 12 Soundtoys plugins, and a verified badge couldn't fix this broken link no cap 🧢❌.",
    badge: "NEGATIVE AURA",
    color: "#ef4444"
  },
  {
    title: "CASSETTE TAPE TANGLED 📼",
    desc: "The algorithmic tape deck chewed up the magnetic ribbon. Please insert a Natraj pencil to rewind.",
    badge: "ANALOG DISASTER",
    color: "#10b981"
  }
];

const FUNNY_POPUPS = [
  "-50,000 AURA 📉",
  "BRO STOP 😭",
  "IT'S GIVING 404 ✨",
  "+1,000 RIZZ",
  "BOMBASTIC SIDE EYE 👀",
  "COOKED FR FR 🍳",
  "NO CAP 🧢",
  "808 CLIPPING 🔊",
  "-100K AURA 💀"
];

export default function NotFound() {
  const [roastIndex, setRoastIndex] = useState(0);
  const [aura, setAura] = useState(-100000);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  const activeRoast = GENZ_ROASTS[roastIndex];

  // Auto-cycle roasts slowly every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoastIndex((prev) => (prev + 1) % GENZ_ROASTS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleScratchVinyl = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsScratching(true);
    setScratchCount((prev) => prev + 1);
    
    // Random aura delta
    const delta = Math.floor(Math.random() * 40000) + 10000;
    setAura((prev) => prev - delta);

    // Spawn floating particle
    const randomText = FUNNY_POPUPS[Math.floor(Math.random() * FUNNY_POPUPS.length)];
    const colors = ["#f00a88", "#00b0fc", "#ffc301", "#10b981", "#a855f7"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newParticle: FloatingParticle = {
      id: Date.now() + Math.random(),
      text: randomText,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 60,
      color: randomColor
    };

    setParticles((prev) => [...prev.slice(-6), newParticle]);

    setTimeout(() => {
      setIsScratching(false);
    }, 450);
  };

  const handleNextRoast = () => {
    setRoastIndex((prev) => (prev + 1) % GENZ_ROASTS.length);
    setAura((prev) => prev - 15000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-background text-foreground flex flex-col items-center justify-center select-none">
      {/* Neubrutalist Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/15 dark:bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-primary/15 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-accent-yellow/15 dark:bg-accent-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Gen Z Stickers */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [-6, -3, -6] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-32 left-12 z-20 items-center gap-2 px-4 py-2 rounded-xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/20 dark:border-white/20 shadow-[4px_4px_0px_0px_#f00a88]"
      >
        <span className="text-sm">🔥</span>
        <span className="font-display font-black text-xs uppercase tracking-wider text-primary">
          -1,000,000 AURA 📉
        </span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 14, 0], rotate: [8, 4, 8] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="hidden lg:flex absolute top-36 right-16 z-20 items-center gap-2 px-4 py-2 rounded-xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/20 dark:border-white/20 shadow-[4px_4px_0px_0px_#00b0fc]"
      >
        <span className="text-sm animate-spin">📻</span>
        <span className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">
          BPM: 0 ⏸️ (FLATLINED)
        </span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [5, 2, 5] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
        className="hidden sm:flex absolute bottom-24 left-8 lg:left-24 z-20 items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/20 dark:border-white/20 shadow-[4px_4px_0px_0px_#ffc301]"
      >
        <span className="text-sm">🍳</span>
        <span className="font-display font-black text-[11px] uppercase tracking-wider text-accent-yellow">
          COOKED FR FR
        </span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 12, 0], rotate: [-7, -4, -7] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.5 }}
        className="hidden sm:flex absolute bottom-28 right-12 lg:right-28 z-20 items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/20 dark:border-white/20 shadow-[4px_4px_0px_0px_#a855f7]"
      >
        <span className="text-sm">👀</span>
        <span className="font-display font-black text-[11px] uppercase tracking-wider text-purple-400">
          SIDE EYE INTENSIFIES
        </span>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Top Vibe Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-secondary/15 dark:bg-secondary/15 border-2 border-secondary text-foreground dark:text-secondary font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#f00a88] mb-8"
        >
          <span className="text-sm animate-bounce">💀</span>
          <span>VIBE CHECK: COMPLETE DISASTER</span>
        </motion.div>

        {/* Hero 4 - VINYL - 4 Centerpiece */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 my-2 sm:my-4">
          
          {/* Left "4" */}
          <motion.span 
            initial={{ opacity: 0, x: -50, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            whileHover={{ scale: 1.05, rotate: -8 }}
            className="font-display font-black text-7xl sm:text-9xl md:text-[11rem] leading-none text-foreground tracking-tighter drop-shadow-[5px_5px_0px_#00b0fc]"
          >
            4
          </motion.span>

          {/* Interactive Melting Vinyl Turntable as the "0" */}
          <div className="relative group cursor-pointer" onClick={handleScratchVinyl} title="Tap to scratch the record!">
            
            {/* Tone Arm */}
            <motion.div 
              animate={isScratching ? { rotate: [20, -10, 25, 0], x: [0, -5, 5, 0] } : { rotate: [0, 4, 0] }}
              transition={{ repeat: isScratching ? 1 : Infinity, duration: isScratching ? 0.3 : 3, ease: "easeInOut" }}
              className="absolute -top-6 -right-5 sm:-top-8 sm:-right-8 w-12 sm:w-16 h-20 sm:h-28 z-30 pointer-events-none origin-top-right"
            >
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-foreground dark:bg-white border-2 border-primary absolute top-0 right-0 shadow-md" />
              <div className="w-1 sm:w-1.5 h-16 sm:h-24 bg-gradient-to-b from-foreground/80 to-foreground/40 dark:from-white/80 dark:to-white/40 absolute top-2 right-1.5 rotate-[22deg] rounded-full" />
              <div className="w-2.5 h-4 sm:w-3.5 sm:h-5 bg-secondary border border-foreground absolute bottom-0 left-1 rounded-sm shadow-sm" />
            </motion.div>

            {/* Vinyl Body */}
            <motion.div
              animate={
                isScratching 
                  ? { rotate: [-20, 30, -25, 15, 0], scale: [1, 0.95, 1.05, 1] } 
                  : { rotate: 360 }
              }
              transition={
                isScratching 
                  ? { duration: 0.4, ease: "easeInOut" } 
                  : { repeat: Infinity, duration: 8, ease: "linear" }
              }
              whileHover={{ scale: 1.08 }}
              className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-[#111113] border-4 sm:border-6 border-foreground dark:border-white shadow-[6px_6px_0px_0px_#f00a88] flex items-center justify-center overflow-hidden"
            >
              {/* Concentric Grooves */}
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-5 rounded-full border border-white/15" />
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-11 rounded-full border border-white/15" />
              <div className="absolute inset-14 rounded-full border border-white/10" />

              {/* Vinyl Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Center Vinyl Label */}
              <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary via-primary to-accent-yellow border-2 sm:border-4 border-foreground dark:border-white flex flex-col items-center justify-center shadow-inner relative z-10">
                <span className="text-xl sm:text-3xl md:text-4xl animate-pulse">
                  {scratchCount > 5 ? "💀" : scratchCount > 2 ? "😵‍💫" : "🎧"}
                </span>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#111113] border border-white mt-0.5" />
              </div>
            </motion.div>

            {/* Click me hint badge */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-accent-yellow text-black font-black text-[9px] uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_#000]"
            >
              TAP VINYL 🪩
            </motion.div>

            {/* Floating Popups on Click */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -80, scale: 1.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, backgroundColor: p.color }}
                  className="absolute z-40 pointer-events-none whitespace-nowrap px-3 py-1 rounded-lg font-black text-xs uppercase tracking-wider text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  {p.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right "4" */}
          <div className="relative">
            <motion.span 
              initial={{ opacity: 0, x: 50, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 4 }}
              whileHover={{ scale: 1.05, rotate: 8 }}
              className="font-display font-black text-7xl sm:text-9xl md:text-[11rem] leading-none text-foreground tracking-tighter drop-shadow-[5px_5px_0px_#ffc301]"
            >
              4
            </motion.span>
            <span className="hidden sm:inline-block absolute -top-4 -right-6 px-2 py-0.5 rounded-md bg-secondary text-black font-black text-[10px] uppercase border border-black shadow-[2px_2px_0px_0px_#000] rotate-12">
              BRO? 🤨
            </span>
          </div>

        </div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-foreground tracking-tight max-w-2xl mt-4 sm:mt-6 mb-3"
        >
          BRO REALLY THOUGHT THIS TRACK EXISTED 💀
        </motion.h1>

        {/* Dynamic Roast Card */}
        <motion.div 
          key={roastIndex}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 shadow-[5px_5px_0px_0px_#00b0fc] my-4 text-center space-y-2 relative"
        >
          <div className="flex items-center justify-center gap-2">
            <span 
              className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-black"
              style={{ backgroundColor: activeRoast.color }}
            >
              {activeRoast.badge}
            </span>
            <span className="text-foreground/40 font-mono text-xs font-bold">
              // REASON #{roastIndex + 1}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black font-display text-foreground">
            {activeRoast.title}
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 dark:text-zinc-300 font-sans leading-relaxed font-medium">
            {activeRoast.desc}
          </p>
        </motion.div>

        {/* Live Aura & Telemetry HUD */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10">
            <span className="text-foreground/50">AURA:</span>
            <span className={`font-black ${aura < -200000 ? "text-primary animate-pulse" : "text-secondary"}`}>
              {aura.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10">
            <span className="text-foreground/50">FREQUENCY:</span>
            <span className="text-accent-blue font-black">404 Hz (OUT OF TUNE)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10">
            <span className="text-foreground/50">STATUS:</span>
            <span className="text-accent-yellow font-black">UNRELEASED / LEAKED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <Link
            href="/"
            className="btn-neubrutalist py-3.5 px-7 rounded-none flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#00b0fc] hover:shadow-[6px_6px_0px_0px_#00b0fc] cursor-pointer"
          >
            <IconHome className="w-4 h-4" /> BACK TO THE FYP
          </Link>

          <Link
            href="/releases"
            className="py-3.5 px-6 rounded-none bg-card-bg dark:bg-[#111113] border-2 border-foreground dark:border-white text-foreground dark:text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0px_0px_#ffc301] hover:shadow-[6px_6px_0px_0px_#ffc301] hover:bg-secondary hover:text-black transition-all cursor-pointer"
          >
            <IconHeadphones className="w-4 h-4 text-primary" /> STREAM VALID MUSIC
          </Link>

          <button
            onClick={handleNextRoast}
            className="py-3.5 px-5 rounded-none bg-card-bg dark:bg-[#111113] border-2 border-foreground/20 dark:border-white/20 text-foreground/80 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-foreground dark:hover:border-white hover:text-foreground transition-all cursor-pointer shadow-sm"
            title="Generate another excuse"
          >
            <IconRotate className="w-3.5 h-3.5 text-accent-yellow" /> ANOTHER EXCUSE
          </button>
        </div>

      </div>
    </div>
  );
}
