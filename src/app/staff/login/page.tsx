"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Activity, Music, Disc } from "lucide-react";

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        isEmployeeLogin: "true",
        redirect: false,
      });

      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "Invalid credentials. Please try again." : res.error);
      } else {
        router.push("/dashboard/employee");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#080809] px-4 py-20">
      {/* Background cyber grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Ambient brand lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(240, 10, 136, 0.12)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(255, 195, 1, 0.08)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Vinyl-sleeve inspired neubrutalist card */}
        <div className="bg-[#111113]/90 p-8 md:p-10 rounded-2xl border-3 border-white shadow-[8px_8px_0px_0px_#ffc301] backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#ffc301] hover:-translate-x-1 hover:-translate-y-1">
          {/* Top stripes */}
          <div className="absolute top-0 left-0 right-0 h-1.5 pop-stripes" />
          
          {/* Header */}
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="absolute inset-0 bg-[#ffc301]/30 rounded-full blur-md group-hover:bg-[#ffc301]/50 transition-all duration-300 scale-110" />
              <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/60 relative z-10">
                <Disc className="w-8 h-8 text-[#ffc301] animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            <div className="inline-block mb-2">
              <span className="text-3xl font-display font-black tracking-tight bg-gradient-to-r from-[#f00a88] to-[#ffc301] bg-clip-text text-transparent">
                Fastit Music
              </span>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase mt-1.5 text-white/50 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                Internal Staff Portal
              </p>
            </div>
            
            <h1 className="text-lg font-bold text-white mt-4">Welcome back</h1>
            <p className="text-xs text-white/40 mt-1">Sign in with your staff account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-xl text-sm border-2 border-red-500/30 bg-red-500/10 text-red-400 font-mono"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-white/60 uppercase ml-1">Staff Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#ffc301] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="name@fastitmusic.in"
                  className="w-full bg-black/50 border-2 border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono text-sm placeholder:text-white/20 focus:border-[#ffc301] focus:ring-0 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-white/60 uppercase ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#ffc301] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border-2 border-white/10 rounded-xl py-4 pl-12 pr-12 text-white font-mono text-sm placeholder:text-white/20 focus:border-[#ffc301] focus:ring-0 transition-all duration-300 outline-none"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#ffc301] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tactile brand gradient button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#f00a88] to-[#ffc301] text-black py-4.5 rounded-xl font-display font-black tracking-widest text-sm border-3 border-white shadow-[4px_4px_0px_0px_#f00a88] hover:shadow-[6px_6px_0px_0px_#f00a88] active:shadow-[2px_2px_0px_0px_#f00a88] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[0px] active:translate-y-[0px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase cursor-pointer"
            >
              {loading ? <Activity className="w-5 h-5 animate-spin mx-auto text-black" /> : "Verify Identity"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <Link href="/" className="text-white/30 hover:text-[#ffc301] text-xs font-mono uppercase tracking-widest transition-colors duration-200">
              ← Return to public deck
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
