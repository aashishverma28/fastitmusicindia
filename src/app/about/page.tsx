"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Music2, Globe2, Zap, Users, Instagram } from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, BadgeStamp } from "@/components/shared/Doodles";

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
      tilt: "-rotate-2",
      handwritingNote: "Aashish V. - CEO"
    },
    {
      name: "Sahil Mustak Hussain",
      role: "Co-Founder & CMD",
      description: "BCA Student and creative strategist driving the operational excellence of Fastit Music India.",
      image: "https://www.image2url.com/r2/default/images/1776594140680-0f049e12-f731-4e5e-a8f8-9b699c190676.png",
      instagram: "https://www.instagram.com/sahil.mustaak",
      profileSlug: "sahil-mustak-hussain",
      tilt: "rotate-2",
      handwritingNote: "Sahil M. - CMD"
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-visible">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Stamp on the page */}
        <div className="absolute top-10 right-10 hidden lg:block z-20">
          <BadgeStamp text="100% INDIE" type="yellow" />
        </div>

        {/* Hero Section */}
        <section className="py-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-display text-white tracking-tighter leading-[0.95] mb-8">
              Fastit <span className="relative inline-block pr-1">Music India.<ScribbleUnderline color="#ffd709" /></span><br />
              <span className="text-secondary text-3xl sm:text-4xl md:text-6xl relative inline-block pr-1">Independent Record Label.<ScribbleUnderlineDouble color="#ff88b6" /></span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto font-sans leading-relaxed font-medium">
              We provide independent artists with the necessary tools, global pathways, and genuine human support to fully express their artistic potential.
            </p>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 text-center group hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-black font-display text-white mb-2 group-hover:scale-105 transition-transform duration-500">{stat.value}</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="relative lg:col-span-5">
            {/* Visual Tape effect on mission image container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                alt="Fastit Mission" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 p-6 glass rounded-2xl border border-white/10 max-w-[280px]">
                 <p className="text-white font-bold leading-snug mb-2 italic text-sm">&quot;Our goal is to be a continuous mission finding the next musical talents.&quot;</p>
                 <p className="text-primary text-[10px] font-black uppercase tracking-widest">— Fastit Philosophy</p>
              </div>
            </div>
            
            {/* Hand-drawn Arrow pointing to story details */}
            <div className="absolute -right-16 -bottom-12 hidden lg:block">
              <CurlyArrow direction="down" className="w-16 h-16 text-secondary rotate-45" />
            </div>
          </div>

          <div className="space-y-10 lg:col-span-7">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
                Our <span className="relative inline-block pr-1">Mission.<ScribbleUnderline color="#ff88b6" /></span> & Core Values.
              </h2>
            </div>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-sans font-medium">
              <p>
                At Fastit Music India Pvt. Ltd, we believe in the power of music to unite and inspire. Our core values are centered around <strong>Innovation</strong>, <strong>Creativity</strong>, and <strong>Diversity</strong>.
              </p>
              <p>
                We go beyond standard sterile uploads. Our services encompass talent scouting, production assistance, global distribution, and cutting-edge digital branding. We treat every single release with the care it deserves.
              </p>
              <p>
                Founded and led by passionate students of technology and management, we bring a fresh, data-driven approach to the traditional record label model, blending modern automation with a human core.
              </p>
            </div>

            <div className="pt-6 relative">
              <Link href="/apply" className="flex items-center gap-3 text-white font-black font-display text-xl group underline decoration-primary decoration-4 underline-offset-8 hover:text-primary transition-colors">
                Apply to Join the Roster <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32">
          <div className="text-center mb-24 space-y-4 relative">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
              What We <span className="relative inline-block pr-1">Provide.<ScribbleUnderline color="#ffd709" /></span>
            </h2>
            <p className="text-white/40 font-sans font-bold uppercase tracking-widest text-xs">Comprehensive support for the modern independent artist.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl border border-white/5 space-y-6 group hover:translate-y-[-8px] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black font-display text-white tracking-tight">{s.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm font-medium">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section (Polaroids) */}
        <section className="py-32 relative">
          {/* Annotation arrow */}
          <div className="absolute top-20 left-10 hidden xl:block rotate-12">
            <CurlyArrow direction="down" className="w-16 h-16 text-primary" />
            <span className="absolute -top-10 left-10 font-handwriting text-primary text-xl w-40 leading-none">
              Meet our human founders!
            </span>
          </div>

          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
              Our Head <span className="relative inline-block pr-1">Members.<ScribbleUnderlineDouble color="#ff88b6" /></span>
            </h2>
            <p className="text-white/40 font-sans font-bold uppercase tracking-widest text-xs">The visionaries behind Fastit Music India.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto items-start">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center space-y-6"
              >
                {/* Physical Polaroid card container */}
                <div className={`polaroid-card w-full max-w-[340px] ${member.tilt}`}>
                  <Link href={`/team/${member.profileSlug}`} className="block">
                    <div className="relative aspect-square w-full rounded bg-zinc-800 border border-black/10 overflow-hidden shadow-inner mb-4">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </div>
                  </Link>
                  {/* Handwritten Polaroid label */}
                  <div className="text-center mt-3">
                    <span className="font-handwriting text-zinc-800 text-3xl leading-none block">
                      {member.handwritingNote}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-3 px-4 max-w-[340px]">
                  <p className="text-primary font-black uppercase tracking-widest text-xs">{member.role}</p>
                  <p className="text-white/60 text-sm font-sans font-medium leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 pt-3">
                    <Link
                      href={`/team/${member.profileSlug}`}
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-colors"
                    >
                      Full Profile
                    </Link>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8.5 h-8.5 bg-white/5 border border-white/10 rounded-full hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Presence Locations */}
        <section className="py-24 border-t border-white/5 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left relative">
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">Our Presence.</h2>
              <p className="text-white/40 font-sans font-medium text-sm">Working from the beautiful hills of Assam to reach listeners across the globe.</p>
              
              <div className="absolute bottom-[-60px] right-10 hidden lg:block rotate-[-12deg]">
                <CurlyArrow direction="right" className="w-14 h-14 text-secondary" />
                <span className="absolute left-14 top-2 font-handwriting text-secondary text-xl w-32 leading-none">
                  Assam to the world!
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-xs">Registered Office</span>
                </div>
                <p className="text-white font-black text-xl tracking-tight">Rangamati, Dergaon</p>
                <p className="text-white/50 text-sm font-sans font-medium">Golaghat, Assam, India - 785614</p>
                <div className="absolute right-3 bottom-3 font-handwriting text-white/5 text-4xl select-none">Assam</div>
              </div>
              <div className="glass p-8 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-3 text-secondary">
                  <Music2 className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-xs">Corporate Studio</span>
                </div>
                <p className="text-white font-black text-xl tracking-tight">Near Bapuji Mandir, Dergaon</p>
                <p className="text-white/50 text-sm font-sans font-medium">Golaghat, Assam, India - 785614</p>
                <div className="absolute right-3 bottom-3 font-handwriting text-white/5 text-4xl select-none">Studio</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
