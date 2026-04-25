"use client";

import { useState } from "react";
import { 
  X, 
  UserPlus, 
  Mail, 
  User, 
  ShieldCheck, 
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignArtistModal({ isOpen, onClose, onArtistAdded }: { 
  isOpen: boolean; 
  onClose: () => void;
  onArtistAdded: () => void;
}) {
  const [formData, setFormData] = useState({
    stageName: "",
    fullName: "",
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/label/roster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessData(data);
        onArtistAdded();
      } else {
        setError(data.error || "Failed to sign artist");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass w-full max-w-xl rounded-[2.5rem] border border-white/10 overflow-hidden relative z-10"
      >
        <div className="p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white italic tracking-tighter">Sign New <span className="text-secondary">Artist</span></h2>
                <p className="text-white/40 text-xs font-sans">Issue immediate credentials for a new roster member.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/20 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!successData ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 text-red-400 text-xs font-bold animate-shake">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Stage Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. ARIA WEST"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                        value={formData.stageName}
                        onChange={(e) => setFormData({...formData, stageName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Full Legal Name</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        required
                        type="text" 
                        placeholder="Aria Sharma"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        required
                        type="email" 
                        placeholder="artist@example.com"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Custom Password (Optional)</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        type="password" 
                        placeholder="Fastit123!"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isSubmitting}
                    className="w-full btn-gradient py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "ISSUE ARTIST CONTRACT & ACCESS"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white italic">Artist Signed Successfully</h3>
                  <p className="text-white/40 text-sm font-sans">Share these credentials with the artist for dashboard access.</p>
                </div>

                {successData.credentials && (
                  <div className="glass p-6 rounded-3xl border border-white/10 space-y-4 text-left">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Login Username</label>
                      <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 mt-1">
                        <span className="font-mono text-sm text-secondary">{successData.credentials.username}</span>
                        <button onClick={() => copyToClipboard(successData.credentials.username)} className="text-white/20 hover:text-white"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Temporary Password</label>
                      <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 mt-1">
                        <span className="font-mono text-sm text-secondary">{successData.credentials.password}</span>
                        <button onClick={() => copyToClipboard(successData.credentials.password)} className="text-white/20 hover:text-white"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={onClose}
                  className="w-full bg-white/5 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                  Close & Refresh Roster
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
