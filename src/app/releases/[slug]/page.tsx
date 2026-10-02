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
  Disc, 
  Mic2,
  ListMusic,
  Loader2,
  Headphones
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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
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
      url: trackUrl || release.tracks?.[0]?.audioUrl || release.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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

  const youtubeVideoId = getYouTubeId(release.youtubeUrl || release.audioUrl);

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Dynamic Background Glow with Blur */}
      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden -z-10 pointer-events-none select-none">
        {release.cover && (
          <Image 
            src={release.cover} 
            alt={release.title} 
            fill 
            priority
            className="object-cover opacity-15 dark:opacity-25 blur-[90px] scale-110" 
          />
        )}
        {/* Seamless theme-matching gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background dark:via-[#080809]/80 dark:to-[#080809]" />
        
        {/* Ambient Neubrutalist flares */}
        <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] bg-primary/15 dark:bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-secondary/15 dark:bg-secondary/15 rounded-full blur-[130px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-8 lg:mb-12">
          <Link 
            href="/releases" 
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground dark:text-zinc-400 dark:hover:text-primary transition-colors font-bold group text-sm sm:text-base px-3 py-1.5 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" /> Back to Releases
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Media Player (YouTube or High-Res Vinyl Cover) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border-3 sm:border-4 border-foreground/15 dark:border-white/15 shadow-[8px_8px_0px_0px_#ffc301] dark:shadow-[8px_8px_0px_0px_#ffc301] bg-black">
              {youtubeVideoId ? (
                <iframe
                  className="absolute inset-0 w-full h-full border-none"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={release.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image 
                    src={release.cover} 
                    alt={release.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <button
                      onClick={() => handlePlay()}
                      className="w-20 h-20 rounded-full bg-secondary text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Fastit Audio Stream Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 shadow-[4px_4px_0px_0px_#00b0fc] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 border border-foreground/10 dark:border-white/10 bg-background">
                  <Image src={release.cover} alt={release.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-foreground truncate">{release.title}</h4>
                  <p className="text-xs text-foreground/60 dark:text-zinc-400 truncate">{release.artist}</p>
                </div>
              </div>

              <button
                onClick={() => handlePlay()}
                className="btn-neubrutalist py-2.5 px-5 rounded-none flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#f00a88] flex-shrink-0 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Stream Track
              </button>
            </div>
          </motion.div>

          {/* Right Column: Release Information & DSP Links */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8 lg:space-y-10"
          >
            <div className="space-y-4">
               <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-primary/15 dark:bg-primary/10 border-2 border-primary text-primary px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#f00a88]">
                    {release.genre}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/15 dark:border-white/15 text-foreground/75 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> {new Date(release.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
               </div>
               
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-foreground tracking-tighter leading-tight">
                 {release.title}
               </h1>
               
               <p className="text-xl sm:text-2xl font-bold font-display text-foreground/80 dark:text-zinc-200">
                 by <span className="text-primary hover:underline">{release.artist}</span>
               </p>
            </div>

            {/* Streaming Links */}
            <div className="space-y-5">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/60 dark:text-zinc-400 flex items-center gap-2">
                 <Headphones className="w-4 h-4 text-primary" /> Watch / Listen Now
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {streamingLinks.length > 0 ? streamingLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-3 p-5 sm:p-6 bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 rounded-2xl hover:border-primary dark:hover:border-secondary hover:shadow-[5px_5px_0px_0px_#f00a88] dark:hover:shadow-[5px_5px_0px_0px_#ffc301] transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-foreground/5 dark:bg-white/5 flex items-center justify-center text-foreground dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-secondary group-hover:bg-primary/10 transition-colors border border-foreground/10 dark:border-white/10">
                        {link.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-foreground dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-secondary transition-colors text-center">{link.name}</span>
                    </a>
                  )) : (
                    <div className="col-span-2 p-6 rounded-2xl bg-card-bg/60 dark:bg-[#111113]/60 border-2 border-dashed border-foreground/15 dark:border-white/15 text-center">
                      <p className="text-foreground/60 dark:text-zinc-400 text-xs italic">Streaming links will be active once live on DSP platforms.</p>
                    </div>
                  )}
               </div>
            </div>

            {/* Meta Info */}
            <div className="pt-8 border-t-2 border-foreground/10 dark:border-white/10 text-[11px] font-bold text-foreground/60 dark:text-zinc-400 uppercase tracking-widest flex flex-wrap gap-x-10 gap-y-3">
               <div><span className="text-foreground dark:text-zinc-200 font-black">Label:</span> {release.labelName}</div>
               <div><span className="text-foreground dark:text-zinc-200 font-black">Copyright:</span> © {new Date(release.releaseDate).getFullYear()} {release.copyrightHolder || "Fastit"}</div>
               {release.upc && <div><span className="text-foreground dark:text-zinc-200 font-black">UPC:</span> {release.upc}</div>}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
