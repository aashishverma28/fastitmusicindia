"use client";

import { use } from "react";
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
  Globe, 
  Star,
  Music,
  Disc,
  ArrowRight,
  Verified
} from "lucide-react";
import { MOCK_ARTISTS, MOCK_RELEASES } from "@/data/mock";
import { notFound } from "next/navigation";

export default function ArtistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const artist = MOCK_ARTISTS.find(a => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = MOCK_RELEASES.filter(r => r.artist === artist.name);

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Hero Background with Blur */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
        <Image 
          src={artist.avatar} 
          alt={artist.name} 
          fill 
          className="object-cover opacity-20 blur-[100px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/80 to-[#0e0e0e]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/artists" className="flex items-center gap-2 text-white/40 hover:text-secondary transition-colors font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Artists
          </Link>
        </div>

        {/* Profile Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-surface-container-highest shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <Image 
                src={artist.avatar} 
                alt={artist.name} 
                fill 
                className="object-cover" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                 <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-black text-xs uppercase tracking-widest">
                    <Verified className="w-4 h-4 fill-current" /> Verified Artist
                 </div>
                 <div className="flex items-center gap-2 text-white/40 font-bold uppercase text-[10px] tracking-widest">
                    <Music className="w-3 h-3" /> {artist.genre}
                 </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter leading-none">
                {artist.name}
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-8">
                 <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-white/20" />
                    <span className="text-2xl font-black font-display text-white">{artist.followers}</span>
                    <span className="text-white/40 font-bold uppercase text-[10px] tracking-widest mt-1">Followers</span>
                 </div>
              </div>
            </div>

            <p className="text-white/60 text-xl font-sans leading-relaxed max-w-2xl">
              Independent artist making waves from the heart of India. Collaborating with international producers to redefine the future of {artist.genre} on a global scale.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
               <button className="btn-gradient px-12 py-5 rounded-2xl font-black font-display text-xl flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-[0.98] transition-all">
                  <Play className="fill-current w-6 h-6" /> FOLLOW ARTIST
               </button>
               <div className="flex gap-4 ml-4">
                  <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white">
                     <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white">
                     <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white">
                     <Globe className="w-6 h-6" />
                  </a>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
           {/* Discography */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-8 space-y-12"
           >
              <div className="flex justify-between items-end border-b border-white/5 pb-8">
                 <h2 className="text-4xl font-black font-display text-white tracking-tight">Main <span className="text-secondary">Catalog.</span></h2>
                 <Link href="/releases" className="text-white/40 font-bold hover:text-secondary transition-colors text-sm">View all discs</Link>
              </div>

              <div className="space-y-4">
                 {artistReleases.length > 0 ? (
                    artistReleases.map((rel, i) => (
                       <Link 
                        key={rel.id} 
                        href={`/releases/${rel.slug}`}
                        className="group flex items-center gap-8 p-6 glass rounded-2xl border border-white/0 hover:border-secondary/20 hover:bg-secondary/5 transition-all"
                       >
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg border border-white/10">
                             <Image src={rel.cover} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-grow">
                             <h4 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">{rel.title}</h4>
                             <p className="text-white/40 text-sm font-sans tracking-tight">Released {new Date(rel.releaseDate).getFullYear()}</p>
                          </div>
                          <div className="flex items-center gap-8 pr-4">
                             <div className="hidden md:flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">Total Streams</span>
                                <span className="font-mono text-white/60">2.4M</span>
                             </div>
                             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-black transition-all">
                                <Play className="w-5 h-5 fill-current" />
                             </div>
                          </div>
                       </Link>
                    ))
                 ) : (
                    <div className="py-20 text-center glass rounded-3xl border border-white/5 space-y-4">
                       <Disc className="w-12 h-12 text-white/10 mx-auto" />
                       <p className="text-white/40 font-bold">New music coming soon.</p>
                    </div>
                 )}
              </div>
           </motion.div>

           {/* Sidebar Info */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-4 space-y-12"
           >
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Artist Stats</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-white/40 text-sm font-sans">Monthly Listeners</span>
                       <span className="text-white font-bold font-mono">1.2M+</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-white/40 text-sm font-sans">Track Plays</span>
                       <span className="text-white font-bold font-mono">15M+</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-white/40 text-sm font-sans">Global Rank</span>
                       <span className="text-secondary font-black font-display uppercase tracking-widest text-xs">Top 1%</span>
                    </div>
                 </div>
              </div>

              <div className="glass p-8 rounded-3xl border border-secondary/10 bg-secondary/5 space-y-6">
                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Join the Roster</h3>
                 <p className="text-white/60 text-sm font-sans italic leading-relaxed">
                   Are you the next <b>{artist.name}</b>? We are currently reviewing new applications for the Summer distribution cycle.
                 </p>
                 <Link href="/apply" className="flex items-center justify-center gap-2 bg-secondary text-black py-4 rounded-xl font-bold w-full hover:shadow-[0_0_20px_rgba(255,215,9,0.3)] transition-all">
                   APPLY NOW <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
