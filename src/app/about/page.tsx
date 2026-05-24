"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Music2, Globe2, Zap, Users, Instagram } from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, BadgeStamp } from "@/components/shared/Doodles";

export default function AboutPage() {
  const stats = [
    { label: "Independent Artists", value: "500+", colorClass: "neubrutalist-card-pink" },
    { label: "Tracks Delivered", value: "10K+", colorClass: "neubrutalist-card-yellow" },
    { label: "Major Platforms", value: "150+", colorClass: "neubrutalist-card-blue" },
    { label: "Artist Support", value: "24/7", colorClass: "neubrutalist-card-pink" },
  ];

  const services = [
    {
      title: "Talent Scouting",
      description: "We are on a continuous mission to find and nurture the next generation of independent musical voices.",
      icon: <Users className="w-6 h-6 text-[#ffc301]" />,
    },
    {
      title: "Production",
      description: "From concept to final master, we provide the technical and creative support to polish your sound.",
      icon: <Music2 className="w-6 h-6 text-[#f00a88]" />,
    },
    {
      title: "Distribution & Promotion",
      description: "Global delivery to 150+ platforms with strategic marketing to ensure your music reaches the right ears.",
      icon: <Globe2 className="w-6 h-6 text-[#00b0fc]" />,
    },
    {
      title: "Digital Branding",
      description: "Building your visual identity and online presence to stand out in the crowded digital music landscape.",
      icon: <Zap className="w-6 h-6 text-[#ffab00]" />,
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
      badgeText: "CEO / Visionary",
      badgeColor: "tape-badge-pink",
      handwritingNote: "Aashish V."
    },
    {
      name: "Sahil Mustak Hussain",
      role: "Co-Founder & CMD",
      description: "BCA Student and creative strategist driving the operational excellence of Fastit Music India.",
      image: "https://www.image2url.com/r2/default/images/1776594140680-0f049e12-f731-4e5e-a8f8-9b699c190676.png",
      instagram: "https://www.instagram.com/sahil.mustaak",
      profileSlug: "sahil-mustak-hussain",
      tilt: "rotate-2",
      badgeText: "CMD / Operations",
      badgeColor: "tape-badge",
      handwritingNote: "Sahil M."
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
          <BadgeStamp text="100% INDIE" type="pink" />
        </div>

        {/* Hero Section */}
        <section className="py-16 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-display text-white tracking-tighter leading-[0.95] mb-8">
              Fastit <span className="relative inline-block pr-1 text-primary">Music India.<ScribbleUnderline color="#ffc301" /></span><br />
              <span className="text-secondary text-3xl sm:text-4xl md:text-6xl relative inline-block pr-1">Independent Record Label.<ScribbleUnderlineDouble color="#00b0fc" /></span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-sans leading-relaxed font-semibold">
              We provide independent artists with the necessary tools, global pathways, and genuine human support to fully express their artistic potential.
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

        {/* Stats Grid - Neubrutalist panels */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${stat.colorClass} p-8 rounded-none text-center`}
              >
                <p className="text-4xl md:text-5xl font-black font-display text-white mb-2">{stat.value}</p>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="relative lg:col-span-5">
            {/* Visual Tape effect on mission image container */}
            <div className="relative aspect-square rounded-none overflow-hidden border-3 border-white shadow-[6px_6px_0px_0px_#ffc301] bg-black">
              <Image 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                alt="Fastit Mission" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 border-2 border-white bg-black shadow-md">
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
                Our <span className="relative inline-block pr-1 text-primary">Mission.<ScribbleUnderline color="#f00a88" /></span> & Core Values.
              </h2>
            </div>
            
            <div className="space-y-6 text-white/80 text-lg leading-relaxed font-sans font-semibold">
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
              What We <span className="relative inline-block pr-1 text-secondary">Provide.<ScribbleUnderline color="#00b0fc" /></span>
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
                transition={{ delay: i * 0.08 }}
                className="neubrutalist-card-pink p-10 rounded-none space-y-6 group hover:translate-y-[-6px] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-none flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-black font-display text-white tracking-tight">{s.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm font-medium">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section (Polaroids with tape badges) */}
        <section className="py-32 relative">
          {/* Annotation arrow */}
          <div className="absolute top-20 left-10 hidden xl:block rotate-12">
            <CurlyArrow direction="down" className="w-16 h-16 text-primary" />
            <span className="absolute -top-10 left-10 font-handwriting text-primary text-xl w-40 leading-none">
              Meet our founders!
            </span>
          </div>

          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter">
              Our Head <span className="relative inline-block pr-1 text-primary">Members.<ScribbleUnderlineDouble color="#ffc301" /></span>
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
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center space-y-6"
              >
                {/* Physical Polaroid card container */}
                <div className={`polaroid-card w-full max-w-[340px] ${member.tilt} relative`}>
                  {/* Duct Tape overlay on Polaroid */}
                  <div className="absolute -top-3 left-[20%] z-40 rotate-[-4deg]">
                    <div className={`tape-badge ${member.badgeColor}`}>{member.badgeText}</div>
                  </div>

                  <Link href={`/team/${member.profileSlug}`} className="block">
                    <div className="relative aspect-square w-full border-2 border-black/40 overflow-hidden shadow-inner mb-4">
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
                    <span className="font-handwriting text-zinc-900 text-3.5xl leading-none block">
                      {member.handwritingNote}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-3 px-4 max-w-[340px]">
                  <p className="text-[#ffc301] font-black uppercase tracking-widest text-xs">{member.role}</p>
                  <p className="text-white/60 text-sm font-sans font-medium leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 pt-3">
                    <Link
                      href={`/team/${member.profileSlug}`}
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-none transition-colors"
                    >
                      Full Profile
                    </Link>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8.5 h-8.5 bg-white/5 border border-white/10 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
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
              <p className="text-white/40 font-sans font-semibold text-sm">Working from the beautiful hills of Assam to reach listeners across the globe.</p>
              
              <div className="absolute bottom-[-60px] right-10 hidden lg:block rotate-[-12deg]">
                <CurlyArrow direction="right" className="w-14 h-14 text-[#ffab00]" />
                <span className="absolute left-14 top-2 font-handwriting text-[#ffab00] text-xl w-32 leading-none">
                  Assam to the world!
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="neubrutalist-card-pink p-8 rounded-none space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-xs">Registered Office</span>
                </div>
                <p className="text-white font-black text-xl tracking-tight">Rangamati, Dergaon</p>
                <p className="text-white/50 text-sm font-sans font-medium">Golaghat, Assam, India - 785614</p>
                <div className="absolute right-3 bottom-3 font-handwriting text-white/5 text-4xl select-none">Assam</div>
              </div>
              <div className="neubrutalist-card-yellow p-8 rounded-none space-y-4 relative overflow-hidden">
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
