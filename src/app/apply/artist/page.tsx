"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ArtistApplicationForm from "@/components/forms/ArtistApplicationForm";

export default function ArtistApplyPage() {
  return (
    <div className="min-h-screen py-24 px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <Link 
            href="/apply" 
            className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Selector
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-6 tracking-tighter">
            Artist <span className="gradient-text">Application</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-sans">
            Complete the four steps below to submit your profile for review. Approved artists gain full access to the distribution dashboard.
          </p>
        </motion.div>

        <ArtistApplicationForm />
      </div>
    </div>
  );
}
