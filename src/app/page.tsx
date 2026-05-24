"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, ArrowRight, Activity, Headset, Volume2, Sparkles, Star } from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, HandDrawnCircle, BadgeStamp, SketchyStar, SparkleDoodle } from "@/components/shared/Doodles";
import { VinylCard } from "@/components/shared/VinylCard";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const [realReleases, setRealReleases] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { currentTrack, isPlaying, setTrack, togglePlay, volume, setVolume } = useAudioStore();
  const [consoleTrackIndex, setConsoleTrackIndex] = React.useState(0);

  const consoleTracks = [
    { 
      id: "hero-1", 
      title: "Midnight Desires", 
      artist: "Arjun S.", 
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFlNkEmsHw0DPmGPAhtqrGUoVZZFRKzEUJVrCmMMPFMOdkaPk1EyMl0WKrNc2OFBw52JiFh5MpBMoVUPJuAyfB5os4xLG7yMX09HkaxRpQRqhbsCYZglPhlxqRVDQewTtsBXqPhKUqKWT2CCZLD1dY2ZNyIBnt4ze13scDTdgMJpap0y1nsV33zYrfyQ_Ws6191SzDDPh09up8qZQRtob-VJ7KSmu0z_jslRwqYjblsZ9BHNH_M8vEhTKAQy4OjppX0AIWRmUY31w", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    },
    { 
      id: "hero-2", 
      title: "Electric Monsoon", 
      artist: "Kabir & The Beats", 
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaNQ0rW5whJD1Ur7I5bu2pifZJq8ZjiHt-IPYQLCbIu-iKGiif9b-zUxzCoCYUqpQXkidbL2llv-XmmbOCyqFje_Xi9tE5x4MZOF4i9x6AKAhERMDiTD9cP1_PbO0B2eEA507SdGqeJFXgR4ZZyxep22IPPyuoGKMVfDRzSUWQTymVmARMbdcDpN3bqlfxSB32ADqqw7JrO2bORXDV0IHLrtsf-veLhQ8miVx71yfb8R0NiO9P69bt-7pRWLl5_4XUTz67QcZ6wIA", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
    },
    { 
      id: "hero-3", 
      title: "Urban Nomad", 
      artist: "Anya Khurana", 
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKcgXtXi95QaGrNPrz929mxy7nS7izaOT3Y16aWt_54HF4M7Ob9Me0Y33M_AM9va0BSpibM2DIANqp7RAQTehHHcOChYPDnHm9G2_YZhsgk2aIJK6q4U7eLEjmZIndP_qa3BEzaUt4WBt9r9rNEmtD88EnIIuj3PNnx6BE36_VtzUmVnebpkZSnlfYdKhg8JRdSHA3_gAGemaLVRo3sJ4-ukgXKlrFTkT-573dWEyD3vVwg1bjw33XcbhGyLDwPuBmCppoBFt3dG4", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
    }
  ];

  const activeConsoleTrack = consoleTracks[consoleTrackIndex];
  const isConsolePlaying = currentTrack?.id === activeConsoleTrack.id && isPlaying;

  const handleToggleConsolePlay = () => {
    if (currentTrack?.id === activeConsoleTrack.id) {
      togglePlay();
    } else {
      setTrack({
        id: activeConsoleTrack.id,
        title: activeConsoleTrack.title,
        artist: activeConsoleTrack.artist,
        cover: activeConsoleTrack.cover,
        url: activeConsoleTrack.url
      });
    }
  };

  const handleNextConsoleTrack = () => {
    const nextIdx = (consoleTrackIndex + 1) % consoleTracks.length;
    setConsoleTrackIndex(nextIdx);
    if (isPlaying) {
      const nextTrack = consoleTracks[nextIdx];
      setTrack({
        id: nextTrack.id,
        title: nextTrack.title,
        artist: nextTrack.artist,
        cover: nextTrack.cover,
        url: nextTrack.url
      });
    }
  };

  React.useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await fetch("/api/releases/public");
        const data = await res.json();
        if (data.releases) {
          setRealReleases(data.releases.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching releases:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReleases();
  }, []);

  const displayReleases = realReleases.length > 0 ? realReleases : [
    { id: "1", title: "Electric Monsoon", artist: "Kabir & The Beats", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaNQ0rW5whJD1Ur7I5bu2pifZJq8ZjiHt-IPYQLCbIu-iKGiif9b-zUxzCoCYUqpQXkidbL2llv-XmmbOCyqFje_Xi9tE5x4MZOF4i9x6AKAhERMDiTD9cP1_PbO0B2eEA507SdGqeJFXgR4ZZyxep22IPPyuoGKMVfDRzSUWQTymVmARMbdcDpN3bqlfxSB32ADqqw7JrO2bORXDV0IHLrtsf-veLhQ8miVx71yfb8R0NiO9P69bt-7pRWLl5_4XUTz67QcZ6wIA" },
    { id: "2", title: "Urban Nomad", artist: "Anya Khurana", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKcgXtXi95QaGrNPrz929mxy7nS7izaOT3Y16aWt_54HF4M7Ob9Me0Y33M_AM9va0BSpibM2DIANqp7RAQTehHHcOChYPDnHm9G2_YZhsgk2aIJK6q4U7eLEjmZIndP_qa3BEzaUt4WBt9r9rNEmtD88EnIIuj3PNnx6BE36_VtzUmVnebpkZSnlfYdKhg8JRdSHA3_gAGemaLVRo3sJ4-ukgXKlrFTkT-573dWEyD3vVwg1bjw33XcbhGyLDwPuBmCppoBFt3dG4" },
    { id: "3", title: "Static Soul", artist: "VIBE Project", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-n-yRIUmrObVdupaR2esmT0mL2hdCZ_d-6t16Clx2SdDiKIvFCPAbX3i3NZYj_8ldJhhJqPMNlECiu0c6SUDVVv8LVBhwcWRXeJIVuYlWvKyfPKoEv3qZyPNJ7DLN0Seif-8XAzKJUFtIerW8vT1t2W88T6N89yn67pMCUfgYyjvY2oZ09CArEfQYnHmDvOke3dUBdJ9jwID6pmmn5RfD94ypGsQaOAHGohRJNPWbTOdxCYlHb1krUPJpNpgqCsSBpnOrr78jr94" },
    { id: "4", title: "Live at Guwahati", artist: "Various Artists", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIFynLLt-QbOpN0uE6J5PllafexwooBhJ48n3_p-07gnHXbkUu4ffcUppgmjjXjB3LRI8aThNuSVEpWaOSuj7EwRuX23sQJ4HUYRBYilZwKJO5e5jGhMEMxCqQLm_HlEzTm0Y-_wkgflhn_0R_RK4ABBE_JA_RZ0QZ78U0P_mVKfqm1rC6ActW2yrfA8nIYJq1xjEEySk5pVG8TnPiCyfQqyQDVumvf5VrzZwPR1PoDZq2jdhAepnoP2z9Wxss16FUOBkEvsskNJ4" }
  ];

  const handlePlay = (e: React.MouseEvent, rel: any) => {
    setTrack({
      id: rel.id,
      title: rel.title,
      artist: rel.artist || rel.artistName,
      cover: rel.img || rel.cover,
      url: rel.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Top Accent pop-stripes strip */}
      <div className="h-3 w-full pop-stripes border-b-2 border-white z-20" />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-visible px-8 py-16">
        {/* Dynamic Grid Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />

        {/* Colorful Organic Blur Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-pulse duration-[8s]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-blue/15 rounded-full blur-[120px] animate-pulse duration-[10s]" />
          <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] animate-pulse duration-[12s]" />
        </div>

        {/* Floating Doodle Assets */}
        <div className="absolute top-[12%] left-[5%] animate-bounce hidden md:block" style={{ animationDuration: '6s' }}>
          <SketchyStar className="w-10 h-10 text-secondary" />
        </div>
        <div className="absolute bottom-[20%] left-[45%] animate-pulse hidden md:block" style={{ animationDuration: '4s' }}>
          <SparkleDoodle className="w-8 h-8 text-primary" opacity={0.6} />
        </div>

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 lg:col-span-7 relative"
          >
            {/* Duct Tape Sticker */}
            <div className="absolute top-[-36px] left-[70%] hidden md:block z-20">
              <div className="tape-badge tape-badge-pink rotate-6">MADE IN INDIA</div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-6 relative"
            >
              <div className="relative w-14 h-14 bg-black border-2 border-white p-1.5 shadow-[3px_3px_0px_0px_#ffc301] hover:rotate-6 transition-transform">
                <Image src={theme === "light" ? "/logo-light.png" : "/logo.png"} alt="Fastit Logo" fill className="object-contain p-1" />
              </div>
              <div className="inline-block px-4 py-1.5 border-2 border-white text-secondary font-bold text-xs tracking-widest uppercase bg-black shadow-[3px_3px_0px_0px_#f00a88] hover:-translate-y-1 transition-all">
                India&apos;s Indie Revolution
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white"
            >
              MAKE <span className="text-primary italic font-serif font-light">NOISE.</span><br/>
              KEEP YOUR <span className="relative inline-block px-3 py-1 bg-secondary text-black rotate-[-1.5deg] shadow-[4px_4px_0px_0px_#f00a88] border-2 border-black">RIGHTS.</span><br/>
              RULE THE <span className="relative inline-block text-accent-blue pr-2">CHARTS.<ScribbleUnderlineDouble color="#ffc301" /></span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-white/80 text-lg md:text-xl max-w-xl font-medium leading-relaxed font-sans"
            >
              Join the movement. We push your sounds straight from the studio to millions across 150+ global streaming platforms.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4 relative z-10"
            >
              <Link 
                href="/apply/artist" 
                className="btn-neubrutalist px-8 py-4.5 rounded-none font-bold text-lg hover:scale-105 transition-all relative block"
              >
                Apply as Artist
              </Link>
              <Link 
                href="/apply/label" 
                className="btn-neubrutalist-secondary px-8 py-4.5 rounded-none font-bold text-lg hover:scale-105 transition-all font-sans block"
              >
                Apply as Record Label
              </Link>

              {/* Hand-drawn Curly Arrow annotating button */}
              <div className="absolute left-[160px] top-[68px] hidden md:block">
                <CurlyArrow direction="up" className="w-16 h-16 text-secondary" />
                <span className="absolute left-16 top-6 font-handwriting text-secondary text-2xl w-48 leading-none rotate-3">
                  Keep 90% of your earnings!
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 md:pt-14">
              <Link href="/releases" className="flex items-center gap-2 text-primary font-bold hover:translate-x-2 transition-transform">
                Explore Our Releases <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Neubrutalist Turntable Console */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: -0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:max-w-none z-10"
          >
            {/* 3D shadows under console */}
            <div className="absolute top-3 left-3 w-full h-full bg-[#00b0fc] border-3 border-black -z-10" />
            <div className="absolute top-6 left-6 w-full h-full bg-[#f00a88] border-3 border-black -z-20" />
            
            {/* Main Console Box */}
            <div className="relative border-3 border-foreground bg-[#111113] p-6 text-white flex flex-col gap-6">
              
              {/* Console Header Bar */}
              <div className="flex justify-between items-center border-b-2 border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  {/* Glowing LED status light */}
                  <span className={`w-3.5 h-3.5 rounded-full border border-white/20 transition-all ${isConsolePlaying ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-600'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">FAST-DECK // INDIE PLAYER</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Main Deck Grid: Platter and Controls */}
              <div className="grid grid-cols-12 gap-6 items-center">
                {/* Platter & Vinyl (Col-span 8) */}
                <div className="col-span-8 relative aspect-square flex items-center justify-center bg-black/40 border-2 border-white/10 rounded-full p-2 overflow-hidden group">
                  {/* Turntable Platter Outer Ring */}
                  <div className="absolute inset-0 border border-white/5 rounded-full" />
                  
                  {/* Spinning Vinyl Disc */}
                  <div 
                    className={`relative w-full h-full rounded-full bg-gradient-to-r from-[#18181b] via-[#09090b] to-[#18181b] border-2 border-white/20 flex items-center justify-center shadow-2xl transition-transform ${isConsolePlaying ? 'animate-spin' : ''}`}
                    style={{ 
                      animationDuration: '4.8s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite'
                    }}
                  >
                    {/* Vinyl Grooves (SVG concentric circles) */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" fill="none" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="5 2" />
                      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    </svg>

                    {/* Album Art Label in the Center */}
                    <div className="relative w-[34%] h-[34%] rounded-full overflow-hidden border-2 border-[#111] bg-[#ffc301] shadow-md flex items-center justify-center">
                      <Image 
                        src={activeConsoleTrack.cover} 
                        alt={activeConsoleTrack.title}
                        fill
                        className="object-cover animate-spin-slow"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      {/* Center Spindle Hole */}
                      <div className="w-3.5 h-3.5 bg-black border border-white/40 rounded-full z-10" />
                    </div>
                  </div>

                  {/* Tonearm/Stylus Arm overlaid on Platter */}
                  <div 
                    className="absolute top-1 right-8 w-16 h-28 pointer-events-none z-10"
                    style={{
                      transform: isConsolePlaying ? "rotate(18deg) translateX(-2px) translateY(4px)" : "rotate(-10deg)",
                      transformOrigin: "top right",
                      transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                    }}
                  >
                    <svg viewBox="0 0 60 120" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
                      {/* Tonearm Base */}
                      <circle cx="45" cy="15" r="10" fill="#27272a" stroke="#fff" strokeWidth="1" />
                      <circle cx="45" cy="15" r="4" fill="#a1a1aa" />
                      {/* Metal Arm */}
                      <path d="M45,15 Q30,50 35,90 L22,105" fill="none" stroke="#e4e4e7" strokeWidth="3.5" strokeLinecap="round" />
                      {/* Cartridge/Stylus head */}
                      <rect x="15" y="100" width="10" height="15" fill="#f00a88" rx="1" transform="rotate(25 20 105)" />
                    </svg>
                  </div>
                </div>

                {/* Vertical Pitch Fader / Volume Control (Col-span 4) */}
                <div className="col-span-4 flex flex-col items-center gap-3">
                  <span className="text-[9px] font-black text-white/30 tracking-wider">VOL. GAIN</span>
                  
                  {/* Neubrutalist Vertical Slider Track */}
                  <div className="relative w-4 h-36 bg-black border-2 border-white/20 rounded-none flex items-center justify-center">
                    {/* Tick Marks */}
                    <div className="absolute left-[-8px] h-full flex flex-col justify-between py-1 text-[8px] font-bold text-white/20 select-none">
                      <span>+10</span>
                      <span>0</span>
                      <span>-10</span>
                    </div>

                    {/* Sliding knob (draggable / clickable) */}
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-row-resize"
                      style={{ writingMode: "bt-lr", WebkitAppearance: "slider-vertical" } as any}
                    />

                    {/* Visible knob representing volume */}
                    <div 
                      className="w-8 h-4 bg-[#ffc301] border-2 border-black shadow-[2px_2px_0px_0px_#f00a88] absolute left-[-8px] pointer-events-none transition-all duration-75 flex items-center justify-center text-[8px] font-black text-black"
                      style={{ bottom: `${volume * 82}%` }}
                    >
                      <Volume2 className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-white/60 tracking-wider">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              {/* Bouncing EQ Visualization Area */}
              <div className="flex items-end gap-1 h-14 bg-black/60 border border-white/10 p-2.5 overflow-hidden">
                {Array.from({ length: 22 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 w-1 bg-primary rounded-none"
                    animate={isConsolePlaying ? {
                      height: ["15%", "85%", "40%", "100%", "60%", "20%", "15%"]
                    } : {
                      height: "15%"
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.04
                    }}
                    style={{
                      backgroundColor: idx % 3 === 0 ? "#f00a88" : idx % 3 === 1 ? "#ffc301" : "#00b0fc"
                    }}
                  />
                ))}
              </div>

              {/* Console Dashboard metadata and button controls */}
              <div className="grid grid-cols-12 gap-4 items-center border-t-2 border-white/10 pt-4">
                {/* Meta details (Col-span 7) */}
                <div className="col-span-7 bg-black p-3 border border-white/10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#f00a88] text-[7px] font-black uppercase text-white tracking-widest">
                    NOW PLAYING
                  </div>
                  <p className="font-display font-black text-sm tracking-tight truncate text-white">
                    {activeConsoleTrack.title}
                  </p>
                  <p className="text-[10px] font-black text-white/50 tracking-wide truncate">
                    {activeConsoleTrack.artist}
                  </p>
                </div>

                {/* Control Action Buttons (Col-span 5) */}
                <div className="col-span-5 flex gap-2 justify-end">
                  {/* Play/Pause Button */}
                  <button 
                    onClick={handleToggleConsolePlay}
                    className="w-12 h-12 flex items-center justify-center bg-[#ffc301] border-2 border-white text-black shadow-[3px_3px_0px_0px_#f00a88] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#f00a88] transition-all hover:bg-white"
                  >
                    {isConsolePlaying ? (
                      <Pause className="w-5 h-5 fill-current stroke-[2.5]" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5 stroke-[2.5]" />
                    )}
                  </button>

                  {/* Skip to Next Track */}
                  <button 
                    onClick={handleNextConsoleTrack}
                    className="w-12 h-12 flex items-center justify-center bg-black border-2 border-white text-white shadow-[3px_3px_0px_0px_#00b0fc] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#00b0fc] transition-all hover:bg-[#1f2937]"
                  >
                    <SkipForward className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>

            {/* Handwriting sticker labels */}
            <div className="absolute -bottom-10 left-4 font-handwriting text-accent-blue text-2xl hidden sm:block rotate-2">
              * Tap deck knobs to cue!
            </div>
            
            {/* Doodle arrow pointing back to buttons */}
            <div className="absolute -left-12 bottom-12 hidden xl:block rotate-[-20deg]">
              <CurlyArrow direction="left" className="w-14 h-14 text-primary" />
              <span className="absolute -top-6 -left-20 font-handwriting text-primary text-xl w-32 leading-none">
                Support for 150+ DSPs
              </span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Neubrutalist Marquee Ticker Banner */}
      <div className="w-full overflow-hidden bg-secondary border-y-3 border-foreground py-4 select-none relative z-20 shadow-md">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          <span className="font-display font-black text-sm md:text-xl text-[#080809] uppercase tracking-[0.18em] flex items-center gap-12">
            <span>Fastit Music India</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Empowering Independent Artists</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Distribute to 150+ Streaming Platforms</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Keep 90% of Your Earnings</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Zero Annual Fees</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>India&apos;s Indie Revolution</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Transparent Analytics & Payouts</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
          </span>
          <span className="font-display font-black text-sm md:text-xl text-[#080809] uppercase tracking-[0.18em] flex items-center gap-12" aria-hidden="true">
            <span>Fastit Music India</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Empowering Independent Artists</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Distribute to 150+ Streaming Platforms</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Keep 90% of Your Earnings</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Zero Annual Fees</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>India&apos;s Indie Revolution</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Transparent Analytics & Payouts</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
          </span>
        </div>
      </div>

      {/* Stats Bar (Neubrutalist offset panels) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              className="neubrutalist-card-pink p-8 rounded-none text-center relative"
            >
              <h3 className="text-6xl font-black font-display text-white mb-2">500+</h3>
              <p className="text-primary font-black tracking-widest uppercase text-xs">Artists Partnered</p>
              <div className="font-handwriting text-primary/80 text-xl pt-2">Indie & Bedroom creators</div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.08 }}
              className="neubrutalist-card-yellow p-8 rounded-none text-center relative"
            >
              <h3 className="text-6xl font-black font-display text-white mb-2">10,000+</h3>
              <p className="text-secondary font-black tracking-widest uppercase text-xs">Tracks Distributed</p>
              <div className="font-handwriting text-secondary/80 text-xl pt-2">Across all DSP platforms</div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.16 }}
              className="neubrutalist-card-blue p-8 rounded-none text-center relative"
            >
              <h3 className="text-6xl font-black font-display text-white mb-2">50+</h3>
              <p className="text-accent-blue font-black tracking-widest uppercase text-xs">Streaming Portals</p>
              <div className="font-handwriting text-accent-blue/80 text-xl pt-2">Spotify, Apple, Jio, Gaana</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Releases (using Vinyl Cards) */}
      <section className="py-28 px-8 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-10 right-24 hidden xl:block z-10">
          <CurlyArrow direction="down" className="w-18 h-18 text-primary rotate-12" />
          <span className="absolute top-16 right-10 font-handwriting text-primary text-xl w-32 leading-none">
            Hover sleeves to slide out record!
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter">
              New <span className="relative inline-block pr-1 text-primary">Drops.<ScribbleUnderline color="#ffc301" /></span>
            </h2>
            <p className="text-white/70 max-w-md font-sans font-semibold">
              Fresh, raw sounds from the independent heart of India, curated for the world stage.
            </p>
          </div>
          <Link 
            href="/releases" 
            className="px-8 py-3.5 border-2 border-white hover:bg-white hover:text-black font-bold transition-all font-sans text-sm tracking-widest uppercase"
          >
            View Full Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {displayReleases.map((item: any, idx: number) => (
            <VinylCard
              key={item.id || idx}
              id={item.id || idx}
              title={item.title}
              artist={item.artist}
              cover={item.img || item.cover}
              slug={item.slug || item.id}
              genre={item.genre}
              audioUrl={item.audioUrl}
              onPlay={(e) => handlePlay(e, item)}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-4 w-full pop-stripes border-y-2 border-white z-20" />

      {/* Platform Partners */}
      <section className="py-24 bg-black/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-sm font-display font-black text-white/30 uppercase tracking-[0.3em] mb-16">Global Reach Across All DSP Platforms</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["Spotify", "Apple Music", "YouTube", "JioSaavn", "Gaana", "Amazon Music"].map((p, idx) => (
              <div key={idx} className="flex items-center gap-3.5 hover:scale-105 transition-transform duration-300">
                <div className="w-3 h-3 bg-primary border border-white" />
                <span className="font-black text-xl text-white tracking-tight">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Bento Style neubrutalist) */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="md:col-span-2 neubrutalist-card-yellow p-12 rounded-none flex flex-col justify-between min-h-[420px] relative overflow-hidden group"
          >
            {/* Custom Tape Sticker */}
            <div className="absolute top-8 right-8 z-20">
              <div className="tape-badge tape-badge-pink scale-110">Fierce Indie</div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white mb-6 leading-none">
                Ready to lead<br/>the charts?
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-bold max-w-lg font-sans leading-relaxed">
                Our dashboard provides real-time transparency and global distribution in a single step.
              </p>
            </div>
            <div className="relative z-10 mt-10">
              <Link href="/apply" className="bg-[#080809] border-2 border-white text-white px-10 py-5 rounded-none font-bold text-lg hover:bg-white hover:text-black transition-all inline-block shadow-lg">
                Get Started Today
              </Link>
            </div>
            <Activity className="absolute -bottom-10 -right-10 w-[280px] h-[280px] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="neubrutalist-card-blue p-12 rounded-none flex flex-col justify-between border-2 border-white relative"
          >
            <div>
              <Headset className="text-accent-blue w-12 h-12 mb-8" />
              <h3 className="text-3xl font-display font-black text-white mb-4">Dedicated Support</h3>
              <p className="text-white/60 font-sans font-medium leading-relaxed">
                24/7 support. Work directly with human team members for release queries and metadata fixes.
              </p>
              <div className="font-handwriting text-accent-blue text-2xl pt-4 rotate-2">
                * Zero automated AI bots!
              </div>
            </div>
            <Link href="/contact" className="text-accent-blue font-bold flex items-center gap-2 group font-sans mt-8 hover:translate-x-1.5 transition-transform">
              Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
