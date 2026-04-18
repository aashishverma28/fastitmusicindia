"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Activity } from "lucide-react";

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
        setError("Invalid credentials. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0e0e0e 0%, #121218 100%)" }}>
      {/* Ambient light effects */}
      <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: "rgba(255, 136, 182, 0.12)" }} />
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: "rgba(255, 215, 9, 0.07)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <div className="rounded-2xl border p-10" style={{ background: "rgba(26,26,26,0.8)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter" style={{ background: "linear-gradient(to right, #ffd709, #ff88b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fastit Music
              </span>
              <p className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Internal Staff Portal</p>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Sign in with your staff credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-xl text-sm"
                style={{ background: "rgba(255,110,132,0.1)", border: "1px solid rgba(255,110,132,0.25)", color: "#ff6e84" }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="name@fastitmusic.in"
                  className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(255,136,182,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl py-3.5 pl-11 pr-11 text-sm text-white outline-none transition-all"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(255,136,182,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #ffd709, #ff88b6)" }}
            >
              {loading ? <Activity className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs font-medium transition-colors" style={{ color: "rgba(255,255,255,0.2)" }}>
              ← Return to main website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
