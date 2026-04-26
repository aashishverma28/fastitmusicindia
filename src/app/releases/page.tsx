"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Play, 
  Music, 
  Headphones, 
  Volume2, 
  Calendar, 
  Trash2, 
  Loader2,
  PlusCircle,
  X,
  Check,
  Disc,
  Upload
} from "lucide-react";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/supabase";
import { Image as ImageIcon } from "lucide-react";

export default function ReleasesPage() {
  const { data: session } = useSession();
  const [realReleases, setRealReleases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { setTrack } = useAudioStore();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artistName: "",
    coverArtUrl: "",
    genre: "Pop",
    releaseDate: new Date().toISOString().split('T')[0],
    audioFileUrl: "",
    slug: ""
  });
  const [isUploadingArtwork, setIsUploadingArtwork] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const isAdminOrStaff = session?.user?.role === "ADMIN" || session?.user?.role === "EMPLOYEE";

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/releases/public");
      const data = await res.json();
      if (data.releases) {
        setRealReleases(data.releases);
      }
    } catch (err) {
      console.error("Error fetching releases:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveRelease = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to remove this release from the public catalog?")) return;
    
    try {
      console.log(`Attempting to delete release: ${id}`);
      const res = await fetch(`/api/releases/manage/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setRealReleases(prev => prev.filter(r => r.id !== id));
      } else {
        const errorData = await res.json();
        alert(`Failed to remove release: ${errorData.error || "Unknown error"}\nDetails: ${errorData.details || "None"}`);
      }
    } catch (err) {
      console.error("Error removing release:", err);
      alert("An error occurred while removing the release.");
    }
  };

  const handleArtworkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingArtwork(true);
    try {
      const url = await uploadFile(file, "releases", "artwork");
      setFormData(prev => ({ ...prev, coverArtUrl: url }));
    } catch (err: any) {
      console.error("Artwork upload failed:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingArtwork(false);
    }
  };

  const handleAddRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/releases/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        // Format for UI
        const newRel = {
          id: data.release.id,
          title: data.release.title,
          artist: data.release.artistName,
          cover: data.release.coverArtUrl,
          genre: data.release.genre,
          releaseDate: data.release.releaseDate,
          audioUrl: data.release.audioFileUrl,
          slug: data.release.slug || data.release.id
        };
        setRealReleases(prev => [newRel, ...prev]);
        setIsModalOpen(false);
        setFormData({ title: "", artistName: "", coverArtUrl: "", genre: "Pop", releaseDate: new Date().toISOString().split('T')[0], audioFileUrl: "", slug: "" });
      } else {
        alert("Failed to add release.");
      }
    } catch (err) {
      console.error("Error adding release:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlay = (e: React.MouseEvent, rel: any) => {
    e.preventDefault();
    e.stopPropagation();
    setTrack({
      id: rel.id,
      title: rel.title,
      artist: rel.artist,
      cover: rel.cover,
      url: rel.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    });
  };

  const genres = ["All", "Pop", "Rock", "Hip Hop", "Electronic", "Folk", "Lo-Fi", "Classical", "Jazz", "Devotional"];

  const filteredReleases = realReleases.filter((rel: any) => {
    const matchesSearch = 
      rel.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      rel.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || (rel.genre && rel.genre.includes(selectedGenre));
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase"
            >
              The Sound of Fastit
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter"
            >
              Our <span className="gradient-text">Releases</span>
            </motion.h1>
            <p className="text-white/60 text-lg max-w-xl font-sans">
              Discover the latest independent sounds from across India, distributed globally through the Fastit network.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            {isAdminOrStaff && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-gradient px-6 py-3 rounded-full flex items-center gap-2 font-black text-xs tracking-widest uppercase hover:scale-105 transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Add Public Release
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
                  placeholder="Search tracks, artists..."
                  className="w-full sm:w-[300px] bg-surface-container/50 border border-white/5 rounded-full py-3 pl-12 pr-4 text-white focus:border-primary/50 outline-none transition-all font-sans"
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

        {/* Catalog Grid */}
        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-white/40 font-bold font-display uppercase tracking-widest">Loading Catalog...</p>
          </div>
        ) : filteredReleases.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          >
            {filteredReleases.map((rel: any) => (
              <motion.div 
                key={rel.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Removed delete button from here to move it to the end of the container */}
                
                <Link href={`/releases/${rel.slug}`} className="block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-surface-container-highest shadow-xl">
                    <Image 
                      src={rel.cover} 
                      alt={rel.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <button 
                        onClick={(e) => handlePlay(e, rel)}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl hover:scale-110 active:scale-90"
                      >
                        <Play className="fill-current w-8 h-8 ml-1" />
                      </button>
                    </div>

                    {/* Genre Tag */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80">
                        {rel.genre.split(' / ')[0]}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors truncate">
                      {rel.title}
                    </h3>
                    <p className="text-white/50 text-sm font-sans flex items-center gap-1.5 truncate">
                      <Music className="w-3 h-3" /> {rel.artist}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                       <Headphones className="w-4 h-4 text-white/20" />
                       <Volume2 className="w-4 h-4 text-white/20" />
                    </div>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">
                      Released {new Date(rel.releaseDate).getFullYear()}
                    </span>
                  </div>
                </Link>

                {isAdminOrStaff && (
                  <button 
                    onClick={(e) => handleRemoveRelease(e, rel.id)}
                    className="absolute top-4 right-4 z-[50] p-3 bg-red-500/90 border border-red-500/50 text-white rounded-xl hover:bg-red-600 hover:scale-110 transition-all backdrop-blur-md shadow-xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer"
                    title="Remove Release"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-40 text-center space-y-4">
            <Volume2 className="w-16 h-16 text-white/10 mx-auto" />
            <h3 className="text-2xl font-display font-bold text-white/40">No releases found matching your search.</h3>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedGenre("All")}}
              className="text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Add Release Modal */}
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
                className="relative w-full max-w-lg bg-surface-container p-8 rounded-[32px] border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black font-display text-white">Add <span className="text-primary">Manual</span> Release</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddRelease} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Track Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Artist Name(s)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Artist A, Artist B"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans"
                        value={formData.artistName}
                        onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Genre</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans appearance-none"
                        value={formData.genre}
                        onChange={(e) => setFormData({...formData, genre: e.target.value})}
                      >
                        {genres.filter(g => g !== "All").map(g => <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Release Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Track Artwork</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group aspect-square bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                        {formData.coverArtUrl ? (
                          <>
                            <img src={formData.coverArtUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />
                            <div className="relative z-10 text-center">
                              <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Ready</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-white/20 mb-2" />
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Upload Image</p>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                          onChange={handleArtworkUpload}
                          disabled={isUploadingArtwork}
                        />
                        {isUploadingArtwork && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col justify-center space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Or Use Image Link</label>
                        <input 
                          type="url" 
                          placeholder="https://..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans text-xs"
                          value={formData.coverArtUrl}
                          onChange={(e) => setFormData({...formData, coverArtUrl: e.target.value})}
                        />
                        <p className="text-[9px] text-white/20 italic px-2">Image2URL or direct hosting link supported.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Audio File URL (Direct MP3 link)</label>
                    <input 
                      type="url" 
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-primary outline-none transition-all font-sans"
                      value={formData.audioFileUrl}
                      onChange={(e) => setFormData({...formData, audioFileUrl: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isUploadingArtwork}
                    className="w-full btn-gradient py-5 rounded-2xl font-black font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isUploadingArtwork ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> UPLOADING ARTWORK...</>
                    ) : (
                      <><Check className="w-5 h-5" /> PUBLISH TRACK</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Newsletter / CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 glass rounded-3xl border border-white/10 relative overflow-hidden text-center md:text-left"
        >
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-black text-white">Never Miss a <span className="gradient-text">Beat.</span></h2>
                <p className="text-white/50 max-w-sm">Get notified about fresh drops, artist signings, and internal label news.</p>
              </div>
              <div className="flex w-full md:w-auto bg-white/5 rounded-full p-1.5 border border-white/10">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="bg-transparent border-none focus:ring-0 text-white px-6 w-full md:w-[300px] font-sans"
                />
                <button className="btn-gradient px-8 py-3 rounded-full font-bold text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
           </div>
           {/* Background Circles */}
           <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]"></div>
        </motion.div>
      </div>
    </div>
  );
}
