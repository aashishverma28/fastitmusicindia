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
  Verified, 
  Check,
  X,
  Upload,
  Instagram,
  Youtube,
  Twitter
} from "lucide-react";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/supabase";
import { Disc } from "lucide-react";

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

  const isAdminOrStaff = session?.user?.role === "ADMIN" || session?.user?.role === "EMPLOYEE";

  useEffect(() => {
    fetchArtists();
  }, []);

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
      const url = await uploadFile(file, "artists", "avatars");
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
        body: JSON.stringify(formData)
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase"
            >
              Independent & Global
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter"
            >
              The <span className="gradient-text">Artists</span>
            </motion.h1>
            <p className="text-white/60 text-lg max-w-xl font-sans">
              Meet the creators who are defining the next era of Indian independent music. Distributed and powered by Fastit.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            {isAdminOrStaff && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-gradient px-6 py-3 rounded-full flex items-center gap-2 font-black text-xs tracking-widest uppercase hover:scale-105 transition-all"
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Search artists..."
                  className="w-full sm:w-[300px] bg-surface-container/50 border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:border-secondary/50 outline-none transition-all font-sans"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-surface-container/50 border border-white/5 rounded-full px-4 py-2">
                <Filter className="w-4 h-4 text-white/30" />
                <select 
                  className="bg-transparent text-white text-sm font-bold outline-none cursor-pointer pr-4"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map(g => <option key={g} value={g} className="bg-[#0e0e0e]">{g}</option>)}
                </select>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Artists Grid */}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
          >
            {filteredArtists.map((artist: any) => (
              <motion.div 
                key={artist.id}
                variants={itemVariants}
                className="group"
              >
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 bg-surface-container-highest shadow-2xl">
                  {isAdminOrStaff && (
                    <button 
                      onClick={(e) => handleRemoveArtist(e, artist.id)}
                      className="absolute top-0 right-0 z-20 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100"
                      title="Remove Artist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  
                  <Link href={`/artists/${artist.slug}`} className="block w-full h-full">
                    <Image 
                      src={artist.avatar} 
                      alt={artist.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <h3 className="text-2xl font-black font-display text-white tracking-tight">{artist.name}</h3>
                           {artist.isVerified && <Verified className="w-4 h-4 text-secondary fill-current" />}
                        </div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{artist.genre}</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex justify-between items-center px-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/20" />
                    <span className="text-white/40 text-sm font-mono">{artist.followers}</span>
                  </div>
                  <div className="flex gap-3">
                    {artist.instagramUrl && (
                      <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/50 transition-all">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {artist.spotifyUrl && (
                      <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#1DB954] hover:border-[#1DB954]/50 transition-all">
                        <Disc className="w-4 h-4" />
                      </a>
                    )}
                    {artist.youtubeUrl && (
                      <a href={artist.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FF0000] hover:border-[#FF0000]/50 transition-all">
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <Link 
                    href={`/artists/${artist.slug}`}
                    className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-secondary hover:border-secondary/50 transition-all"
                  >
                    <Music className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
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

        {/* Add Artist Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-surface-container p-8 rounded-[32px] border border-white/10 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-8">
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Genre</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans appearance-none"
                        value={formData.genre}
                        onChange={(e) => setFormData({...formData, genre: e.target.value})}
                      >
                        {genres.filter(g => g !== "All").map(g => <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Followers</label>
                      <input 
                        type="text" 
                        placeholder="1.2M+"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans"
                        value={formData.followers}
                        onChange={(e) => setFormData({...formData, followers: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Artist Avatar</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group aspect-square bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
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
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
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
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
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
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.spotifyUrl}
                          onChange={(e) => setFormData({...formData, spotifyUrl: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 ml-2">
                          <Youtube className="w-3 h-3 text-white/20" />
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">YouTube</label>
                        </div>
                        <input 
                          type="url" 
                          placeholder="Link"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.youtubeUrl}
                          onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 ml-2">
                          <Twitter className="w-3 h-3 text-white/20" />
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Twitter</label>
                        </div>
                        <input 
                          type="url" 
                          placeholder="Link"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:border-secondary outline-none transition-all font-sans text-xs"
                          value={formData.twitterUrl}
                          onChange={(e) => setFormData({...formData, twitterUrl: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Custom Slug (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="artist-name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isUploadingAvatar}
                    className="w-full btn-gradient py-5 rounded-2xl font-black font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50"
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
          className="mt-32 p-12 glass rounded-[40px] border border-white/10 relative overflow-hidden text-center md:text-left"
        >
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-black text-white">Join the <span className="gradient-text">Movement.</span></h2>
                <p className="text-white/50 max-w-sm">Ready to take your music career to the next level? Join thousands of independent artists on Fastit.</p>
              </div>
              <Link href="/apply" className="btn-gradient px-12 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all">
                Submit Your Music
              </Link>
           </div>
           {/* Background Circles */}
           <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]"></div>
        </motion.div>
      </div>
    </div>
  );
}
