"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Target, Zap, Shield, Heart, ArrowRight, Music2, Globe2 } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Artists Worldwide", value: "500+" },
    { label: "Tracks Delivered", value: "10K+" },
    { label: "Major Platforms", value: "150+" },
    { label: "Revenue Share", value: "90%" },
  ];

  const values = [
    {
      title: "Radical Transparency",
      description: "No hidden fees. No complex contracts. Just honest distribution with real-time analytics for everyone.",
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
    {
      title: "Artist First",
      description: "We don't own your masters. You keep 100% of your rights and 90% of your earnings. Forever.",
      icon: <Target className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Global standard, Local heart",
      description: "Born in Assam, built for the world. We combine regional cultural insight with global tech infrastructure.",
      icon: <Shield className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <section className="py-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter leading-none mb-8">
              Empowering <span className="gradient-text">Voices.</span><br />
              Distributing <span className="text-secondary">Dreams.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
              Fastit Music India is more than a distributor. We are a sonic heartbeat for independent artists, born from the vibrant culture of Northeast India and scaling to the global stage.
            </p>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 text-center group hover:border-primary/30 transition-all"
              >
                <p className="text-4xl md:text-5xl font-black font-display text-white mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio session" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 p-6 glass rounded-2xl border border-white/10 max-w-[280px]">
                 <p className="text-white font-bold leading-tight mb-2 italic">&quot;Music is the only language that doesn&apos;t need a translator.&quot;</p>
                 <p className="text-primary text-sm font-black uppercase tracking-widest">— Fastit Philosophy</p>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
                The <span className="gradient-text">Fastit</span> Story.
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-sans">
              <p>
                Founded in Rangamati, Dergaon, Fastit Music India began with a simple observation: India&apos;s independent music talent was exploding, but the gatekeepers were too far away.
              </p>
              <p>
                We built Fastit to be the bridge. We combined heavy-duty technical infrastructure—capable of delivering to Spotify, Apple, and JioSaavn in hours—with a boutique support experience that treats every artist like a headliner.
              </p>
              <p>
                Today, we manage a diverse catalog of over 10,000 tracks, ranging from experimental electronic beats in Guwahati to soulful folk revivals in the heart of our country.
              </p>
            </div>

            <div className="pt-6">
              <button className="flex items-center gap-3 text-white font-black font-display text-xl group underline decoration-primary decoration-4 underline-offset-8 hover:text-primary transition-colors">
                Apply to Join the Roster <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">Our Core <span className="text-secondary">Values.</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">The principles that guide every decision we make for our artists.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl border border-white/5 space-y-6 group hover:translate-y-[-10px] transition-all"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-black font-display text-white">{v.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 border-t border-white/5">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6">
                 <h2 className="text-3xl font-black font-display text-white">Our Presence.</h2>
                 <p className="text-white/40 font-sans">Working from the heart of Assam to reach the ears of the world.</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                       <MapPin className="w-5 h-5" />
                       <span className="font-black uppercase tracking-widest text-sm">Registered Office</span>
                    </div>
                    <p className="text-white font-bold">Rangamati, Dergaon</p>
                    <p className="text-white/60 text-sm font-sans">Golaghat, Assam, India - 785614</p>
                 </div>
                 <div className="glass p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-secondary">
                       <Music2 className="w-5 h-5" />
                       <span className="font-black uppercase tracking-widest text-sm">Corporate Studio</span>
                    </div>
                    <p className="text-white font-bold">Guwahati Hub</p>
                    <p className="text-white/60 text-sm font-sans">Assam, India</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
