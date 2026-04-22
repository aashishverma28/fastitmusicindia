"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Instagram,
  ArrowLeft,
  Music2,
  Globe2,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Linkedin,
  ExternalLink,
  Target,
  Zap,
  Users,
} from "lucide-react";

const teamData: Record<
  string,
  {
    name: string;
    role: string;
    tagline: string;
    image: string;
    coverGradient: string;
    accentColor: string;
    instagram: string;
    linkedin?: string;
    bio: string[];
    education: { degree: string; institution: string; year: string }[];
    achievements: { title: string; description: string; icon: React.ReactNode }[];
    skills: string[];
    philosophy: string;
    funFacts: string[];
  }
> = {
  "aashish-verma": {
    name: "Aashish Verma",
    role: "Founder & CEO",
    tagline: "Visionary. Technologist. Music Advocate.",
    image:
      "https://www.image2url.com/r2/default/images/1776595296598-95fc87d0-812d-405e-9158-d3f71b8f470e.jpg",
    coverGradient: "from-primary/40 via-primary/10 to-transparent",
    accentColor: "text-primary",
    instagram: "https://www.instagram.com/aashishverma_28",
    linkedin: undefined,
    bio: [
      "Aashish Verma is the Founder and Chief Executive Officer of Fastit Music India Pvt. Ltd., a groundbreaking independent record label that is redefining how music is discovered, produced, and distributed across India and beyond.",
      "Currently pursuing a Bachelor of Technology in Computer Science Engineering, Aashish combines his deep technical knowledge with an unwavering passion for music. He recognized that countless talented independent artists in India lacked the infrastructure, tools, and support needed to reach global audiences — and built Fastit Music India to fill that gap.",
      "Under his leadership, Fastit Music India has grown to serve 500+ independent artists, delivering 10,000+ tracks to over 150 major streaming platforms worldwide. Aashish drives the company's product vision, technology strategy, and artist partnership programs.",
    ],
    education: [
      {
        degree: "B.Tech – Computer Science Engineering",
        institution: "Birangana Sati Sadhani Rajyik Vishwavidyalaya",
        year: "2026 – Present",
      },
    ],
    achievements: [
      {
        title: "500+ Artists Empowered",
        description:
          "Built a platform that has onboarded and supported over 500 independent artists across India.",
        icon: <Users className="w-6 h-6" />,
      },
      {
        title: "150+ Platform Integrations",
        description:
          "Delivered music to Spotify, Apple Music, JioSaavn, and 150+ other global platforms.",
        icon: <Globe2 className="w-6 h-6" />,
      },
      {
        title: "End-to-End Label Infrastructure",
        description:
          "Architected the entire technology stack powering Fastit Music India's distribution engine.",
        icon: <Zap className="w-6 h-6" />,
      },
      {
        title: "Community Builder",
        description:
          "Cultivated a vibrant creative community, connecting artists, producers, and industry professionals.",
        icon: <Heart className="w-6 h-6" />,
      },
    ],
    skills: [
      "Product Strategy",
      "Full-Stack Development",
      "Music Distribution",
      "Artist Relations",
      "Business Development",
      "Digital Marketing",
      "Brand Building",
      "Data Analytics",
    ],
    philosophy:
      '"Every independent artist deserves the same stage as a major label act. Technology is the equalizer — and we are building it."',
    funFacts: [
      "🎵 Plays guitar in his free time",
      "💻 Coded the first version of Fastit's platform himself",
      "🌏 Dreams of taking Indian independent music to global charts",
      "📚 Avid reader of business biographies and music history",
    ],
  },
  "sahil-mustak-hussain": {
    name: "Sahil Mustak Hussain",
    role: "Co-Founder & CMD",
    tagline: "Strategist. Creative Director. Operations Leader.",
    image:
      "https://www.image2url.com/r2/default/images/1776594140680-0f049e12-f731-4e5e-a8f8-9b699c190676.png",
    coverGradient: "from-secondary/40 via-secondary/10 to-transparent",
    accentColor: "text-secondary",
    instagram: "https://www.instagram.com/sahil.mustaak",
    linkedin: undefined,
    bio: [
      "Sahil Mustak Hussain is the Co-Founder and Chairman & Managing Director (CMD) of Fastit Music India Pvt. Ltd. A creative strategist and operational powerhouse, Sahil ensures that the company's grand vision translates into real-world impact, day after day.",
      "Currently pursuing a Bachelor of Computer Applications (BCA), Sahil brings a rare blend of creative intuition and managerial discipline to Fastit Music India. His deep understanding of brand identity, artist development, and market strategy has been instrumental in shaping the company's culture and public persona.",
      "As CMD, Sahil oversees the company's day-to-day operations, manages key artist and label partnerships, and leads the creative direction of all marketing and branding initiatives. His collaborative leadership style has helped build Fastit Music India into a trusted name in the independent music ecosystem.",
    ],
    education: [
      {
        degree: "BCA – Bachelor of Computer Applications",
        institution: "The Assam Kaziranga University",
        year: "2026 – Present",
      },
    ],
    achievements: [
      {
        title: "Brand Architect",
        description:
          "Built the Fastit Music India brand identity from the ground up — from logo to tone of voice.",
        icon: <Star className="w-6 h-6" />,
      },
      {
        title: "Operational Excellence",
        description:
          "Established the processes and workflows that keep the label running smoothly at scale.",
        icon: <Briefcase className="w-6 h-6" />,
      },
      {
        title: "Artist Development Programs",
        description:
          "Designed mentorship and development programs helping artists grow their careers holistically.",
        icon: <Music2 className="w-6 h-6" />,
      },
      {
        title: "Strategic Partnerships",
        description:
          "Forged key industry partnerships expanding Fastit Music India's reach and influence.",
        icon: <Target className="w-6 h-6" />,
      },
    ],
    skills: [
      "Creative Strategy",
      "Brand Management",
      "Operations Management",
      "Artist Development",
      "Content Marketing",
      "Partnership Development",
      "Team Leadership",
      "Event Coordination",
    ],
    philosophy:
      '"Great music deserves great storytelling. Our job is to help every artist tell their story to the whole world."',
    funFacts: [
      "🎨 Has a strong passion for visual design and aesthetics",
      "🎧 Music listener across every genre — from classical to hip-hop",
      "🤝 Believes relationships are the foundation of every great business",
      "📱 Social media strategist who understands viral trends",
    ],
  },
};

