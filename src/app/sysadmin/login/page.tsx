"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Activity, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
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
        isAdminLogin: "true",
        redirect: false,
      });

      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "Invalid email or password." : res.error);
      } else {
        router.push("/dashboard/admin");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#080809] overflow-hidden px-4 py-20">
      {/* Background cyber grid overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Ambient neon orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(240, 10, 136, 0.12)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(0, 176, 252, 0.08)" }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Cyber neubrutalist card container */}
        <div className="bg-[#111113]/90 p-8 md:p-10 rounded-2xl border-3 border-white shadow-[8px_8px_0px_0px_#f00a88] backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#f00a88] hover:-translate-x-1 hover:-translate-y-1">
          {/* Top aesthetic stripes */}
          <div className="absolute top-0 left-0 right-0 h-1.5 pop-stripes" />
          
          {/* High-tech status telemetry */}
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-b border-white/5 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wider">SYS_STATUS // SECURE</span>
            </div>
            <span className="tracking-wider">NODE: FST-IN-ADM</span>
          </div>

          <div className="text-center mb-8 flex flex-col items-center justify-center">
            {/* Pulsing secure scan container */}
            <div className="relative mb-5 group cursor-pointer">
              <div className="absolute inset-0 bg-[#f00a88]/30 rounded-full blur-md group-hover:bg-[#f00a88]/50 transition-all duration-300 scale-110 animate-pulse" />
              <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/60 relative z-10 group-hover:scale-105 transition-transform duration-300">
                <ShieldAlert className="w-8 h-8 text-[#f00a88] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            
            <h1 className="text-3xl font-display font-black text-white tracking-wider uppercase">System Admin</h1>
            <div className="mt-2 text-[#f00a88] font-mono text-[10px] tracking-[0.25em] uppercase bg-[#f00a88]/10 px-4 py-1.5 rounded-md border border-[#f00a88]/30">
              Restricted Terminal
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border-2 border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm font-mono"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-white/60 uppercase ml-1">Admin Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#f00a88] transition-colors" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@sys.local"
                  className="w-full bg-black/50 border-2 border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono placeholder:text-white/20 focus:border-[#f00a88] focus:ring-0 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-white/60 uppercase ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#f00a88] transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border-2 border-white/10 rounded-xl py-4 pl-12 pr-12 text-white font-mono placeholder:text-white/20 focus:border-[#f00a88] focus:ring-0 transition-all duration-300 outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#f00a88] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tactile neubrutalist submit button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#f00a88] text-white py-4.5 rounded-xl font-display font-black tracking-widest text-sm border-3 border-white shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[6px_6px_0px_0px_#ffffff] active:shadow-[2px_2px_0px_0px_#ffffff] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[0px] active:translate-y-[0px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase cursor-pointer"
            >
              {loading ? (
                <Activity className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Authenticate Session"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-white/5 pt-6">
             <Link href="/" className="text-white/30 hover:text-[#f00a88] text-xs font-mono uppercase tracking-widest transition-colors duration-200">
               ← Terminate Control Session
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
