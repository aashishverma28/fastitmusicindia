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

  const getYouTubeId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  const streamingLinks = [
    { name: "Spotify", url: release.spotifyUrl, icon: <Globe className="w-5 h-5" /> },
    { name: "Apple Music", url: release.appleMusicUrl, icon: <Disc className="w-5 h-5" /> },
    { name: "YouTube Music", url: release.ytMusicUrl, icon: <Mic2 className="w-5 h-5" /> },
    { name: "JioSaavn", url: release.jioSaavnUrl, icon: <ListMusic className="w-5 h-5" /> },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-[#0a0a0c] text-white">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/releases" className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Releases
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: YouTube Video */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-zinc-800 bg-black">
              {release.youtubeUrl || release.audioUrl ? (
                <iframe
                  className="absolute inset-0 w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${getYouTubeId(release.youtubeUrl || release.audioUrl)}`}
                  title={release.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600">No Video Available</div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
               <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                    {release.genre}
                  </span>
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> Released {new Date(release.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
               </div>
               
               <h1 className="text-4xl md:text-5xl font-black font-display text-zinc-100 tracking-tighter leading-none">
                 {release.title}
               </h1>
               
               <p className="text-xl font-bold font-display text-zinc-300">
                 by <span className="text-primary">{release.artist}</span>
               </p>
            </div>

            {/* Streaming Links */}
            <div className="space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Watch / Listen Now</h3>
               <div className="grid grid-cols-2 gap-4">
                  {streamingLinks.length > 0 ? streamingLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-3 p-6 glass border border-zinc-800/80 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors border border-zinc-800">
                        {link.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{link.name}</span>
                    </a>
                  )) : (
                    <p className="text-zinc-400 text-xs italic col-span-2">Streaming links will be active once live on DSP platforms.</p>
                  )}
               </div>
            </div>

            {/* Meta Info */}
            <div className="pt-10 border-t border-zinc-800/80 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex flex-wrap gap-x-12 gap-y-4">
               <div className="flex gap-2"><span className="text-zinc-400">Label:</span> {release.labelName}</div>
               <div className="flex gap-2"><span className="text-zinc-400">Copyright:</span> © {new Date(release.releaseDate).getFullYear()} {release.copyrightHolder || "Fastit"}</div>
               {release.upc && <div className="flex gap-2"><span className="text-zinc-400">UPC:</span> {release.upc}</div>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