export default function TeamMemberPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const member = teamData[slug];

  if (!member) {
    notFound();
  }

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.div {...fadeUp} className="pt-8 pb-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow ring */}
            <div
              className={`absolute -inset-4 rounded-3xl bg-gradient-to-b ${member.coverGradient} blur-xl -z-10`}
            />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />

              {/* Social badges */}
              <div className="absolute bottom-6 left-6 flex gap-3">
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p
                className={`${member.accentColor} font-black uppercase tracking-[0.2em] text-sm`}
              >
                {member.role}
              </p>
              <h1 className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter leading-none">
                {member.name}
              </h1>
              <p className="text-white/40 text-lg font-sans italic">
                {member.tagline}
              </p>
            </div>

            <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />

            {/* Bio paragraphs */}
            <div className="space-y-4 text-white/65 text-base leading-relaxed font-sans">
              {member.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Skills */}
            <div className="pt-2">
              <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-3">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/5 border border-white/10 text-white/70 text-xs font-bold px-3 py-1.5 rounded-full hover:border-primary/40 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Quote Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-white/10 rounded-3xl p-12 mb-24 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="relative">
            <p className="text-2xl md:text-3xl font-black font-display text-white italic leading-relaxed max-w-3xl mx-auto">
              {member.philosophy}
            </p>
            <p className={`${member.accentColor} font-black uppercase tracking-widest text-xs mt-6`}>
              — {member.name}
            </p>
          </div>
        </motion.section>

        {/* Achievements Grid */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter">
              Key{" "}
              <span className={member.accentColor}>Achievements.</span>
            </h2>
            <p className="text-white/40 font-sans">
              Milestones that define the journey so far.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {member.achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass border border-white/5 rounded-2xl p-8 flex gap-6 items-start group hover:border-primary/20 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${member.accentColor} group-hover:bg-white/10 transition-colors`}
                >
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black font-display text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Fun Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black font-display text-white tracking-tighter flex items-center gap-3">
              <GraduationCap className={`w-7 h-7 ${member.accentColor}`} />
              Education
            </h2>
            <div className="space-y-4">
              {member.education.map((edu, i) => (
                <div
                  key={i}
                  className="glass border border-white/5 rounded-2xl p-6 space-y-1"
                >
                  <p className="text-white font-black font-display text-lg">
                    {edu.degree}
                  </p>
                  <p className="text-white/50 text-sm font-sans">
                    {edu.institution}
                  </p>
                  <p className={`${member.accentColor} text-xs font-bold uppercase tracking-widest`}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black font-display text-white tracking-tighter flex items-center gap-3">
              <Award className={`w-7 h-7 ${member.accentColor}`} />
              Fun Facts
            </h2>
            <div className="space-y-4">
              {member.funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass border border-white/5 rounded-2xl px-6 py-4 text-white/70 font-sans text-base hover:border-white/15 hover:text-white transition-all"
                >
                  {fact}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Meet the Other Leader */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-16"
        >
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest text-center mb-8">
            Also Meet
          </p>
          {Object.entries(teamData)
            .filter(([key]) => key !== slug)
            .map(([key, other]) => (
              <Link key={key} href={`/team/${key}`} className="block max-w-md mx-auto group">
                <div className="glass border border-white/5 rounded-2xl p-6 flex items-center gap-6 hover:border-primary/30 hover:translate-y-[-4px] transition-all duration-300">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary flex-shrink-0 transition-colors">
                    <Image src={other.image} alt={other.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-black font-display text-xl">{other.name}</p>
                    <p className={`${other.accentColor} text-xs font-bold uppercase tracking-widest`}>
                      {other.role}
                    </p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-white rotate-180 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
        </motion.section>
      </div>
    </div>
  );
}
