"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Users, 
  Music, 
  UserPlus, 
  Trash2, 
  Loader2,
  X,
  Check,
  Upload,
  Instagram
} from "lucide-react";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/supabase";
import { Disc } from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, BadgeStamp } from "@/components/shared/Doodles";

export default function ArtistsPage() {
  const { data: session } = useSession();
  const [realArtists, setRealArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    genre: "Pop",
    avatar: "",
    followers: "10K+",
    slug: "",
    instagramUrl: "",
    spotifyUrl: "",
    youtubeUrl: "",
    twitterUrl: ""
  });
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [publicReleases, setPublicReleases] = useState<any[]>([]);
  const [selectedReleaseIds, setSelectedReleaseIds] = useState<string[]>([]);

  const isAdminOrStaff = session?.user?.role === "ADMIN" || session?.user?.role === "EMPLOYEE";

  useEffect(() => {
    fetchArtists();
    fetchPublicReleases();
  }, []);

  const fetchPublicReleases = async () => {
    try {
      const res = await fetch("/api/releases/public");
      const data = await res.json();
      if (data.releases) {
        setPublicReleases(data.releases);
      }
    } catch (err) {
      console.error("Error fetching public releases:", err);
    }
  };

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/artists/public");
      const data = await res.json();
      if (data.artists) {
        setRealArtists(data.artists);
      }
    } catch (err) {
      console.error("Error fetching artists:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveArtist = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to remove this artist from the public list?")) return;
    
    try {
      const res = await fetch(`/api/artists/manage/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRealArtists(prev => prev.filter(a => a.id !== id));
      } else {
        alert("Failed to remove artist.");
      }
    } catch (err) {
      console.error("Error removing artist:", err);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const url = await uploadFile(file, "releases", "artists");
      setFormData(prev => ({ ...prev, avatar: url }));
    } catch (err: any) {
      console.error("Avatar upload failed:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleAddArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/artists/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedReleaseIds
        })
      });
      if (res.ok) {
        const data = await res.json();
        setRealArtists(prev => [...prev, data.artist]);
        setIsModalOpen(false);
        setFormData({ 
          name: "", 
          genre: "Pop", 
          avatar: "", 
          followers: "10K+", 
          slug: "",
          instagramUrl: "",
          spotifyUrl: "",
          youtubeUrl: "",
          twitterUrl: ""
        });
        setSelectedReleaseIds([]);
      } else {
        alert("Failed to add artist.");
      }
    } catch (err) {
      console.error("Error adding artist:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = ["All", "Pop", "Rock", "Hip Hop", "Electronic", "Folk", "Lo-Fi", "Classical", "Jazz", "Devotional"];

  const filteredArtists = realArtists.filter((artist: any) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || artist.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 relative overflow-visible">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Stamp badge */}
        <div className="absolute top-10 right-20 hidden lg:block z-20">
          <BadgeStamp text="Fierce Talents" type="pink" />
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 relative">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 border-2 border-white text-secondary font-bold text-xs tracking-widest uppercase bg-black shadow-[3px_3px_0px_0px_#ffc301]"
            >
              Independent & Global
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter leading-none relative inline-block"
            >
              The <span className="relative inline-block pr-1 text-primary">Artists.<ScribbleUnderlineDouble color="#00b0fc" /></span>
              
              {/* Annotation doodle */}
              <div className="absolute -top-12 left-[105%] hidden md:block">
                <CurlyArrow direction="left" className="w-14 h-14 text-secondary rotate-12" />
                <span className="absolute -top-4 left-10 font-handwriting text-secondary text-xl w-32 leading-none rotate-3">
                  Meet our creators!
                </span>
              </div>
            </motion.h1>
            <p className="text-white/70 text-lg max-w-xl font-sans font-semibold">
              Meet the independent creators defining the next wave of Indian music. Distributed and supported by Fastit.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 w-full md:w-auto z-20 relative">
            {isAdminOrStaff && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-neubrutalist px-6 py-3 rounded-none flex items-center gap-2 font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-md"
              >
                <UserPlus className="w-4 h-4" /> Add Public Artist
              </button>
            )}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search artists..."
                  className="w-full sm:w-[280px] bg-black border-2 border-white rounded-none py-3 pl-12 pr-4 text-white shadow-[3px_3px_0px_0px_#f00a88] outline-none transition-all font-sans text-sm font-semibold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-black border-2 border-white rounded-none px-4 py-2 shadow-[3px_3px_0px_0px_#00b0fc]">
                <Filter className="w-4 h-4 text-white/40" />
                <select 
                  className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer pr-4"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map(g => <option key={g} value={g} className="bg-[#0b0b0c]">{g}</option>)}
                </select>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Artists Grid (styled as scrapbook polaroids) */}
        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-white/40 font-bold font-display uppercase tracking-widest">Discovering Talents...</p>
          </div>
        ) : filteredArtists.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-14"
          >
            {filteredArtists.map((artist: any, idx: number) => {
              const tiltClass = idx % 2 === 0 ? "-rotate-1.5" : "rotate-1.5";
              return (
                <motion.div 
                  key={artist.id}
                  variants={itemVariants}
                  className="flex flex-col items-center group relative"
                >
                  {isAdminOrStaff && (
                    <button 
                      onClick={(e) => handleRemoveArtist(e, artist.id)}
                      className="absolute -top-3 right-4 z-40 p-2 bg-red-600 border border-red-700 text-white rounded-xl hover:bg-red-700 transition-all shadow-xl opacity-0 group-hover:opacity-100"
                      title="Remove Artist"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {/* Polaroid Photo Frame */}
                  <div className={`polaroid-card w-full max-w-[280px] ${tiltClass}`}>
                    <Link href={`/artists/${artist.slug}`} className="block">
                      <div className="relative aspect-square w-full rounded-none bg-zinc-800 border-2 border-black/40 overflow-hidden mb-4">
                        <Image 
                          src={artist.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"} 
                          alt={artist.name} 
                          fill 
                          className="object-cover transition-transform duration-700 hover:scale-105 grayscale group-hover:grayscale-0" 
                        />
                      </div>
                    </Link>
                    <div className="flex items-center justify-between px-1">
                      <Link href={`/artists/${artist.slug}`} className="block truncate max-w-[170px]">
                        <span className="font-handwriting text-zinc-900 text-2.5xl leading-none truncate block">
                          {artist.name}
                        </span>
                      </Link>
                      <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 shrink-0">
                        {artist.genre.split(" / ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Polaroid Footer/Indicators */}
                  <div className="flex justify-between items-center w-full max-w-[280px] px-3 mt-4 group-hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-white/25" />
                      <span className="text-white/45 text-xs font-mono">{artist.followers} fans</span>
                    </div>
                    <div className="flex gap-2">
                      {artist.instagramUrl && (
                        <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/50 transition-all">
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {artist.spotifyUrl && (
                        <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all">
                          <Disc className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <Link 
                      href={`/artists/${artist.slug}`}
                      className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/50 transition-all"
                    >
                      <Music className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="py-40 text-center space-y-4">
            <Users className="w-16 h-16 text-white/10 mx-auto" />
            <h3 className="text-2xl font-display font-bold text-white/40">No artists found in this category.</h3>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedGenre("All")}}
              className="text-secondary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Add Artist Modal (Neubrutalist Pop style) */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-[#111113] p-5 sm:p-8 rounded-none border-3 border-white shadow-[8px_8px_0px_0px_#ffc301] z-10"
              >
                <div className="flex justify-between items-center mb-5 sm:mb-8">
                  <h2 className="text-2xl font-black font-display text-white">Add <span className="text-secondary">Manual</span> Artist</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddArtist} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Artist Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aashish Verma"
                      className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  {/* Select Artist Songs / Releases */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Select Artist Songs / Releases</label>
                    <div className="w-full bg-black border-2 border-white rounded-none p-3.5 max-h-40 overflow-y-auto space-y-2.5">
                      {publicReleases.length > 0 ? (
                        publicReleases.map((rel: any) => (
                          <label key={rel.id} className="flex items-center gap-3 text-white text-xs font-sans cursor-pointer hover:bg-white/5 p-1 select-none">
                            <input 
                              type="checkbox"
                              checked={selectedReleaseIds.includes(rel.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedReleaseIds(prev => [...prev, rel.id]);
                                } else {
                                  setSelectedReleaseIds(prev => prev.filter(id => id !== rel.id));
                                }
                              }}
                              className="rounded bg-black border-white/20 text-secondary focus:ring-0 w-4 h-4 cursor-pointer"
                            />
                            <span className="truncate">{rel.title} <span className="text-white/40 text-[10px]">({rel.artist})</span></span>
                          </label>
                        ))
                      ) : (
                        <p className="text-white/30 text-xs text-center py-4">No releases available to select</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Artist Avatar</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group aspect-square bg-black border-2 border-white rounded-none overflow-hidden flex flex-col items-center justify-center p-4">
                        {formData.avatar ? (
                          <>
                            <img src={formData.avatar} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />
                            <div className="relative z-10 text-center">
                              <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Ready</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-white/20 mb-2" />
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Upload Photo</p>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                          onChange={handleAvatarUpload}
                          disabled={isUploadingAvatar}
                        />
                        {isUploadingAvatar && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
                            <Loader2 className="w-6 h-6 text-secondary animate-spin" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col justify-center space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Or Use Image Link</label>
                        <input 
                          type="url" 
                          placeholder="https://..."
                          className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.avatar}
                          onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2 pt-4 border-t border-white/5">Social Accounts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 ml-2">
                          <Instagram className="w-3 h-3 text-white/20" />
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Instagram</label>
                        </div>
                        <input 
                          type="url" 
                          placeholder="Link"
                          className="w-full bg-black border-2 border-white rounded-none py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.instagramUrl}
                          onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 ml-2">
                          <Disc className="w-3 h-3 text-white/20" />
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Spotify</label>
                        </div>
                        <input 
                          type="url" 
                          placeholder="Link"
                          className="w-full bg-black border-2 border-white rounded-none py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.spotifyUrl}
                          onChange={(e) => setFormData({...formData, spotifyUrl: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Custom Slug (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="artist-slug"
                      className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isUploadingAvatar}
                    className="w-full btn-neubrutalist py-5 rounded-none font-black font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isUploadingAvatar ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> UPLOADING PHOTO...</>
                    ) : (
                      <><Check className="w-5 h-5" /> PUBLISH TO PAGE</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Action Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 border-3 border-white bg-[#111113] shadow-[6px_6px_0px_0px_#f00a88] relative overflow-hidden text-center md:text-left rounded-none"
        >
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-black text-white">Join the <span className="relative inline-block pr-1 text-secondary">Movement.<ScribbleUnderline color="#ffc301" /></span></h2>
                <p className="text-white/70 max-w-sm font-sans font-semibold text-sm">Ready to release your music globally? Join thousands of independent creators on Fastit.</p>
              </div>
              <Link href="/apply" className="btn-neubrutalist px-12 py-4.5 rounded-none font-black text-xs tracking-widest uppercase hover:scale-105 transition-all block text-center">
                Submit Your Music
              </Link>
           </div>
           <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]"></div>
        </motion.div>
      </div>
    </div>
  );
}
