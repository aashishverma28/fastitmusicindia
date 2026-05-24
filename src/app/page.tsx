"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Music, Headphones, Activity, Headset } from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, HandDrawnCircle, BadgeStamp } from "@/components/shared/Doodles";
import { VinylCard } from "@/components/shared/VinylCard";
import { useAudioStore } from "@/lib/store/useAudioStore";

export default function Home() {
  const [realReleases, setRealReleases] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { setTrack } = useAudioStore();

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-visible px-8 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px]"></div>
          <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[130px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 lg:col-span-7 relative"
          >
            {/* Ink Stamp Overlay in Hero */}
            <div className="absolute top-[-30px] left-[60%] hidden md:block">
              <BadgeStamp text="Made In India" type="pink" className="scale-90" />
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative w-14 h-14 bg-black/30 rounded-xl p-1 border border-white/10">
                <Image src="/logo.png" alt="Fastit Logo" fill className="object-contain p-1" />
              </div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high/40 border border-white/10 text-secondary font-bold text-xs tracking-widest uppercase font-sans">
                India&apos;s Indie Revolution
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white"
            >
              Empowering <span className="relative inline-block pb-1 pr-1">Music.<ScribbleUnderline color="#ffd709" /></span><br/>
              Distributing <span className="relative inline-block pb-2 pr-1">Dreams.<ScribbleUnderlineDouble color="#ff88b6" /></span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-white/75 text-lg md:text-xl max-w-xl font-medium leading-relaxed font-sans"
            >
              Join the movement. We take your sounds from the studio bedroom straight to millions across 150+ global streaming platforms.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4 relative"
            >
              <Link 
                href="/apply/artist" 
                className="btn-gradient text-black px-8 py-4 rounded-full font-bold text-lg hover:glow-primary hover:scale-105 transition-all relative"
              >
                Apply as Artist
              </Link>
              <Link 
                href="/apply/label" 
                className="bg-surface-container-highest border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all font-sans"
              >
                Apply as Record Label
              </Link>

              {/* Hand-drawn Curly Arrow annotating button */}
              <div className="absolute left-[160px] top-[60px] hidden md:block">
                <CurlyArrow direction="up" className="w-16 h-16 text-secondary" />
                <span className="absolute left-16 top-6 font-handwriting text-secondary text-2xl w-48 leading-none rotate-3">
                  Zero setup fees, keep 90%!
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 md:pt-14">
              <Link href="/releases" className="flex items-center gap-2 text-primary font-bold hover:translate-x-2 transition-transform">
                Explore Our Releases <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Record sleeve */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative group w-full max-w-[400px] mx-auto lg:max-w-none"
          >
            {/* Spinning vinyl disk background pulling out */}
            <div className="absolute top-2 left-2 w-full h-full rounded-2xl border-2 border-dashed border-white/10 -z-10 group-hover:rotate-3 transition-transform duration-500" />
            
            {/* Vintage style album display */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFlNkEmsHw0DPmGPAhtqrGUoVZZFRKzEUJVrCmMMPFMOdkaPk1EyMl0WKrNc2OFBw52JiFh5MpBMoVUPJuAyfB5os4xLG7yMX09HkaxRpQRqhbsCYZglPhlxqRVDQewTtsBXqPhKUqKWT2CCZLD1dY2ZNyIBnt4ze13scDTdgMJpap0y1nsV33zYrfyQ_Ws6191SzDDPh09up8qZQRtob-VJ7KSmu0z_jslRwqYjblsZ9BHNH_M8vEhTKAQy4OjppX0AIWRmUY31w"
                alt="Studio session tape"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              
              {/* Sticker overlay on sleeve */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-xs uppercase tracking-widest rounded shadow-lg rotate-12">
                Hot Release
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-5 glass rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-sm">Now Trending</p>
                    <p className="text-xs text-white/70">Midnight Desires - Arjun S.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Margin scribble note */}
            <div className="absolute -bottom-10 right-4 font-handwriting text-white/50 text-lg hidden sm:block">
              * Captured live in Guwahati
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar with hand-drawn highlighting circles */}
      <section className="bg-surface-container-low/30 py-20 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              className="space-y-4 relative"
            >
              <div className="relative inline-block">
                <h3 className="text-6xl font-black font-display text-white relative z-10">500+</h3>
                <HandDrawnCircle className="w-36 h-36 -top-8 left-1/2 -translate-x-1/2 opacity-30 text-primary" />
              </div>
              <p className="text-primary font-bold tracking-widest uppercase text-xs pt-2">Artists Partnered</p>
              <div className="font-handwriting text-primary/60 text-lg">Indie & Bedroom artists</div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 relative"
            >
              <div className="relative inline-block">
                <h3 className="text-6xl font-black font-display text-white relative z-10">10,000+</h3>
                <HandDrawnCircle className="w-40 h-40 -top-8 left-1/2 -translate-x-1/2 opacity-35 text-secondary" />
              </div>
              <p className="text-secondary font-bold tracking-widest uppercase text-xs pt-2">Tracks Distributed</p>
              <div className="font-handwriting text-secondary/60 text-lg">Across all DSP platforms</div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 relative"
            >
              <div className="relative inline-block">
                <h3 className="text-6xl font-black font-display text-white relative z-10">50+</h3>
                <HandDrawnCircle className="w-36 h-36 -top-8 left-1/2 -translate-x-1/2 opacity-30 text-tertiary" />
              </div>
              <p className="text-tertiary font-bold tracking-widest uppercase text-xs pt-2">Streaming Portals</p>
              <div className="font-handwriting text-tertiary/60 text-lg">Spotify, Apple, Jio, Gaana</div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Releases (using Vinyl Cards) */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-10 right-24 hidden xl:block">
          <CurlyArrow direction="down" className="w-20 h-20 text-primary rotate-12" />
          <span className="absolute top-16 right-10 font-handwriting text-primary text-xl w-32 leading-none">
            Click sleeve to view details!
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter">
              New <span className="relative inline-block pr-1">Drops.<ScribbleUnderline color="#ff88b6" /></span>
            </h2>
            <p className="text-white/60 max-w-md font-sans font-medium">
              Fresh, raw sounds from the independent heart of India, curated for the world stage.
            </p>
          </div>
          <Link 
            href="/releases" 
            className="px-8 py-3 rounded-full border border-white/10 hover:border-primary/40 font-bold hover:bg-white/5 transition-all font-sans text-sm tracking-widest uppercase"
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

      {/* Platform Partners */}
      <section className="py-24 bg-surface-container-lowest/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-lg font-display font-bold text-white/30 uppercase tracking-[0.25em] mb-16">Global Reach Across All DSP Platforms</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {["Spotify", "Apple Music", "YouTube", "JioSaavn", "Gaana", "Amazon Music"].map((p, idx) => (
              <div key={idx} className="flex items-center gap-2.5 hover:scale-105 transition-transform duration-300">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                <span className="font-bold text-xl text-white tracking-tight">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Bento Style with stamps & doodles) */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="md:col-span-2 btn-gradient p-12 rounded-3xl flex flex-col justify-between min-h-[420px] relative overflow-hidden group"
          >
            {/* Custom Stamp on the Bento card */}
            <div className="absolute top-8 right-8 z-20">
              <BadgeStamp text="Fierce Indie" type="yellow" className="scale-110" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-black mb-6 leading-none">
                Ready to lead<br/>the charts?
              </h2>
              <p className="text-black/80 text-lg md:text-xl font-bold max-w-md font-sans leading-relaxed">
                Our bespoke artist dashboard provides real-time transparency and global distribution in a single step.
              </p>
            </div>
            <div className="relative z-10 mt-10">
              <Link href="/apply" className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all inline-block shadow-xl">
                Get Started Today
              </Link>
            </div>
            <Activity className="absolute -bottom-10 -right-10 w-[280px] h-[280px] text-black/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="bg-surface-container-high/40 p-12 rounded-3xl flex flex-col justify-between border border-white/5 relative"
          >
            <div>
              <Headset className="text-secondary w-12 h-12 mb-8" />
              <h3 className="text-3xl font-display font-black text-white mb-4">Dedicated Support</h3>
              <p className="text-white/60 font-sans font-medium leading-relaxed">
                24/7 personalized support. Work directly with human team members for release queries and metadata.
              </p>
              <div className="font-handwriting text-secondary text-2xl pt-4 rotate-2">
                * Zero automated AI bots!
              </div>
            </div>
            <Link href="/contact" className="text-secondary font-bold flex items-center gap-2 group font-sans mt-8 hover:translate-x-1.5 transition-transform">
              Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
