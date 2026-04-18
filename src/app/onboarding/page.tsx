"use client";

import { useState } from "react";
import { 
  User, 
  MapPin, 
  Instagram, 
  Music, 
  Youtube, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    city: "",
    state: "",
    pincode: "",
    instagramUrl: "",
    spotifyUrl: "",
    youtubeUrl: ""
  });
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Update session to reflect isFirstLogin = false
        await update({ isFirstLogin: false });
        router.push("/dashboard/artist");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: "Personalize", icon: User },
    { title: "Presence", icon: Sparkles },
    { title: "Verification", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="glass p-12 md:p-20 rounded-[4rem] border border-white/10 space-y-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
           
           {/* Header */}
           <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
                 <Sparkles className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">New Partner Onboarding</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black font-display text-white italic tracking-tighter">
                 Finalize Your <span className="gradient-text">Identity</span>
              </h1>
              <p className="text-white/40 text-sm font-sans max-w-lg mx-auto leading-relaxed">
                 Welcome to the Fastit Music roster. Complete these few steps to unlock your distribution dashboard and start your journey.
              </p>
           </div>

           {/* Progress Bar */}
           <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2"></div>
              {steps.map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                      step > i + 1 ? "bg-primary border-primary text-black" :
                      step === i + 1 ? "bg-black border-primary text-primary shadow-[0_0_20px_rgba(255,136,182,0.3)]" :
                      "bg-black border-white/10 text-white/20"
                   }`}>
                      {step > i + 1 ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${step === i + 1 ? "text-white" : "text-white/20"}`}>{s.title}</span>
                </div>
              ))}
           </div>

           {/* Form Steps */}
           <div className="min-h-[300px]">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Location (City)</label>
                            <div className="relative">
                               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                               <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-8 text-white focus:border-primary/40 outline-none font-bold"
                                placeholder="e.g. Mumbai"
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">State</label>
                               <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 px-8 text-white focus:border-primary/40 outline-none font-bold placeholder:text-white/5"
                                placeholder="Maharashtra"
                                value={formData.state}
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Pincode</label>
                               <input 
                                type="text" 
                                className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 px-8 text-white focus:border-primary/40 outline-none font-bold placeholder:text-white/5"
                                placeholder="400001"
                                value={formData.pincode}
                                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                               />
                            </div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Artist Bio</label>
                         <textarea 
                          className="w-full h-full bg-black/40 border border-white/5 rounded-[2rem] p-8 text-white focus:border-primary/40 outline-none font-sans leading-relaxed min-h-[180px]"
                          placeholder="Tell the world about your musical journey..."
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                         />
                      </div>
                   </div>
                   <button onClick={() => setStep(2)} className="w-full btn-gradient py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                      Next Step <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Instagram Profile URL</label>
                             <div className="relative">
                                <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-8 text-white focus:border-pink-500/40 outline-none font-bold"
                                 placeholder="https://instagram.com/..."
                                 value={formData.instagramUrl}
                                 onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                                />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Spotify Artist Link</label>
                             <div className="relative">
                                <Music className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-8 text-white focus:border-green-500/40 outline-none font-bold"
                                 placeholder="https://spotify.com/artist/..."
                                 value={formData.spotifyUrl}
                                 onChange={(e) => setFormData({...formData, spotifyUrl: e.target.value})}
                                />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">YouTube Channel URL</label>
                             <div className="relative">
                                <Youtube className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                 type="text" 
                                 className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-8 text-white focus:border-red-500/40 outline-none font-bold"
                                 placeholder="https://youtube.com/@..."
                                 value={formData.youtubeUrl}
                                 onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                                />
                             </div>
                          </div>
                          <div className="bg-white/5 p-8 rounded-3xl border border-white/5 border-t border-white/10 space-y-3">
                             <p className="text-xs font-bold text-white italic tracking-tight">Pro Tip:</p>
                             <p className="text-[10px] text-white/30 font-sans leading-relaxed">
                                Linking your socials ensures faster approval of your releases and helps our editorial team pitch your music for playlists.
                             </p>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => setStep(1)} className="flex-1 bg-white/5 py-6 rounded-3xl font-black text-sm uppercase tracking-widest text-white/20 hover:bg-white/10 transition-all">Back</button>
                       <button onClick={() => setStep(3)} className="flex-[2] btn-gradient py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3">Verification Review <ArrowRight className="w-5 h-5" /></button>
                    </div>
                </div>
              )}

              {step === 3 && (
                <div className="max-w-xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4">
                   <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/10 rounded-[2rem] mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(255,136,182,0.1)] border-2 border-primary/20">
                         <ShieldCheck className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-black text-white italic">Almost <span className="text-primary">Live</span></h3>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] leading-relaxed">
                         By completing this onboarding, you agree to the Fastit Music distribution agreement and terms of service.
                      </p>
                   </div>
                   <div className="flex flex-col gap-4">
                      <button 
                        onClick={handleComplete}
                        disabled={isSubmitting}
                        className="btn-gradient py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/30"
                      >
                         {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-6 h-6" /> Unlock Dashboard</>}
                      </button>
                      <button onClick={() => setStep(2)} className="py-4 text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">Adjust Profile Details</button>
                   </div>
                </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
}
