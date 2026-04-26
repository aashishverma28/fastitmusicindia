"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, AlertCircle, CheckCircle2, Activity, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("If an account with that email exists, we have sent a new password to it. Please check your inbox (and spam folder).");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again later.");
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
            <Link href="/login" className="inline-block mb-6">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <Image 
                  src="/logo.png" 
                  alt="Fastit Music India" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-white/60 font-sans">Enter your email and we will send you a new password.</p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-white/80 leading-relaxed">
                {message}
              </p>
              <Link 
                href="/login"
                className="inline-block mt-4 text-primary font-bold hover:underline"
              >
                Return to Login
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/80 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading || !email}
                className="btn-gradient w-full py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Activity className="w-6 h-6 animate-sonic mx-auto" />
                ) : (
                  "SEND NEW PASSWORD"
                )}
              </button>

              <div className="text-center pt-4">
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
