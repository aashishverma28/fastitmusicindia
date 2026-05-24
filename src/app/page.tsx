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
  const { setTrack } = useAudioStore();
  const [splitSliderVal, setSplitSliderVal] = React.useState(90);
  const [streamsVal, setStreamsVal] = React.useState(500000);

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

          {/* Interactive Neubrutalist Studio & Earnings Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full flex flex-col gap-8 z-10"
          >
            {/* Background dashed border card */}
            <div className="absolute inset-0 bg-black/5 border-2 border-dashed border-foreground/10 rounded-3xl -z-10" />

            {/* Draggable Stickers */}
            <motion.div 
              drag
              dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
              className="absolute -top-12 -left-6 z-30 cursor-grab active:cursor-grabbing hidden xl:block"
            >
              <div className="tape-badge tape-badge-pink rotate-[-12deg] text-xs font-black shadow-md border-2 border-white select-none">
                100% INDIE ★
              </div>
            </motion.div>

            <motion.div 
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              className="absolute top-[45%] -right-10 z-30 cursor-grab active:cursor-grabbing hidden xl:block"
            >
              <div className="bg-[#00b0fc] text-black border-2 border-white px-3 py-1.5 font-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] rotate-12 select-none">
                NO FEES
              </div>
            </motion.div>

            {/* Widget 1: Interactive Royalty Split Slider */}
            <div className="relative bg-[#111113] border-3 border-foreground p-6 shadow-[6px_6px_0px_0px_#ffc301] text-white flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/40">INTERACTIVE // SPLITS</span>
                <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 text-[8px] font-black uppercase">
                  ROYALTY METER
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-display font-black text-xl">
                  <span>Artist: <span className="text-secondary">{splitSliderVal}%</span></span>
                  <span className="text-white/40">Fastit: {100 - splitSliderVal}%</span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="100"
                  value={splitSliderVal}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSplitSliderVal(val);
                  }}
                  className="w-full accent-secondary cursor-pointer h-2 bg-black rounded-lg appearance-none"
                />
              </div>

              {/* Real-time reactive warning note */}
              <div className="bg-black/60 border border-white/10 p-3 text-xs font-sans font-semibold min-h-[50px] flex items-center">
                {splitSliderVal === 90 ? (
                  <p className="text-secondary">✓ Default Deal: Keep 90% of everything you earn. Transparent & fair.</p>
                ) : splitSliderVal > 90 ? (
                  <p className="text-[#00b0fc]">★ Keeping {splitSliderVal}%: You keep almost everything! Fastit charges only a minimal fee.</p>
                ) : splitSliderVal <= 65 ? (
                  <p className="text-primary font-bold">⚠️ Warning: Traditional labels force you to keep {splitSliderVal}% or less. Don't sign away your masters!</p>
                ) : (
                  <p className="text-white/70">Configure your deal. Fastit ensures you keep the absolute lion share.</p>
                )}
              </div>
            </div>

            {/* Widget 2: Dynamic Streaming Earnings Calculator */}
            <div className="relative bg-[#111113] border-3 border-foreground p-6 shadow-[6px_6px_0px_0px_#00b0fc] text-white flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/40">INTERACTIVE // ESTIMATOR</span>
                <span className="bg-accent-blue/20 text-[#00b0fc] border border-accent-blue/30 px-2 py-0.5 text-[8px] font-black uppercase">
                  EARNINGS POTENTIAL
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-display font-black text-sm">
                  <span>Annual Streams: <span className="text-accent-blue font-mono">{(streamsVal / 1000).toFixed(0)}k</span></span>
                </div>
                <input 
                  type="range"
                  min="100000"
                  max="5000000"
                  step="100000"
                  value={streamsVal}
                  onChange={(e) => setStreamsVal(parseInt(e.target.value))}
                  className="w-full accent-[#00b0fc] cursor-pointer h-2 bg-black rounded-lg appearance-none"
                />
              </div>

              {/* Dynamic bar charts comparing payout */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white/80">
                    <span>Keep with Fastit (90%):</span>
                    <span className="text-secondary font-black">₹{Math.round(streamsVal * 0.25 * 0.9).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 bg-black border border-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary"
                      animate={{ width: "90%" }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white/50">
                    <span>Traditional Labels (avg 50%):</span>
                    <span className="text-white/40">₹{Math.round(streamsVal * 0.25 * 0.5).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 bg-black border border-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-white/20"
                      animate={{ width: "50%" }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-[10px] text-white/30 text-center font-semibold italic">
                * Based on average indie streams payout of ₹0.25 per play.
              </div>
            </div>

            {/* Widget 3: Polaroid Artist Photo Snapshot */}
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="polaroid-card w-[280px] self-center md:self-end rotate-3 z-20 cursor-default"
            >
              <div className="relative w-full aspect-[4/3] bg-zinc-800 border-2 border-black overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80"
                  alt="Stage performance"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="pt-4 text-center font-handwriting text-foreground text-2xl tracking-wide select-none">
                Live Gig, Indie Fest '26
              </div>
            </motion.div>
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
