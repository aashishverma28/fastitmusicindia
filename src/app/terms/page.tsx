"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Scale, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By applying to or using Fastit Music India's distribution services, you agree to be bound by these Terms of Service. If you do not agree to all terms, you must not use our services."
    },
    {
      title: "2. Ownership of Music",
      content: "You retain 100% ownership of your master recordings and musical compositions. Fastit Music India acts only as a non-exclusive distributor. You grant us the limited right to deliver and monetize your music on your behalf."
    },
    {
      title: "3. Revenue & Royalties",
      content: "Fastit Music India operates on a 90/10 revenue share model. 90% of all net royalties received from streaming platforms will be credited to your account. Payouts can be requested once the minimum threshold of ₹1,000 is met."
    },
    {
      title: "4. Content Standards",
      content: "You certify that you own all necessary rights to the music, artwork, and metadata provided. Submitting content you do not own (copyright infringement) or using automated streaming services (fake streams) will result in immediate termination of your account and forfeiture of earnings."
    },
    {
      title: "5. Termination",
      content: "Either party may terminate the distribution agreement with a 30-day notice. Upon termination, we will issue takedown requests to all platforms, though actual removal times vary by service."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-bold">
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
                <Scale className="w-8 h-8 text-secondary" />
             </div>
             <h1 className="text-5xl font-black font-display text-white tracking-tighter">Terms of <span className="text-secondary">Service</span></h1>
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
             
             <div className="pt-10 border-t border-white/5">
                <p className="text-white/40 text-sm italic font-sans">
                  Fastit Music India is a registered entity in Assam, India. These terms are governed by the laws of India and the jurisdiction of the courts in Guwahati, Assam.
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
