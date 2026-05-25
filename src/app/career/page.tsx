"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Code, 
  Users, 
  Sparkles, 
  Globe, 
  Check, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  FileText,
  Send,
  Sparkle,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { ScribbleUnderline, ScribbleUnderlineDouble, CurlyArrow, BadgeStamp } from "@/components/shared/Doodles";

const OPEN_POSITIONS = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer (React/Next.js)",
    department: "Engineering",
    location: "Assam / Remote",
    type: "Full-Time",
    experience: "1+ Years or Strong Portfolio",
    description: "Build premium neubrutalist user interfaces, interactive web apps, and dashboards that make independent distribution and financials simple for artists.",
    requirements: [
      "Proficient in React, Next.js (App Router), and Tailwind CSS.",
      "Experience with animation libraries like Framer Motion.",
      "A sharp eye for modern web design, typography, and premium aesthetics.",
      "Familiarity with REST/GraphQL APIs and Git version control."
    ],
    accent: "#f00a88", // Pink
    cardClass: "neubrutalist-card-pink"
  },
  {
    id: "artist-relations",
    title: "Artist & Label Specialist",
    department: "Operations",
    location: "Assam / Hybrid",
    type: "Full-Time",
    experience: "Entry Level to 2 Years",
    description: "Work directly with independent music creators. Identify promising talents, guide labels during onboarding, and ensure their metadata is flawless.",
    requirements: [
      "Excellent communication and interpersonal skills.",
      "Deep understanding of the music ecosystem (ISRC, UPC, publishing).",
      "Passionate about supporting independent/bedroom music acts.",
      "Fluent in English and regional languages."
    ],
    accent: "#ffc301", // Yellow
    cardClass: "neubrutalist-card-yellow"
  },
  {
    id: "backend-developer",
    title: "Full-Stack / Platform Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    experience: "2+ Years",
    description: "Scale our distribution ingestion engine, structure royalty distribution pipelines, and integrate complex streaming platform analytics APIs.",
    requirements: [
      "Strong knowledge of Node.js, TypeScript, and database design (PostgreSQL/Prisma).",
      "Experience with Supabase backend services and NextAuth integration.",
      "Knowledge of media processing (audio transcoding, metadata mapping).",
      "Strong debugging skills and focus on database performance."
    ],
    accent: "#00b0fc", // Blue
    cardClass: "neubrutalist-card-blue"
  },
  {
    id: "marketing-strategist",
    title: "Digital Marketing & Playlist Lead",
    department: "Marketing",
    location: "Assam / Remote",
    type: "Full-Time",
    experience: "1+ Years",
    description: "Pitch releases to editorial Spotify/Apple playlists, drive viral social campaigns, and help our partner artists stand out online.",
    requirements: [
      "Experience pitching music releases to streaming portals and curators.",
      "Expertise in Instagram, YouTube, and short-form video strategies.",
      "Analytical mindset to monitor stream gains, CTRs, and conversion rates.",
      "Creative storytelling abilities and graphic design skills."
    ],
    accent: "#f00a88", // Pink
    cardClass: "neubrutalist-card-pink"
  }
];

