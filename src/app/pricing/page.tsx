"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Check, 
  Crown, 
  Music2, 
  Building2, 
  Zap, 
  Globe2, 
  BarChart3, 
  Headphones, 
  Shield, 
  Star,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Infinity
} from "lucide-react";

export default function PricingPage() {
  const artistFeatures = [
    { text: "Unlimited Releases", icon: <Infinity className="w-4 h-4" /> },
    { text: "Distribution to 150+ Platforms", icon: <Globe2 className="w-4 h-4" /> },
    { text: "Spotify, Apple Music, JioSaavn & More", icon: <Music2 className="w-4 h-4" /> },
    { text: "Keep 100% of Your Rights & Masters", icon: <Shield className="w-4 h-4" /> },
    { text: "Real-Time Analytics Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { text: "YouTube Content ID", icon: <BadgeCheck className="w-4 h-4" /> },
    { text: "Release Scheduling", icon: <Zap className="w-4 h-4" /> },
    { text: "Cover Art Assistance", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Metadata Management", icon: <Check className="w-4 h-4" /> },
    { text: "24/7 Priority Support", icon: <Headphones className="w-4 h-4" /> },
    { text: "ISRC & UPC Codes Included", icon: <Check className="w-4 h-4" /> },
    { text: "Pre-Save Campaign Tools", icon: <Check className="w-4 h-4" /> },
  ];

  const labelFeatures = [
    { text: "Everything in Artist Plan", icon: <Star className="w-4 h-4" /> },
    { text: "Unlimited Artist Roster", icon: <Infinity className="w-4 h-4" /> },
    { text: "Bulk Release Management", icon: <Music2 className="w-4 h-4" /> },
    { text: "Team Access & Permissions", icon: <Building2 className="w-4 h-4" /> },
    { text: "Dedicated Label Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { text: "Advanced Royalty Splitting", icon: <Zap className="w-4 h-4" /> },
    { text: "Playlist Pitching Assistance", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Custom Branding & Profiles", icon: <BadgeCheck className="w-4 h-4" /> },
    { text: "Priority Catalog Migration", icon: <Globe2 className="w-4 h-4" /> },
    { text: "Dedicated Account Manager", icon: <Headphones className="w-4 h-4" /> },
    { text: "White-Label Reports", icon: <Check className="w-4 h-4" /> },
    { text: "Marketing & PR Support", icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-black text-xs tracking-widest uppercase"
          >
            100% Free — No Hidden Fees
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter"
          >
            Premium for <span className="gradient-text">Everyone.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl max-w-3xl mx-auto font-sans leading-relaxed"
          >
            We believe music distribution should be accessible to all. That&apos;s why every feature we offer is completely free — for artists and labels alike.
          </motion.p>
        </div>

        {/* Free Badge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-24"
        >
          <div className="relative p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-white/10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4 flex-wrap">
              <Crown className="w-8 h-8 text-secondary" />
              <p className="text-white font-black font-display text-xl md:text-2xl">
                No credit card. No trials. <span className="text-secondary">Free forever.</span>
              </p>
              <Crown className="w-8 h-8 text-secondary" />
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-32">
          
          {/* Artist Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[2.5rem] border border-white/10 overflow-hidden group hover:border-primary/30 transition-all"
          >
            <div className="p-10 md:p-12">
              {/* Plan Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Music2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-black font-display text-white">Artist</h2>
                  <p className="text-white/40 text-sm font-sans">For independent musicians</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-10 pb-10 border-b border-white/5">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black font-display text-white">₹0</span>
                  <span className="text-white/30 font-bold text-lg mb-2">/ forever</span>
                </div>
                <p className="text-primary font-bold text-sm mt-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> All premium features included
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10">
                {artistFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-white/70 font-sans text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link 
                href="/apply" 
                className="btn-gradient w-full py-5 rounded-2xl font-black font-display text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Apply as Artist <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Label Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative glass rounded-[2.5rem] border border-secondary/30 overflow-hidden group hover:border-secondary/50 transition-all"
          >
            {/* Popular Badge */}
            <div className="absolute top-6 right-6 px-4 py-1.5 bg-secondary text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-1.5 z-10">
              <Star className="w-3 h-3 fill-current" /> Most Popular
            </div>

            <div className="p-10 md:p-12">
              {/* Plan Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-3xl font-black font-display text-white">Label</h2>
                  <p className="text-white/40 text-sm font-sans">For record labels & teams</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-10 pb-10 border-b border-white/5">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black font-display text-white">₹0</span>
                  <span className="text-white/30 font-bold text-lg mb-2">/ forever</span>
                </div>
                <p className="text-secondary font-bold text-sm mt-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" /> Everything included, zero cost
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10">
                {labelFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-white/70 font-sans text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link 
                href="/apply" 
                className="w-full py-5 rounded-2xl font-black font-display text-lg flex items-center justify-center gap-3 bg-secondary text-black hover:bg-secondary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Apply as Label <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Background glow */}
            <div className="absolute -bottom-10 inset-x-10 h-2 bg-secondary/20 blur-3xl -z-10"></div>
          </motion.div>
        </div>

        {/* Why Free Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter mb-6">
            Why is it <span className="text-secondary">free?</span>
          </h2>
          <p className="text-white/50 text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
            We believe that every independent artist and label deserves access to world-class distribution tools without financial barriers. Our mission is to empower, not to profit from your dreams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "No Annual Fees", desc: "Zero subscription costs. Ever.", icon: <CreditCardOff /> },
              { title: "No Per-Release Fee", desc: "Release unlimited music at no cost.", icon: <Music2 className="w-6 h-6" /> },
              { title: "No Lock-In", desc: "Leave anytime with your full catalog.", icon: <Shield className="w-6 h-6" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-2xl border border-white/5 space-y-4"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black font-display text-white">{item.title}</h3>
                <p className="text-white/40 text-sm font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-12 glass rounded-3xl border border-white/10 relative overflow-hidden text-center"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white">
              Ready to share your music with the <span className="gradient-text">world?</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto font-sans">
              Join hundreds of independent artists and labels already distributing through Fastit Music India.
            </p>
            <Link 
              href="/apply" 
              className="inline-flex items-center gap-3 btn-gradient px-12 py-5 rounded-2xl font-black font-display text-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Started — It&apos;s Free <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          {/* Background Circles */}
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-50%] left-[-10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px]"></div>
        </motion.div>
      </div>
    </div>
  );
}

function CreditCardOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <rect x="1" y="5" width="22" height="14" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
