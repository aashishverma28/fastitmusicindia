"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide during the application process, including your legal name, stage name, email, contact details, identity documents (for KYC), and bank details for royalty payouts."
    },
    {
      title: "2. How We Use Your Data",
      content: "Your data is used to: Verify your identity as a rightsholder, distribute your music to digital service providers (DSPs), process royalty payments, and communicate important updates regarding your releases."
    },
    {
      title: "3. Data Sharing",
      content: "We share your music and metadata with streaming platforms (like Spotify, Apple Music). Your private information (Bank details, IDs) is NEVER shared with third parties, except as required by law for tax reporting or anti-fraud verification."
    },
    {
      title: "4. Security",
      content: "We implement industry-standard encryption and security measures to protect your sensitive data. All bank and identity information is stored on secure, encrypted servers."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to access, correct, or request the deletion of your personal data. Note that certain data must be retained as long as your music is live and royalties are being processed for legal and tax compliance."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-secondary transition-colors font-bold">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Shield className="w-8 h-8 text-primary" />
             </div>
             <h1 className="text-5xl font-black font-display text-white tracking-tighter">Privacy <span className="text-primary">Policy</span></h1>
             <p className="text-white/40 font-sans">Last updated: April 14, 2024</p>
          </div>

          <div className="glass p-10 md:p-16 rounded-[2.5rem] border border-white/5 space-y-16">
             {sections.map((section, i) => (
                <div key={i} className="space-y-6">
                   <h2 className="text-2xl font-black font-display text-white">{section.title}</h2>
                   <p className="text-white/60 text-lg leading-relaxed font-sans">
                      {section.content}
                   </p>
                </div>
             ))}
             
             <div className="pt-10 border-t border-white/5 flex items-center gap-4">
                <Lock className="w-5 h-5 text-primary" />
                <p className="text-white/40 text-sm font-sans">
                  Your privacy is our priority. We are committed to GDPR and Indian IT Act compliance.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
