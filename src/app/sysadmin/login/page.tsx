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
    <div className="min-h-screen flex items-center justify-center relative bg-[#0a0a0a] overflow-hidden px-4 py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/80 p-10 rounded-2xl border border-red-500/20 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-10 flex flex-col items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-mono font-bold text-white mb-2 tracking-widest uppercase">System Admin</h1>
            <p className="text-red-500/60 font-mono text-xs tracking-widest uppercase">Restricted Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm font-mono"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/50 ml-1 uppercase">Admin Identifier</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500/30" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@sys.local"
                  className="w-full bg-black/50 border border-red-500/20 rounded-xl py-4 pl-12 pr-4 text-white font-mono placeholder:text-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/50 ml-1 uppercase">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500/30" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-red-500/20 rounded-xl py-4 pl-12 pr-12 text-white font-mono placeholder:text-white/10 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500/30 hover:text-red-500/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-mono font-bold tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              {loading ? (
                <Activity className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Authenticate"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
             <Link href="/" className="text-white/20 hover:text-white/40 text-xs font-mono uppercase tracking-widest transition-colors">
               Return to Public Portal
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
