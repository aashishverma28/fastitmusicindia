"use client";

import { motion } from "framer-motion";
import { 
  Globe2, 
  Youtube, 
  Play, 
  TrendingUp, 
  ShieldCheck, 
  Headphones, 
  BarChart3, 
  Share2, 
  Check, 
  ArrowRight,
  Zap,
  Music4
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const mainServices = [
    {
      title: "Global Music Distribution",
      description: "Get your music on 150+ streaming platforms including Spotify, Apple Music, JioSaavn, Gaana, and Amazon Music in record time.",
      icon: <Globe2 className="w-12 h-12 text-primary" />,
      features: ["Worldwide Reach", "High Quality Audio Support", "Metadata Optimization", "Fast Delivery"],
    },
    {
      title: "YouTube Monetization",
      description: "Secure your music with Content ID and start earning revenue whenever your songs are used in any video across the platform.",
      icon: <Youtube className="w-12 h-12 text-secondary" />,
      features: ["Content ID Protection", "Vevo Channel Support", "Official Artist Channel (OAC)", "Copyright Management"],
    },
    {
      title: "Live Analytics & Revenue",
      description: "Real-time streaming data at your fingertips. Track every stream, every cent, and every fan across the globe.",
      icon: <BarChart3 className="w-12 h-12 text-blue-400" />,
      features: ["Daily Streaming Stats", "Regional Data Breakdown", "Transparent Payouts", "Custom Reports"],
    }
  ];

  const additionalServices = [
    { title: "Playlist Pitching", icon: <Music4 className="w-6 h-6" /> },
    { title: "Copyright Protection", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Marketing Support", icon: <TrendingUp className="w-6 h-6" /> },
    { title: "Bulk Distribution", icon: <Zap className="w-6 h-6" /> },
    { title: "Smart Links", icon: <Share2 className="w-6 h-6" /> },
    { title: "24/7 Support", icon: <Headphones className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Header */}
        <section className="py-20 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter">
              Services Built for <span className="gradient-text">Success.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-sans leading-relaxed">
              We provide the tools, the technology, and the distribution network. You provide the music. Together, we lead the charts.
            </p>
          </motion.div>
        </section>

        {/* 90% Revenue Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary p-[1px] rounded-[2.5rem] mb-20 overflow-hidden"
        >
           <div className="bg-[#0e0e0e] rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                 <h2 className="text-4xl md:text-5xl font-black font-display text-white italic">Keep 90% of your earnings.</h2>
                 <p className="text-white/60 text-lg font-sans">Transparent revenue share. No setup fees. No hidden costs. Just pure distribution.</p>
              </div>
              <Link href="/apply" className="bg-white text-black px-12 py-5 rounded-3xl font-black font-display text-xl hover:bg-neutral-200 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95">
                 GET STARTED NOW
              </Link>
           </div>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {mainServices.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all"
            >
              <div className="space-y-6">
                <div className="p-4 bg-white/5 inline-block rounded-2xl group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black font-display text-white">{service.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans">{service.description}</p>
                <div className="space-y-4 pt-4">
                   {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                         <Check className="w-5 h-5 text-secondary" />
                         {f}
                      </div>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Icons Section */}
        <section className="py-24 border-t border-white/5 text-center">
           <h2 className="text-3xl font-black font-display text-white mb-20 tracking-tight">Full-Stack <span className="text-secondary">Distribution</span> Support.</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {additionalServices.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-4 group"
                >
                   <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500">
                      {s.icon}
                   </div>
                   <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{s.title}</span>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Pricing/Platform Logo Mock (Wait, master prompt mentioned 50+ platforms) */}
        <section className="mt-32 p-16 glass rounded-3xl border border-white/5 relative overflow-hidden">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 <div className="w-12 h-1 bg-secondary rounded-full"></div>
                 <h2 className="text-4xl font-black font-display text-white leading-tight">Ready to send your music to <span className="text-secondary">every corner</span> of the digital world?</h2>
                 <p className="text-white/60 font-sans leading-relaxed">
                    Our platform is built to handle volume. Whether you are a solo artist with your first single or a label with a catalog of thousands, our ingestion system is seamless.
                 </p>
                 <div className="flex gap-4 pt-4">
                    <button className="flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all">
                       Explore Platforms <Globe2 className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition-all">
                       Contact Sales <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
              <div className="grid grid-cols-3 gap-6 opacity-20 hover:opacity-40 transition-opacity">
                 {[1,2,3,4,5,6,7,8,9].map((i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                        <Play className="w-8 h-8 text-white" />
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
