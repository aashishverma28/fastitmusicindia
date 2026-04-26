"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Eye, EyeOff, Lock, Mail, AlertCircle, Activity } from "lucide-react";

export default function LoginPage() {
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
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Redirection should be handled based on role, 
        // but for now we redirect to a common check
        router.push("/dashboard-redirect");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass p-10 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <Image 
                  src="/logo.png" 
                  alt="Fastit Music India" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
              <span className="text-2xl font-black italic gradient-text font-display">Fastit Music India</span>
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60 font-sans">Log in to your artist or label portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/80 ml-1">Email Address or Username</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@fastitmusic.in or your email"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-white/80">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-gradient w-full py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Activity className="w-6 h-6 animate-sonic mx-auto" />
              ) : (
                "LOG IN"
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm mb-4">Don&apos;t have an account?</p>
            <div className="flex justify-center gap-4 text-sm font-bold">
              <Link href="/apply/artist" className="text-primary hover:underline underline-offset-4">Apply as Artist</Link>
              <span className="text-white/10">|</span>
              <Link href="/apply/label" className="text-primary hover:underline underline-offset-4">Apply as Label</Link>
            </div>
          </div>

          <div className="mt-8 bg-surface-container/30 border border-white/5 p-4 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">
                Login credentials are provided by Fastit Music India upon application approval. Applications typically take 3-5 business days to review.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
