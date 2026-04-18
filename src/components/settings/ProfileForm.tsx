"use client";

import { useState } from "react";
import { 
  Instagram, 
  Music, 
  Youtube, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  Smartphone, 
  MapPin 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    instagramUrl: profile?.instagramUrl || "",
    spotifyUrl: profile?.spotifyUrl || "",
    youtubeUrl: profile?.youtubeUrl || "",
    city: profile?.city || "",
    state: profile?.state || "",
    pincode: profile?.pincode || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      }
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Geographic Base</label>
                <div className="grid grid-cols-2 gap-4">
                   <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:border-primary/40 outline-none"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                   </div>
                   <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-xs font-bold focus:border-primary/40 outline-none"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                   />
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Digital Footprint</label>
                <div className="space-y-3">
                   <div className="relative">
                      <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:border-pink-500/40 outline-none"
                        placeholder="@instagram_handle"
                        value={formData.instagramUrl}
                        onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                      />
                   </div>
                   <div className="relative">
                      <Music className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:border-green-500/40 outline-none"
                        placeholder="Spotify Artist Link"
                        value={formData.spotifyUrl}
                        onChange={(e) => setFormData({...formData, spotifyUrl: e.target.value})}
                      />
                   </div>
                   <div className="relative">
                      <Youtube className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="text" 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:border-red-500/40 outline-none"
                        placeholder="YouTube Channel"
                        value={formData.youtubeUrl}
                        onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-2 flex flex-col">
             <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Artist Bio</label>
             <textarea 
               className="flex-grow bg-black/40 border border-white/5 rounded-[2rem] p-8 text-white text-sm font-sans leading-relaxed focus:border-primary/40 outline-none resize-none min-h-[200px]"
               placeholder="Write your story..."
               value={formData.bio}
               onChange={(e) => setFormData({...formData, bio: e.target.value})}
             />
          </div>
       </div>

       <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <p className="text-[10px] text-white/20 font-sans italic">Last updated: {new Date().toLocaleDateString()}</p>
          <button 
           onClick={handleSubmit}
           disabled={isSubmitting}
           className="btn-gradient px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/10 disabled:opacity-50"
          >
             {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
             {success ? "Protocol Saved" : "Synchronize Profile"}
          </button>
       </div>
    </div>
  );
}
