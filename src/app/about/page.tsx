"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Target, Zap, Shield, Heart, ArrowRight, Music2, Globe2, Star, Users, Briefcase, Instagram } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Independent Artists", value: "500+" },
    { label: "Tracks Delivered", value: "10K+" },
    { label: "Major Platforms", value: "150+" },
    { label: "Artist Support", value: "24/7" },
  ];

  const services = [
    {
      title: "Talent Scouting",
      description: "We are on a continuous mission to find and nurture the next generation of independent musical voices.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Production",
      description: "From concept to final master, we provide the technical and creative support to polish your sound.",
      icon: <Music2 className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Distribution & Promotion",
      description: "Global delivery to 150+ platforms with strategic marketing to ensure your music reaches the right ears.",
      icon: <Globe2 className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Digital Branding",
      description: "Building your visual identity and online presence to stand out in the crowded digital music landscape.",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
    },
  ];

  const team = [
    {
      name: "Aashish Verma",
      role: "Founder & CEO",
      description: "Btech-CSE Student with a vision to revolutionize the independent music scene in India.",
      image: "https://www.image2url.com/r2/default/images/1776595296598-95fc87d0-812d-405e-9158-d3f71b8f470e.jpg",
      instagram: "https://www.instagram.com/aashishverma_28",
      profileSlug: "aashish-verma",
    },
    {
      name: "Sahil Mustak Hussain",
      role: "Co-Founder & CMD",
      description: "BCA Student and creative strategist driving the operational excellence of Fastit Music India.",
      image: "https://www.image2url.com/r2/default/images/1776594140680-0f049e12-f731-4e5e-a8f8-9b699c190676.png",
      instagram: "https://www.instagram.com/sahil.mustaak",
      profileSlug: "sahil-mustak-hussain",
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
              Fastit <span className="gradient-text">Music India</span><br />
              <span className="text-secondary text-4xl md:text-6xl">Independent Record Label</span>
            </h1>
            <p className="text-white/60 text-xl max-w-3xl mx-auto font-sans leading-relaxed">
              We provide independent artists with the necessary tools, support, and opportunities to fully express their artistic potential.
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

        {/* Story & Mission Section */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                alt="Fastit Mission" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 p-6 glass rounded-2xl border border-white/10 max-w-[320px]">
                 <p className="text-white font-bold leading-tight mb-2 italic">&quot;Our goal is to be a continuous mission finding the next musical talents.&quot;</p>
                 <p className="text-primary text-sm font-black uppercase tracking-widest">— Fastit Philosophy</p>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
                Our <span className="gradient-text">Mission</span> & Core Values.
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-sans">
              <p>
                At Fastit Music India Pvt. Ltd, we believe in the power of music to unite and inspire. Our core values are centered around <strong>Innovation</strong>, <strong>Creativity</strong>, and <strong>Diversity</strong>.
              </p>
              <p>
                We go beyond simple distribution. Our services encompass talent scouting, full-scale production, global distribution, and cutting-edge digital branding. We treat every artist with the respect and attention they deserve.
              </p>
              <p>
                Founded and led by passionate students of technology and management, we bring a fresh, data-driven approach to the traditional record label model.
              </p>
            </div>

            <div className="pt-6">
              <button className="flex items-center gap-3 text-white font-black font-display text-xl group underline decoration-primary decoration-4 underline-offset-8 hover:text-primary transition-colors">
                Apply to Join the Roster <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">What We <span className="text-secondary">Provide.</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">Comprehensive support for the modern independent artist.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl border border-white/5 space-y-6 group hover:translate-y-[-10px] transition-all"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black font-display text-white">{s.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">Our Head <span className="text-primary">Members.</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">The visionaries behind Fastit Music India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group text-center space-y-8"
              >
                <Link href={`/team/${member.profileSlug}`} className="block">
                  <div className="relative w-64 h-64 mx-auto">
                    <div className="absolute inset-[-15px] rounded-full border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500 -z-10"></div>
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-primary transition-colors duration-500 shadow-2xl">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm gap-3">
                        <span className="text-white font-black text-sm uppercase tracking-widest">View Profile</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="space-y-2">
                  <Link href={`/team/${member.profileSlug}`} className="block hover:text-primary transition-colors">
                    <h3 className="text-3xl font-black font-display text-white group-hover:text-primary transition-colors">{member.name}</h3>
                  </Link>
                  <p className="text-primary font-black uppercase tracking-widest text-xs">{member.role}</p>
                  <p className="text-white/50 text-sm max-w-xs mx-auto font-sans leading-relaxed pt-2">
                    {member.description}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-3">
                    <Link
                      href={`/team/${member.profileSlug}`}
                      className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      View Full Profile
                    </Link>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-white/60" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 border-t border-white/5">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
                 <h2 className="text-3xl font-black font-display text-white">Our Presence.</h2>
                 <p className="text-white/40 font-sans">Working from the heart of Assam to reach the ears of the world.</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                       <MapPin className="w-5 h-5" />
                       <span className="font-black uppercase tracking-widest text-sm">Registered Office</span>
                    </div>
                    <p className="text-white font-bold text-lg">Rangamati, Dergaon</p>
                    <p className="text-white/60 text-sm font-sans">Golaghat, Assam, India - 785614</p>
                 </div>
                 <div className="glass p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-secondary">
                       <Music2 className="w-5 h-5" />
                       <span className="font-black uppercase tracking-widest text-sm">Corporate Studio</span>
                    </div>
                    <p className="text-white font-bold text-lg">Near Bapuji Mandir, Dergaon</p>
                    <p className="text-white/60 text-sm font-sans">Golaghat, Assam, India - 785614</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
