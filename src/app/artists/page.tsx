"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Users, Music2, ArrowRight, Star, Globe } from "lucide-react";
import { MOCK_ARTISTS } from "@/data/mock";

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = MOCK_ARTISTS.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase"
            >
              The Faces of Fastit
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter"
            >
              Featured <span className="text-secondary">Artists</span>
            </motion.h1>
            <p className="text-white/60 text-lg max-w-xl font-sans">
              From bedroom producers to regional icons, these are the visionaries shaping the future of Indian music.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
              <input 
                type="text" 
                placeholder="Find an artist..."
                className="w-full md:w-[400px] bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-6 text-white text-lg font-display placeholder:text-white/10 focus:border-secondary/50 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Artist Grid */}
        {filteredArtists.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {filteredArtists.map((artist) => (
              <motion.div 
                key={artist.id}
                variants={itemVariants}
                className="group flex flex-col items-center text-center"
              >
                <Link href={`/artists/${artist.slug}`} className="block w-full">
                  <div className="relative mb-8 mx-auto">
                    {/* Outer Glow / Ring */}
                    <div className="absolute inset-[-15px] rounded-full border border-white/5 group-hover:border-secondary/30 group-hover:bg-secondary/5 transition-all duration-500 -z-10"></div>
                    
                    {/* Main Image Wrapper */}
                    <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-surface-container-highest group-hover:border-secondary transition-colors duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                      <Image 
                        src={artist.avatar} 
                        alt={artist.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Stats Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm">
                         <div className="flex items-center gap-1 text-secondary font-black text-xl mb-1">
                            <Users className="w-5 h-5" /> {artist.followers}
                         </div>
                         <p className="text-white/60 text-xs font-bold uppercase tracking-widest px-4">Followers</p>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute bottom-4 right-8 bg-secondary text-black p-2 rounded-full shadow-lg border-4 border-[#0e0e0e] group-hover:scale-110 transition-transform">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-black font-display text-white group-hover:text-secondary transition-colors">
                      {artist.name}
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-white/40 text-sm font-bold uppercase tracking-widest">{artist.genre}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-secondary font-bold text-sm bg-secondary/10 px-6 py-2 rounded-full border border-secondary/20">
                      View Profile <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-40 text-center">
             <div className="mb-6 bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Users className="w-10 h-10 text-white/20" />
             </div>
             <p className="text-white/40 text-xl font-display font-bold">No artists found matching your search.</p>
          </div>
        )}

        {/* Global Shoutout Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-white/5 pt-24"
        >
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
              A Global Stage for <span className="text-secondary">Local Voices.</span>
            </h2>
            <p className="text-white/60 text-xl leading-relaxed font-sans">
              We believe the next global superstar is currently recording in a small studio in Assam, Kerala, or Punjab. Fastit exists to ensure they aren&apos;t just heard—but discovered.
            </p>
            <div className="flex gap-10">
              <div className="space-y-1">
                <p className="text-4xl font-black text-white font-display">150+</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Platforms</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-white font-display">90%</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Revenue Share</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-white font-display">24/7</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Human Support</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="glass p-8 rounded-3xl border border-white/10 relative z-10">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                   <Globe className="w-12 h-12 text-secondary" />
                   <h3 className="text-2xl font-black font-display text-white">Global Reach</h3>
                </div>
                <div className="space-y-6">
                   <p className="text-white/60 font-sans leading-relaxed">
                      Our distribution network connects you to fans in Tokyo, New York, London, and beyond. With localized marketing support and playlist pitching, we make sure your music travels further.
                   </p>
                   <Link href="/apply" className="flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold w-full hover:bg-neutral-200 transition-colors">
                      Join the Artist Roster <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
             </div>
             {/* Background glow behind card */}
             <div className="absolute inset-0 bg-secondary/10 blur-[80px] -z-10 transform translate-x-4 translate-y-4"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