export default function CareerPage() {
  const [selectedRole, setSelectedRole] = useState("frontend-engineer");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolioUrl: "",
    pitch: ""
  });

  const handleApplyClick = (roleId: string) => {
    setSelectedRole(roleId);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", portfolioUrl: "", pitch: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center space-y-6 mb-24 relative">
          {/* Stamp overlay */}
          <div className="absolute top-0 right-10 hidden lg:block z-20">
            <BadgeStamp text="WE ARE HIRING" type="pink" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 border-2 border-white text-secondary font-bold text-xs tracking-widest uppercase bg-black shadow-[3px_3px_0px_0px_#ffc301] hover:scale-105 transition-all cursor-default"
          >
            JOIN THE SOUND REVOLUTION
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black font-display text-white tracking-tighter leading-none"
          >
            MAKE <span className="relative inline-block pr-1 text-primary">NOISE.<ScribbleUnderlineDouble color="#00b0fc" /></span><br/>
            BUILD THE <span className="relative inline-block px-3 py-1 bg-secondary text-black rotate-[-1.5deg] shadow-[4px_4px_0px_0px_#f00a88] border-2 border-black">FUTURE.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-sans font-semibold leading-relaxed"
          >
            We are looking for builders, creators, and music lovers to help us empower the next generation of independent artists in India.
          </motion.p>
        </div>

        {/* Culture / Benefits grid */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neubrutalist-card-pink p-8 space-y-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black font-display text-white">Music + Tech</h3>
              <p className="text-white/50 text-sm font-medium font-sans leading-relaxed">
                Work at the intersection of music and modern development. Build platforms that artists interact with daily to track their growth.
              </p>
            </div>
            <div className="neubrutalist-card-yellow p-8 space-y-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black font-display text-white">Creator First</h3>
              <p className="text-white/50 text-sm font-medium font-sans leading-relaxed">
                No corporate bureaucracy. We make decisions quickly and focus 100% on what benefits independent creators.
              </p>
            </div>
            <div className="neubrutalist-card-blue p-8 space-y-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#00b0fc]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black font-display text-white">Remote & Flexible</h3>
              <p className="text-white/50 text-sm font-medium font-sans leading-relaxed">
                Work from our office in beautiful Assam, or work fully remotely. We value output, quality code, and dedication above desk hours.
              </p>
            </div>
          </div>
        </section>

        {/* Job Roles Grid */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative">
            {/* Doodle annotation */}
            <div className="absolute top-[-50px] left-[200px] hidden md:block">
              <CurlyArrow direction="down" className="w-16 h-16 text-secondary rotate-12" />
              <span className="absolute -left-36 top-16 font-handwriting text-secondary text-2xl w-44 leading-none">
                Pick your dream role!
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter">
                Open <span className="relative inline-block pr-1 text-primary">Positions.<ScribbleUnderline color="#ffd709" /></span>
              </h2>
              <p className="text-white/50 font-sans font-bold uppercase tracking-widest text-xs">
                Find the role that matches your skills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {OPEN_POSITIONS.map((role) => (
              <motion.div 
                key={role.id}
                whileHover={{ y: -4 }}
                className={`${role.cardClass} p-8 rounded-none flex flex-col justify-between`}
              >
                <div className="space-y-6">
                  {/* Job Header Info */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">
                        {role.department}
                      </span>
                      <h3 className="text-2xl font-black font-display text-white">{role.title}</h3>
                    </div>
                    <span 
                      className="px-3 py-1 border-2 border-white text-xs font-black uppercase tracking-wider block bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                      style={{ boxShadow: `2px 2px 0px 0px ${role.accent}` }}
                    >
                      {role.type}
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-white/50 font-sans">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {role.experience}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed font-sans font-medium">
                    {role.description}
                  </p>

                  {/* Requirements List */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Requirements</p>
                    <ul className="space-y-2">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs text-white/60 font-sans font-medium">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" style={{ color: role.accent }} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => handleApplyClick(role.id)}
                  className="btn-neubrutalist-secondary w-full py-3.5 mt-8 font-black font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                  style={{ "--btn-sec-bg": "#000", "--btn-sec-fg": "#fff", "--btn-sec-border": "#fff", boxShadow: `4px 4px 0px 0px ${role.accent}` } as any}
                >
                  Apply For Role <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application Form Section */}
        <section ref={formRef} className="max-w-3xl mx-auto py-16 scroll-mt-24">
          <div className="neubrutalist-card-yellow p-8 sm:p-10 rounded-none relative">
            {/* Header */}
            <div className="mb-10 text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white">
                Submit Your <span className="text-primary">Application</span>
              </h2>
              <p className="text-white/60 text-sm font-semibold font-sans">
                Tell us about yourself and we will get back to you within 3-5 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Aashish Verma"
                    className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-sm font-semibold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-sm font-semibold"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Desired Role</label>
                  <select 
                    className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-sm font-semibold appearance-none cursor-pointer"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {OPEN_POSITIONS.map((role) => (
                      <option key={role.id} value={role.id} className="bg-[#1a1a1c]">{role.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Resume / Portfolio URL</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-sm font-semibold"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Pitch / Short Bio</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Tell us why you are a great fit for Fastit Music India. Highlight your passion and recent work..."
                  className="w-full bg-black border-2 border-white rounded-none py-4 px-6 text-white focus:border-secondary outline-none transition-all font-sans text-sm font-semibold resize-none"
                  value={formData.pitch}
                  onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="btn-neubrutalist w-full py-5 rounded-none font-black font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {submitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            {/* Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#111113] p-8 text-center border-3 border-white shadow-[8px_8px_0px_0px_#ffd709] z-10 rounded-none"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black font-display text-white mb-3">Application Received!</h3>
              <p className="text-white/60 text-sm font-sans mb-8 leading-relaxed">
                Thank you for applying to Fastit Music India. We have received your pitch and will review your portfolio details shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-neubrutalist px-8 py-3 rounded-none text-xs tracking-wider font-bold block mx-auto cursor-pointer"
              >
                Okay, Perfect
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
