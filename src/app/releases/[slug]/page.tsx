"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Play, 
  Calendar, 
  Music, 
  Globe, 
  Share2, 
  Disc, 
  Mic2,
  ListMusic,
  Plus,
  Loader2
} from "lucide-react";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { notFound } from "next/navigation";

export default function ReleaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: id } = use(params);
  const [release, setRelease] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrack } = useAudioStore();

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const res = await fetch(`/api/releases/public/${id}`);
        const data = await res.json();
        if (data.release) {
          setRelease(data.release);
        } else {
          setRelease(null);
        }
      } catch (err) {
        console.error("Error fetching release detail:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelease();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!release) {
    notFound();
  }

  const handlePlay = (trackUrl?: string, trackTitle?: string) => {
    setTrack({
      id: release.id,
      title: trackTitle || release.title,
      artist: release.artist,
      cover: release.cover,
      url: trackUrl || release.tracks[0]?.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    });
  };

  const streamingLinks = [
    { name: "Spotify", url: "#", icon: <Globe className="w-5 h-5" /> },
    { name: "Apple Music", url: "#", icon: <Disc className="w-5 h-5" /> },
    { name: "YouTube Music", url: "#", icon: <Mic2 className="w-5 h-5" /> },
    { name: "JioSaavn", url: "#", icon: <ListMusic className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/releases" className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Releases
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Cover Art */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10">
              <Image 
                src={release.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80"} 
                alt={release.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="mt-10 flex gap-4">
               <button 
                  onClick={() => handlePlay()}
                  className="flex-grow btn-gradient py-5 rounded-2xl font-black font-display text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
               >
                  <Play className="fill-current w-6 h-6" /> PLAY PREVIEW
               </button>
               <button className="w-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white">
                  <Share2 className="w-6 h-6" />
               </button>
            </div>
          </motion.div>

          {/* Right Column: Info & Tracks */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="space-y-6">
               <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                    {release.genre}
                  </span>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> Released {new Date(release.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter leading-none">
                 {release.title}
               </h1>
               
               <p className="text-2xl font-bold font-display text-white/60">
                 by <span className="text-primary">{release.artist}</span>
               </p>
            </div>

            {/* Streaming Links */}
            <div className="space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Listen Now</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {streamingLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url}
                      className="flex flex-col items-center justify-center gap-3 p-6 glass border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors border border-white/5">
                        {link.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{link.name}</span>
                    </a>
                  ))}
               </div>
            </div>

            {/* Tracklist */}
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Tracklist</h3>
                  <span className="text-white/20 text-[10px] font-bold uppercase">{release.tracks.length} Tracks</span>
               </div>
               <div className="space-y-2">
                  {release.tracks.map((track: any) => (
                    <div 
                      key={track.number}
                      onClick={() => handlePlay(track.audioUrl, track.title)}
                      className="group flex items-center justify-between p-5 rounded-xl border border-white/0 hover:border-white/5 hover:bg-white/5 transition-all text-white/60 hover:text-white cursor-pointer"
                    >
                       <div className="flex items-center gap-6">
                          <span className="w-4 text-[10px] font-black text-white/20 group-hover:text-primary transition-colors">{track.number}</span>
                          <span className="font-bold">{track.title}</span>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="text-sm font-mono opacity-40">{track.duration}</span>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                             <Plus className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Meta Info */}
            <div className="pt-10 border-t border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] flex flex-wrap gap-x-12 gap-y-4">
               <div className="flex gap-2"><span className="text-white/40">Label:</span> {release.labelName}</div>
               <div className="flex gap-2"><span className="text-white/40">Copyright:</span> © {new Date(release.releaseDate).getFullYear()} {release.copyrightHolder || "Fastit"}</div>
               {release.upc && <div className="flex gap-2"><span className="text-white/40">UPC:</span> {release.upc}</div>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
