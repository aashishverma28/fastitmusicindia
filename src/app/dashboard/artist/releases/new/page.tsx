"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  Disc, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Upload,
  Calendar,
  Layers,
  Globe,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { supabase, uploadFile } from "@/lib/supabase";

const steps = [
  { id: 1, name: "Metadata", icon: <Disc className="w-5 h-5" /> },
  { id: 2, name: "Tracks", icon: <Music className="w-5 h-5" /> },
  { id: 3, name: "Artwork", icon: <ImageIcon className="w-5 h-5" /> },
  { id: 4, name: "Review", icon: <CheckCircle2 className="w-5 h-5" /> },
];

export default function NewReleasePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    type: "Single",
    genre: "",
    subGenre: "",
    language: "",
    releaseDate: "",
    copyrightHolder: "",
    copyrightYear: new Date().getFullYear(),
    isExplicit: false,
    tracks: [{ title: "", audioUrl: "", artist: "" }],
    artworkUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTrack = () => {
    setFormData(prev => ({
      ...prev,
      tracks: [...prev.tracks, { title: "", audioUrl: "", artist: "" }]
    }));
  };

  const removeTrack = (index: number) => {
    if (formData.tracks.length === 1) return;
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index)
    }));
  };

  const updateTrack = (index: number, field: string, value: string) => {
    const newTracks = [...formData.tracks];
    newTracks[index] = { ...newTracks[index], [field]: value };
    setFormData(prev => ({ ...prev, tracks: newTracks }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "artworkUrl" | "trackAudio", index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size Validation
    const maxSize = field === "trackAudio" ? 100 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Max size is ${field === "trackAudio" ? "100MB" : "50MB"}.`);
      return;
    }

    const uploadId = index !== undefined ? `track-${index}` : "artwork";
    setUploadingField(uploadId);
    setError("");
    
    try {
      const bucket = field === "trackAudio" ? "releases" : "releases"; // Both can go to releases bucket in different folders
      const folder = field === "trackAudio" ? "audio" : "artwork";
      const url = await uploadFile(file, bucket, folder);
      
      if (field === "artworkUrl") {
        updateFormData("artworkUrl", url);
      } else if (index !== undefined) {
        updateTrack(index, "audioUrl", url);
      }
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard/artist/releases?success=true");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit release.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div>
           <Link href="/dashboard/artist" className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-xs font-bold mb-2 uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Catalog
           </Link>
           <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Create <span className="gradient-text">Release</span></h1>
        </div>
        
        {/* Step Progress */}
        <div className="flex items-center gap-3 hidden md:flex">
           {steps.map((step, i) => (
             <div key={step.id} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    currentStep >= step.id ? "bg-primary text-black" : "bg-white/5 text-white/40 border border-white/5"
                  }`}
                >
                   {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${currentStep > step.id ? "bg-primary" : "bg-white/10"}`}></div>
                )}
             </div>
           ))}
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-3xl min-h-[600px] flex flex-col">
        <AnimatePresence mode="wait">
           <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-grow"
           >
              {/* Step 1: Metadata */}
              {currentStep === 1 && (
                <div className="space-y-8">
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black text-white italic">Release Metadata</h2>
                      <p className="text-white/40 text-sm font-sans underline decoration-primary/30 underline-offset-4">Enter the essential details for your release as they will appear on Stores.</p>
                   </div>
                   
                   {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm font-bold">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Release Title</label>
                         <input 
                          type="text" 
                          placeholder="e.g. Moonlight Sonata"
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white text-lg focus:border-primary/50 outline-none placeholder:text-white/10"
                          value={formData.title}
                          onChange={(e) => updateFormData("title", e.target.value)}
                         />
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Release Type</label>
                         <div className="grid grid-cols-3 gap-3">
                            {["Single", "EP", "Album"].map((type) => (
                              <button 
                                key={type}
                                onClick={() => updateFormData("type", type)}
                                className={`py-4 rounded-xl border font-bold text-xs transition-all ${
                                  formData.type === type ? "bg-primary text-black border-primary" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary Genre</label>
                         <select 
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-primary/50 outline-none appearance-none"
                          value={formData.genre}
                          onChange={(e) => updateFormData("genre", e.target.value)}
                         >
                            <option value="">Select Genre</option>
                            <option value="Pop">Pop</option>
                            <option value="Hip Hop">Hip Hop</option>
                            <option value="Lo-Fi">Lo-Fi</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Regional">Regional / Folk</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary Language</label>
                         <input 
                          type="text" 
                          placeholder="Hindi, English, etc."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-primary/50 outline-none placeholder:text-white/10"
                          value={formData.language}
                          onChange={(e) => updateFormData("language", e.target.value)}
                         />
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Planned Release Date</label>
                         <div className="relative">
                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input 
                              type="date" 
                              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-primary/50 outline-none"
                              value={formData.releaseDate}
                              onChange={(e) => updateFormData("releaseDate", e.target.value)}
                            />
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Step 2: Tracks */}
              {currentStep === 2 && (
                <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-black text-white italic">Tracklist Builder</h2>
                        <p className="text-white/40 text-sm font-sans tracking-tight">Add your tracks and define featured collaborators.</p>
                      </div>
                      <button 
                        onClick={addTrack}
                        className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase border border-primary/20 hover:bg-primary/20 transition-all"
                      >
                         <Plus className="w-4 h-4" /> Add Track
                      </button>
                   </div>

                   <div className="space-y-4">
                      {formData.tracks.map((track, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 relative group">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-white/40 flex-shrink-0">
                              {i + 1}
                           </div>
                           <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Track Title</label>
                                 <input 
                                  type="text" 
                                  placeholder="Track Name"
                                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-primary/40"
                                  value={track.title}
                                  onChange={(e) => updateTrack(i, "title", e.target.value)}
                                 />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Featured Artist(s)</label>
                                 <input 
                                  type="text" 
                                  placeholder="Optional"
                                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-primary/40"
                                  value={track.artist}
                                  onChange={(e) => updateTrack(i, "artist", e.target.value)}
                                 />
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <input 
                                 type="file" 
                                 id={`audio-upload-${i}`}
                                 className="hidden" 
                                 accept="audio/*"
                                 onChange={(e) => handleFileUpload(e, "trackAudio", i)}
                                 disabled={!!uploadingField}
                               />
                               <label 
                                 htmlFor={`audio-upload-${i}`}
                                 className={`p-3 rounded-xl transition-colors cursor-pointer ${
                                   track.audioUrl ? "bg-green-500/20 text-green-500" : "bg-white/5 text-white/40 hover:text-primary"
                                 }`}
                               >
                                  {uploadingField === `track-${i}` ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                  ) : track.audioUrl ? (
                                    <Check className="w-5 h-5" />
                                  ) : (
                                    <Upload className="w-5 h-5" />
                                  )}
                               </label>
                               <button 
                                 onClick={() => removeTrack(i)}
                                 className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-red-500 transition-colors"
                               >
                                  <Trash2 className="w-5 h-5" />
                               </button>
                            </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {/* Step 3: Artwork */}
              {currentStep === 3 && (
                <div className="space-y-8 flex flex-col items-center">
                   <div className="text-center space-y-2">
                      <h2 className="text-2xl font-black text-white italic">The Visuals</h2>
                      <p className="text-white/40 text-sm font-sans max-w-lg">High quality artwork (3000x3000px) is required for Major streaming platforms.</p>
                   </div>
                   
                   <div className="w-80 h-80 relative group">
                      <input 
                        type="file" 
                        id="artwork-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "artworkUrl")}
                        disabled={!!uploadingField}
                      />
                      <label 
                        htmlFor="artwork-upload"
                        className={`w-full h-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-10 transition-all cursor-pointer overflow-hidden ${
                          formData.artworkUrl ? "border-green-500/50" : "border-white/10 hover:border-primary/40"
                        }`}
                      >
                         {formData.artworkUrl && (
                           <img src={formData.artworkUrl} alt="Artwork Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform" />
                         )}
                         <div className="z-10 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 group-hover:scale-105 transition-transform">
                            {uploadingField === "artwork" ? (
                              <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
                            ) : formData.artworkUrl ? (
                              <Check className="w-8 h-8 text-green-500 mx-auto" />
                            ) : (
                              <Upload className="w-8 h-8 text-primary mx-auto" />
                            )}
                            <div>
                               <p className={`text-xs font-black uppercase tracking-widest ${formData.artworkUrl ? "text-green-500" : "text-white"}`}>
                                 {uploadingField === "artwork" ? "Uploading..." : formData.artworkUrl ? "Artwork Ready" : "Select Artwork"}
                               </p>
                               <p className="text-[10px] text-white/40 mt-1">Min 3000px • JPEG/PNG</p>
                            </div>
                         </div>
                         <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </label>
                    </div>

                   <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-full max-w-2xl flex gap-4">
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-xs text-white/40 font-sans leading-relaxed">
                         Ensure your artwork does not contain URLs, social media handles, or platform logos (Spotify, Apple Music, etc.). These will result in immediate rejection by Stores.
                      </p>
                   </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-10">
                   <div className="text-center space-y-2">
                      <h2 className="text-3xl font-black text-white italic">Quality Check</h2>
                      <p className="text-white/40 text-sm font-sans tracking-tight">Review your data carefully. Once submitted, metadata cannot be changed until stores approve.</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                         <div className="flex items-center justify-between">
                            <p className="text-xs font-black uppercase tracking-widest text-primary italic">Metadata</p>
                            <button onClick={() => setCurrentStep(1)} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Edit</button>
                         </div>
                         <div className="space-y-4">
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Release Title</p>
                               <p className="text-lg font-bold text-white">{formData.title || "Untitled"}</p>
                            </div>
                            <div className="flex gap-10">
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Type</p>
                                  <p className="text-sm font-bold text-white">{formData.type}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Genre</p>
                                  <p className="text-sm font-bold text-white">{formData.genre || "N/A"}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Language</p>
                                  <p className="text-sm font-bold text-white">{formData.language || "N/A"}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                         <div className="flex items-center justify-between">
                            <p className="text-xs font-black uppercase tracking-widest text-primary italic">Distribution</p>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <CheckCircle2 className="w-4 h-4 text-green-400" />
                               <span className="text-xs font-bold text-white/60">Stores: Spotify, Apple, YT Music, Amazon</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <CheckCircle2 className="w-4 h-4 text-green-400" />
                               <span className="text-xs font-bold text-white/60">Monetization: Content ID, FB/IG Audio</span>
                            </div>
                            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-[10px] font-sans text-primary leading-relaxed">
                               Distribution typically takes 24-72 hours. We recommend setting a release date at least 14 days in the future for playlist pitching.
                            </div>
                         </div>
                      </div>
                   </div>

                   <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-gradient w-full py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_20px_40px_rgba(255,136,182,0.2)] flex items-center justify-center gap-3"
                   >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Submission...
                        </>
                      ) : (
                        "DISTRIBUTE RELEASE NOW"
                      )}
                   </button>
                </div>
              )}
           </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        {currentStep < 4 && (
          <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
             <button 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-xl font-bold text-white/40 hover:text-white transition-all disabled:opacity-0"
             >
                Previous Step
             </button>
             <button 
              onClick={nextStep}
              className="btn-gradient px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 group transition-all"
             >
                Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
