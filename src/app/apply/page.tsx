"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Building2, CheckCircle2, ArrowRight, ShieldCheck, Music2, Globe, BarChart3 } from "lucide-react";

export default function ApplyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const portals = [
    {
      title: "Artist Portal",
      type: "ARTIST",
      href: "/apply/artist",
      icon: <User className="w-12 h-12 text-primary" />,
      description: "For individual artists, bands, and solo performers looking to distribute their music worldwide.",
      features: [
        "Global distribution to 150+ platforms",
        "Keep 90% of your royalties",
        "Real-time streaming analytics",
        "YouTube Content ID & Monetization",
        "Official Artist Channel support"
      ],
      color: "from-primary/20",
      btnClass: "btn-gradient text-black"
    },
    {
      title: "Record Label Portal",
      type: "LABEL",
      href: "/apply/label",
      icon: <Building2 className="w-12 h-12 text-secondary" />,
      description: "For established music labels managing multiple artists and large catalogs.",
      features: [
        "Unlimited artist sub-accounts",
        "Advanced royalty splitting",
        "Bulk delivery & catalog migration",
        "Dedicated account manager",
        "Priority distribution & support"
      ],
      color: "from-secondary/20",
      btnClass: "bg-white text-black hover:bg-white/90"
    }
  ];

  return (
    <div className="min-h-screen py-24 px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black font-display text-white mb-6 tracking-tighter">
            Join the <span className="gradient-text">Fastit Family</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto font-sans">
            Choose your path and start your journey with India&apos;s most transparent music distribution partner.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portals.map((portal) => (
            <motion.div 
              key={portal.type}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`glass p-10 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className="mb-8 p-4 bg-white/5 inline-block rounded-2xl">
                  {portal.icon}
                </div>
                <h2 className="text-4xl font-black font-display text-white mb-4 tracking-tight">{portal.title}</h2>
                <p className="text-white/60 mb-10 text-lg leading-relaxed font-sans">
                  {portal.description}
                </p>

                <div className="space-y-4 mb-12">
                  {portal.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <Link 
                  href={portal.href}
                  className={`${portal.btnClass} w-full py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-2 group/btn transition-all active:scale-95`}
                >
                  Apply Now <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center space-y-4"
        >
          <div className="flex justify-center gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm">Verified Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">150+ Platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">90% Royalties</span>
            </div>
          </div>
          <p className="text-white/30 text-sm font-sans">
            Already have an application? <Link href="/apply/status" className="text-primary hover:underline font-bold">Check Status</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
