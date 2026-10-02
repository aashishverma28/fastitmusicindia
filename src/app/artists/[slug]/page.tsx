"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Users, 
  Play, 
  Instagram, 
  Twitter, 
  Youtube, 
  Star,
  Music,
  Disc,
  ArrowRight,
  Verified,
  Loader2,
  Mail
} from "lucide-react";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { notFound } from "next/navigation";

export default function ArtistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: id } = use(params);
  const [artist, setArtist] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setTrack } = useAudioStore();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`/api/artists/public/${id}`);
        const data = await res.json();
        if (data.artist) {
          setArtist(data.artist);
        } else {
          setArtist(null);
        }
      } catch (err) {
        console.error("Error fetching artist detail:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-12 h-12 text-secondary animate-spin" />
      </div>
    );
  }

  if (!artist) {
    notFound();
  }

  const handlePlayTrack = (e: React.MouseEvent, rel: any) => {
    e.preventDefault();
    e.stopPropagation();
    setTrack({
      id: rel.id,
      title: rel.title,
      artist: artist.name,
      cover: rel.cover,
      url: rel.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Dynamic Ambient Background with Blur */}
      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden -z-10 pointer-events-none select-none">
        <Image 
          src={artist.avatar} 
          alt={artist.name} 
          fill 
          priority
          className="object-cover opacity-15 dark:opacity-25 blur-[90px] scale-110" 
        />
        {/* Harmonious gradient transition matching active theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background dark:via-[#080809]/80 dark:to-[#080809]" />
        
        {/* Neubrutalist Ambient Flares */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/15 dark:bg-secondary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-8 lg:mb-12">
          <Link 
            href="/artists" 
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground dark:text-zinc-400 dark:hover:text-secondary transition-colors font-bold group text-sm sm:text-base px-3 py-1.5 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" /> Back to Artists
          </Link>
        </div>

        {/* Profile Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 lg:mb-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 sm:border-8 border-foreground/15 dark:border-white/15 shadow-[8px_8px_0px_0px_#ffc301] dark:shadow-[8px_8px_0px_0px_#ffc301] bg-card-bg">
              <Image 
                src={artist.avatar} 
                alt={artist.name} 
                fill 
                priority
                className="object-cover" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                 <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 dark:bg-secondary/15 border-2 border-secondary text-foreground dark:text-secondary font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#f00a88]">
                    <Verified className="w-4 h-4 fill-secondary text-foreground dark:text-black" /> Verified Artist
                 </div>
                 {artist.genre && (
                   <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/15 dark:border-white/15 text-foreground/80 dark:text-zinc-300 font-bold uppercase text-[11px] tracking-widest">
                      <Music className="w-3.5 h-3.5 text-primary" /> {artist.genre}
                   </div>
                 )}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display text-foreground tracking-tighter leading-tight lg:leading-none">
                {artist.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                 <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/10 dark:border-white/10 shadow-[3px_3px_0px_0px_#00b0fc]">
                    <Disc className="w-6 h-6 text-primary dark:text-secondary" />
                    <span className="text-2xl sm:text-3xl font-black font-display text-foreground">{artist.totalStreams ? artist.totalStreams.toLocaleString() : "0"}</span>
                    <span className="text-foreground/60 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-widest mt-1">Total Plays</span>
                 </div>
              </div>
            </div>

            <p className="text-foreground/80 dark:text-zinc-300 text-lg sm:text-xl font-sans leading-relaxed max-w-2xl whitespace-pre-line font-medium">
              {artist.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
               <div className="flex gap-3 sm:gap-4 items-center">
                  {artist.email && (
                    <a 
                      href={`mailto:${artist.email}`} 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 flex items-center justify-center text-foreground dark:text-zinc-100 hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-black hover:border-foreground dark:hover:border-white transition-all shadow-[3px_3px_0px_0px_#00b0fc]" 
                      title={`Contact: ${artist.email}`}
                    >
                       <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  )}
                  {artist.links?.instagram && (
                    <a 
                      href={artist.links.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 flex items-center justify-center text-foreground dark:text-zinc-100 hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-black hover:border-foreground dark:hover:border-white transition-all shadow-[3px_3px_0px_0px_#f00a88]" 
                      title="Instagram"
                    >
                       <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  )}
                  {artist.links?.twitter && (
                    <a 
                      href={artist.links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 flex items-center justify-center text-foreground dark:text-zinc-100 hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-black hover:border-foreground dark:hover:border-white transition-all shadow-[3px_3px_0px_0px_#00b0fc]" 
                      title="Twitter"
                    >
                       <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  )}
                  {artist.links?.youtube && (
                    <a 
                      href={artist.links.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card-bg dark:bg-[#111113] border-2 border-foreground/15 dark:border-white/15 flex items-center justify-center text-foreground dark:text-zinc-100 hover:bg-secondary hover:text-black dark:hover:bg-secondary dark:hover:text-black hover:border-foreground dark:hover:border-white transition-all shadow-[3px_3px_0px_0px_#ffc301]" 
                      title="YouTube"
                    >
                       <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  )}
               </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
           {/* Discography */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-8 space-y-8 lg:space-y-10"
           >
              <div className="flex justify-between items-end border-b-2 border-foreground/10 dark:border-white/10 pb-6 sm:pb-8">
                 <h2 className="text-3xl sm:text-4xl font-black font-display text-foreground tracking-tight">
                   Main <span className="text-primary dark:text-secondary">Catalog.</span>
                 </h2>
                 <Link 
                   href="/releases" 
                   className="text-foreground/70 dark:text-zinc-400 font-bold hover:text-primary dark:hover:text-secondary transition-colors text-xs sm:text-sm flex items-center gap-1.5"
                 >
                   View all discs <ArrowRight className="w-3.5 h-3.5" />
                 </Link>
              </div>

              <div className="space-y-4">
                 {artist.releases && artist.releases.length > 0 ? (
                    artist.releases.map((rel: any) => (
                       <Link 
                        key={rel.id} 
                        href={`/releases/${rel.slug}`}
                        className="group flex items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-card-bg dark:bg-[#111113] rounded-2xl border-2 border-foreground/10 dark:border-white/10 hover:border-primary dark:hover:border-secondary hover:shadow-[5px_5px_0px_0px_#f00a88] dark:hover:shadow-[5px_5px_0px_0px_#ffc301] transition-all"
                       >
                          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-md border-2 border-foreground/15 dark:border-white/15 flex-shrink-0 bg-background">
                             <Image 
                               src={rel.cover} 
                               alt={rel.title} 
                               fill 
                               className="object-cover group-hover:scale-105 transition-transform duration-500" 
                             />
                          </div>
                          <div className="flex-grow min-w-0">
                             <h4 className="text-lg sm:text-xl font-black text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors truncate">
                               {rel.title}
                             </h4>
                             <p className="text-foreground/60 dark:text-zinc-400 text-xs sm:text-sm font-sans tracking-tight font-medium mt-0.5">
                               Released {new Date(rel.releaseDate).getFullYear()}
                             </p>
                          </div>
                          <div className="flex items-center gap-4 sm:gap-8 pr-1 sm:pr-4 flex-shrink-0">
                             <div className="hidden md:flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase text-foreground/50 dark:text-zinc-400 tracking-widest mb-1">Total Streams</span>
                                <span className="font-mono font-bold text-foreground dark:text-zinc-200">{rel.streams ? rel.streams.toLocaleString() : "0"}</span>
                             </div>
                             <button
                               onClick={(e) => handlePlayTrack(e, rel)}
                               aria-label={`Play ${rel.title}`}
                               className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-foreground/20 dark:border-white/20 bg-foreground/5 dark:bg-white/5 text-foreground dark:text-white flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary dark:group-hover:bg-secondary dark:group-hover:text-black dark:group-hover:border-secondary transition-all shadow-sm cursor-pointer"
                             >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                             </button>
                          </div>
                       </Link>
                    ))
                 ) : (
                    <div className="py-20 text-center bg-card-bg/50 dark:bg-[#111113]/50 rounded-3xl border-2 border-dashed border-foreground/15 dark:border-white/15 space-y-4">
                       <Disc className="w-12 h-12 text-foreground/30 dark:text-zinc-600 mx-auto" />
                       <p className="text-foreground/60 dark:text-zinc-400 font-bold">New music coming soon.</p>
                    </div>
                 )}
              </div>
           </motion.div>

           {/* Sidebar Info */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-4 space-y-8 sm:space-y-10"
           >
               <div className="bg-card-bg dark:bg-[#111113] p-6 sm:p-8 rounded-3xl border-2 border-foreground/15 dark:border-white/10 shadow-[5px_5px_0px_0px_#00b0fc] space-y-6 sm:space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70 dark:text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent-blue" /> Artist Stats
                  </h3>
                  <div className="space-y-5">
                     <div className="flex justify-between items-center pb-3 border-b border-foreground/10 dark:border-white/5">
                        <span className="text-foreground/75 dark:text-zinc-400 text-sm font-sans font-medium">Monthly Listeners</span>
                        <span className="text-foreground dark:text-zinc-100 font-bold font-mono text-base">{artist.monthlyListeners ? artist.monthlyListeners.toLocaleString() : "0"}</span>
                     </div>
                     <div className="flex justify-between items-center pb-3 border-b border-foreground/10 dark:border-white/5">
                        <span className="text-foreground/75 dark:text-zinc-400 text-sm font-sans font-medium">Track Plays</span>
                        <span className="text-foreground dark:text-zinc-100 font-bold font-mono text-base">{artist.totalStreams ? artist.totalStreams.toLocaleString() : "0"}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-foreground/75 dark:text-zinc-400 text-sm font-sans font-medium">Global Rank</span>
                        <span className="text-primary dark:text-secondary font-black font-display uppercase tracking-widest text-xs px-2.5 py-1 rounded-md bg-primary/10 dark:bg-secondary/10 border border-primary/20 dark:border-secondary/20">
                          {artist.totalStreams ? (artist.totalStreams > 400000 ? "Top 1%" : artist.totalStreams > 250000 ? "Top 5%" : artist.totalStreams > 100000 ? "Top 10%" : "Top 25%") : "Top 25%"}
                        </span>
                     </div>
                  </div>
               </div>

               {artist.platformStats && artist.platformStats.length > 0 && (
                 <div className="bg-card-bg dark:bg-[#111113] p-6 sm:p-8 rounded-3xl border-2 border-foreground/15 dark:border-white/10 shadow-[5px_5px_0px_0px_#ffc301] space-y-6 sm:space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70 dark:text-zinc-400 flex items-center gap-2">
                      <Disc className="w-4 h-4 text-secondary" /> Platform Breakdown
                    </h3>
                    <div className="space-y-4">
                       {artist.platformStats.map((stat: any) => (
                          <div key={stat.platform} className="flex justify-between items-center pb-2.5 border-b border-foreground/10 dark:border-white/5 last:border-0 last:pb-0">
                             <span className="text-foreground/75 dark:text-zinc-400 text-sm font-sans font-medium">{stat.platform}</span>
                             <span className="text-foreground dark:text-zinc-100 font-bold font-mono text-sm sm:text-base">{stat.streams.toLocaleString()} plays</span>
                          </div>
                       ))}
                    </div>
                 </div>
               )}

              <div className="p-6 sm:p-8 rounded-3xl border-2 border-secondary/60 bg-secondary/15 dark:bg-secondary/10 shadow-[5px_5px_0px_0px_#f00a88] space-y-6">
                 <div className="flex items-center gap-2">
                   <Star className="w-4 h-4 text-secondary fill-secondary" />
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground dark:text-secondary">Join the Roster</h3>
                 </div>
                 <p className="text-foreground/80 dark:text-zinc-300 text-sm font-sans leading-relaxed">
                   Are you inspired by <b>{artist.name}</b>? We are currently reviewing new applications for the upcoming distribution cycle.
                 </p>
                 <Link 
                   href="/apply" 
                   className="btn-neubrutalist py-3.5 px-6 rounded-none flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest w-full shadow-md"
                 >
                   APPLY NOW <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
