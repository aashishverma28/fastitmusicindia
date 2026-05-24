"use client";

import { motion } from "framer-motion";
import { Globe2, Youtube, Play, TrendingUp, ShieldCheck, Headphones, BarChart3, Share2, Check, ArrowRight, Zap, Music4 } from "lucide-react";
import Link from "next/link";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, BadgeStamp } from "@/components/shared/Doodles";

export default function ServicesPage() {
  const mainServices = [
    {
      title: "Global Music Distribution",
      description: "Get your music on 150+ streaming platforms including Spotify, Apple Music, JioSaavn, Gaana, and Amazon Music in record time.",
      icon: <Globe2 className="w-12 h-12 text-[#f00a88]" />,
      features: ["Worldwide Reach", "High Quality Audio Support", "Metadata Optimization", "Fast Delivery"],
      cardStyle: "neubrutalist-card-pink"
    },
    {
      title: "YouTube Monetization",
      description: "Secure your music with Content ID and start earning revenue whenever your songs are used in any video across the platform.",
      icon: <Youtube className="w-12 h-12 text-[#ffc301]" />,
      features: ["Content ID Protection", "Vevo Channel Support", "Official Artist Channel (OAC)", "Copyright Management"],
      cardStyle: "neubrutalist-card-yellow"
    },
    {
      title: "Live Analytics & Revenue",
      description: "Real-time streaming data at your fingertips. Track every stream, every cent, and every fan across the globe.",
      icon: <BarChart3 className="w-12 h-12 text-[#00b0fc]" />,
      features: ["Daily Streaming Stats", "Regional Data Breakdown", "Transparent Payouts", "Custom Reports"],
      cardStyle: "neubrutalist-card-blue"
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
    <div className="min-h-screen pt-24 pb-20 relative overflow-visible">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Stamp on services page */}
        <div className="absolute top-10 right-10 hidden lg:block rotate-6 z-20">
          <BadgeStamp text="Fierce Support" type="pink" />
        </div>

        {/* Hero Header */}
        <section className="py-16 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-display text-white tracking-tighter leading-[0.95]">
              Services Built for <span className="relative inline-block pr-1 text-primary">Success.<ScribbleUnderline color="#ffc301" /></span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed font-semibold pt-3">
              We provide the tools, the technology, and the distribution network. You provide the music. Together, we lead the charts.
            </p>
          </motion.div>
        </section>
      </div> {/* Close max-w-7xl */}

      {/* Neubrutalist Marquee Ticker Banner */}
      <div className="w-full overflow-hidden bg-secondary border-y-3 border-foreground py-4 select-none relative z-20 shadow-md my-12">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          <span className="font-display font-black text-sm md:text-xl text-[#080809] uppercase tracking-[0.18em] flex items-center gap-12">
            <span>Fastit Music India</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Empowering Independent Artists</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Distribute to 150+ Streaming Platforms</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Keep 90% of Your Earnings</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Zero Annual Fees</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>India&apos;s Indie Revolution</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Transparent Analytics & Payouts</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
          </span>
          <span className="font-display font-black text-sm md:text-xl text-[#080809] uppercase tracking-[0.18em] flex items-center gap-12" aria-hidden="true">
            <span>Fastit Music India</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Empowering Independent Artists</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Distribute to 150+ Streaming Platforms</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>Keep 90% of Your Earnings</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Zero Annual Fees</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
            <span>India&apos;s Indie Revolution</span> <span className="text-[#00b0fc] text-2xl font-sans">•</span>
            <span>Transparent Analytics & Payouts</span> <span className="text-[#f00a88] text-2xl font-sans">•</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative">

        {/* 90% Revenue Callout (Vintage neubrutalist ticket with hand note) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="vintage-ticket rounded-none mb-24 overflow-visible relative p-12 md:p-14 border-3 border-white shadow-[6px_6px_0px_0px_#f00a88]"
        >
          {/* Handwritten note on the ticket card */}
          <div className="absolute right-12 -top-12 hidden lg:block z-20">
            <CurlyArrow direction="down" className="w-14 h-14 text-secondary rotate-12" />
            <span className="absolute -top-10 left-10 font-handwriting text-secondary text-2xl w-48 leading-none rotate-3">
              Yes, you keep your master rights!
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
                Keep <span className="text-[#ffc301] relative inline-block pr-1 pb-1">90%<ScribbleUnderline color="#f00a88" /></span> of your earnings.
              </h2>
              <p className="text-white/75 text-lg font-sans font-semibold">Transparent revenue share. No setup fees. No annual renewal costs. Just pure distribution.</p>
            </div>
            <Link href="/apply" className="btn-neubrutalist px-10 py-5 rounded-none font-bold text-lg hover:scale-105 active:scale-95 transition-all block text-center shadow-lg">
              GET STARTED NOW
            </Link>
          </div>
        </motion.div>

        {/* Main Services Grid (Neubrutalist offset cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
          {mainServices.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${service.cardStyle} p-10 rounded-none flex flex-col justify-between group`}
            >
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 inline-block rounded-none group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-black font-display text-white tracking-tight">{service.title}</h3>
                <p className="text-white/60 leading-relaxed font-sans font-semibold text-sm">{service.description}</p>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                   {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                         {/* Pop check box instead of round bubbles */}
                         <div className="w-5 h-5 bg-secondary border border-white flex items-center justify-center shrink-0">
                           <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                         </div>
                         {f}
                      </div>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Icons Section */}
        <section className="py-24 border-t border-white/10 text-center relative">
          <div className="absolute left-[15%] top-10 hidden xl:block">
            <CurlyArrow direction="down" className="w-14 h-14 text-primary -rotate-12" />
            <span className="absolute -top-10 left-12 font-handwriting text-primary text-xl w-36 leading-none">
              All included in the 10% share!
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black font-display text-white mb-20 tracking-tight">
            Full-Stack <span className="relative inline-block pr-1 text-[#00b0fc]">Distribution.<ScribbleUnderlineDouble color="#ffc301" /></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
             {additionalServices.map((s, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.05 }}
                 className="flex flex-col items-center gap-4 group cursor-default"
               >
                  <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center text-white/40 group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 rounded-none">
                     {s.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{s.title}</span>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Pricing/Platform Logo Mock (Neubrutalist card styles) */}
        <section className="mt-32 p-16 border-3 border-white bg-[#111113] shadow-[8px_8px_0px_0px_#00b0fc] relative overflow-hidden">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 <div className="w-12 h-1.5 bg-[#ffc301] rounded-none"></div>
                 <h2 className="text-4xl font-black font-display text-white leading-tight">Ready to distribute your music to <span className="text-secondary">every corner</span> of the digital world?</h2>
                 <p className="text-white/60 font-sans leading-relaxed font-semibold">
                    Our platform is built to handle volume. Whether you are a bedroom producer dropping your first track or a regional label with a catalog of thousands, our delivery pipeline is flawless.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <button className="btn-neubrutalist px-8 py-4 rounded-none font-bold text-sm block">
                       Explore Platforms
                    </button>
                    <button className="btn-neubrutalist-secondary px-8 py-4 rounded-none font-bold text-sm block">
                       Contact Sales
                    </button>
                 </div>
              </div>
              <div className="grid grid-cols-3 gap-6 opacity-20 hover:opacity-40 transition-opacity duration-500">
                 {[1,2,3,4,5,6,7,8,9].map((i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-none flex items-center justify-center border border-white/10">
                        <Play className="w-8 h-8 text-white/40" />
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
