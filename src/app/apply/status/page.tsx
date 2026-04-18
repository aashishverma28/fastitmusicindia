"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Music,
  Building2,
  Mail,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function ApplicationStatusPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setIsSearching(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/applications/check?id=${trackingId}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data.application);
      } else {
        setError(data.error || "No application found with this tracking ID.");
      }
    } catch (err) {
      setError("Failed to connect. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "NEW":
        return { 
          icon: <Clock className="w-12 h-12 text-blue-400" />, 
          title: "Received", 
          desc: "Your application has been received and is waiting for our A&R team to start the initial review.",
          color: "text-blue-400",
          bg: "bg-blue-400/10"
        };
      case "UNDER_REVIEW":
        return { 
          icon: <ShieldCheck className="w-12 h-12 text-yellow-500" />, 
          title: "Under Review", 
          desc: "Our team is currently verifying your identity and musical credentials. This typically takes 3-5 business days.",
          color: "text-yellow-500",
          bg: "bg-yellow-500/10"
        };
      case "APPROVED":
        return { 
          icon: <CheckCircle2 className="w-12 h-12 text-primary" />, 
          title: "Approved!", 
          desc: "Congratulations! Your application has been approved. Check your email for temporary login credentials.",
          color: "text-primary",
          bg: "bg-primary/10"
        };
      case "REJECTED":
        return { 
          icon: <XCircle className="w-12 h-12 text-red-500" />, 
          title: "Action Required", 
          desc: result?.rejectionReason || "Unfortunately, we couldn't approve your profile at this time. Please review our requirements and try again.",
          color: "text-red-500",
          bg: "bg-red-500/10"
        };
      default:
        return { 
          icon: <AlertCircle className="w-12 h-12 text-white/40" />, 
          title: "Unknown", 
          desc: "We couldn't determine your status. Please contact support.",
          color: "text-white/40",
          bg: "bg-white/5"
        };
    }
  };

  return (
    <div className="min-h-screen py-32 px-8 relative overflow-hidden bg-[#050505]">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter"
          >
            Track Your <span className="gradient-text">Application</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg md:text-xl font-sans max-w-2xl mx-auto font-medium"
          >
            Enter your unique tracking ID provided during submission to check your real-time status.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
             <div className="relative glass p-2 rounded-2xl border border-white/10 flex items-center gap-2">
                <div className="pl-4">
                  <Search className="w-5 h-5 text-white/20" />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. FMI-ART-XXXXXX"
                  className="bg-transparent border-none outline-none text-white font-mono uppercase tracking-widest text-lg w-full p-4 placeholder:text-white/10 placeholder:font-sans"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  required
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-neutral-200 active:scale-95 transition-all flex items-center gap-2"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Check"}
                </button>
             </div>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-bold mt-4 text-center"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-3xl text-center space-y-10"
            >
              <div className="flex flex-col items-center gap-6">
                <div className={`p-8 rounded-[2rem] ${getStatusConfig(result.status).bg} border border-white/5`}>
                  {getStatusConfig(result.status).icon}
                </div>
                <div className="space-y-4">
                  <h2 className={`text-4xl md:text-5xl font-black font-display tracking-tight ${getStatusConfig(result.status).color}`}>
                    {getStatusConfig(result.status).title}
                  </h2>
                  <p className="text-white/60 text-lg font-sans max-w-xl mx-auto leading-relaxed">
                    {getStatusConfig(result.status).desc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Application Type</p>
                   <div className="flex items-center justify-center gap-2 text-white font-bold">
                      {result.type === "ARTIST" ? <Music className="w-4 h-4 text-primary" /> : <Building2 className="w-4 h-4 text-secondary" />}
                      {result.type}
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Submitted On</p>
                   <p className="text-white font-bold">{new Date(result.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Tracking ID</p>
                   <p className="text-white font-mono font-bold">{result.applicationId}</p>
                </div>
              </div>

              {result.status === "APPROVED" && (
                <div className="pt-6">
                   <Link 
                    href="/login" 
                    className="btn-gradient px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 w-fit mx-auto hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                   >
                     Proceed to Dashboard <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              )}

              {result.status === "REJECTED" && (
                <div className="pt-6">
                   <Link 
                    href="/apply" 
                    className="inline-flex items-center gap-3 bg-white/5 px-8 py-4 rounded-xl text-white/60 hover:text-white transition-all font-bold"
                   >
                     Submit New Application <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Help */}
        <div className="text-center">
           <p className="text-white/20 text-sm font-medium">
             Lost your tracking ID? Check your registration email or <Link href="/contact" className="text-primary hover:underline">Contact Support</Link>.
           </p>
        </div>
      </div>
    </div>
  );
}
