"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Music, Headphones, Activity, HeadphonesIcon, Smartphone, Headset } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="relative w-16 h-16">
                <Image src="/logo.png" alt="Fastit Logo" fill className="object-contain" />
              </div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high/50 border border-white/10 text-secondary font-bold text-sm tracking-widest uppercase font-sans">
                India&apos;s Premier Distribution
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white"
            >
              Empowering <span className="gradient-text">Music.</span><br/>Distributing <span className="gradient-text">Dreams.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-white/70 text-xl max-w-lg font-medium leading-relaxed font-sans"
            >
              Join the digital revolution. We take your sounds from the studio to millions across 150+ global platforms.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                href="/apply/artist" 
                className="btn-gradient text-black px-8 py-4 rounded-full font-bold text-lg hover:glow-primary hover:scale-105 transition-all"
              >
                Apply as Artist
              </Link>
              <Link 
                href="/apply/label" 
                className="bg-surface-container-highest border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all font-sans"
              >
                Apply as Record Label
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/releases" className="flex items-center gap-2 text-primary font-bold hover:translate-x-2 transition-transform">
                Explore Our Releases <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl hover:rotate-0 transition-all duration-700">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFlNkEmsHw0DPmGPAhtqrGUoVZZFRKzEUJVrCmMMPFMOdkaPk1EyMl0WKrNc2OFBw52JiFh5MpBMoVUPJuAyfB5os4xLG7yMX09HkaxRpQRqhbsCYZglPhlxqRVDQewTtsBXqPhKUqKWT2CCZLD1dY2ZNyIBnt4ze13scDTdgMJpap0y1nsV33zYrfyQ_Ws6191SzDDPh09up8qZQRtob-VJ7KSmu0z_jslRwqYjblsZ9BHNH_M8vEhTKAQy4OjppX0AIWRmUY31w"
                alt="Studio setup"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-black fill-current" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">Now Trending</p>
                    <p className="text-sm text-white/60">Midnight Desires - Arjun S.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface-container-low/50 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              className="space-y-2"
            >
              <h3 className="text-5xl font-black font-display text-white">500+</h3>
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Artists Partnered</p>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <h3 className="text-5xl font-black font-display text-white">10,000+</h3>
              <p className="text-secondary font-bold tracking-widest uppercase text-sm">Tracks Distributed</p>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-5xl font-black font-display text-white">50+</h3>
              <p className="text-tertiary font-bold tracking-widest uppercase text-sm">Platforms Live</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Releases */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter">
              New <span className="gradient-text">Drops</span>
            </h2>
            <p className="text-white/60 max-w-md font-sans">
              Fresh sounds from the heart of India, curated for the world stage.
            </p>
          </div>
          <Link 
            href="/releases" 
            className="px-6 py-2 rounded-full border border-white/20 font-bold hover:bg-white/10 transition-all font-sans"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Electric Monsoon", artist: "Kabir & The Beats", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaNQ0rW5whJD1Ur7I5bu2pifZJq8ZjiHt-IPYQLCbIu-iKGiif9b-zUxzCoCYUqpQXkidbL2llv-XmmbOCyqFje_Xi9tE5x4MZOF4i9x6AKAhERMDiTD9cP1_PbO0B2eEA507SdGqeJFXgR4ZZyxep22IPPyuoGKMVfDRzSUWQTymVmARMbdcDpN3bqlfxSB32ADqqw7JrO2bORXDV0IHLrtsf-veLhQ8miVx71yfb8R0NiO9P69bt-7pRWLl5_4XUTz67QcZ6wIA" },
            { title: "Urban Nomad", artist: "Anya Khurana", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKcgXtXi95QaGrNPrz929mxy7nS7izaOT3Y16aWt_54HF4M7Ob9Me0Y33M_AM9va0BSpibM2DIANqp7RAQTehHHcOChYPDnHm9G2_YZhsgk2aIJK6q4U7eLEjmZIndP_qa3BEzaUt4WBt9r9rNEmtD88EnIIuj3PNnx6BE36_VtzUmVnebpkZSnlfYdKhg8JRdSHA3_gAGemaLVRo3sJ4-ukgXKlrFTkT-573dWEyD3vVwg1bjw33XcbhGyLDwPuBmCppoBFt3dG4" },
            { title: "Static Soul", artist: "VIBE Project", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-n-yRIUmrObVdupaR2esmT0mL2hdCZ_d-6t16Clx2SdDiKIvFCPAbX3i3NZYj_8ldJhhJqPMNlECiu0c6SUDVVv8LVBhwcWRXeJIVuYlWvKyfPKoEv3qZyPNJ7DLN0Seif-8XAzKJUFtIerW8vT1t2W88T6N89yn67pMCUfgYyjvY2oZ09CArEfQYnHmDvOke3dUBdJ9jwID6pmmn5RfD94ypGsQaOAHGohRJNPWbTOdxCYlHb1krUPJpNpgqCsSBpnOrr78jr94" },
            { title: "Live at Guwahati", artist: "Various Artists", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIFynLLt-QbOpN0uE6J5PllafexwooBhJ48n3_p-07gnHXbkUu4ffcUppgmjjXjB3LRI8aThNuSVEpWaOSuj7EwRuX23sQJ4HUYRBYilZwKJO5e5jGhMEMxCqQLm_HlEzTm0Y-_wkgflhn_0R_RK4ABBE_JA_RZ0QZ78U0P_mVKfqm1rC6ActW2yrfA8nIYJq1xjEEySk5pVG8TnPiCyfQqyQDVumvf5VrzZwPR1PoDZq2jdhAepnoP2z9Wxss16FUOBkEvsskNJ4" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-surface-container-highest">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-white/60 text-sm font-medium font-sans">{item.artist}</p>
              <div className="flex gap-2 mt-3">
                <Music className="w-4 h-4 text-white/40" />
                <Headphones className="w-4 h-4 text-white/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform Partners */}
      <section className="py-24 bg-surface-container/30">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white/40 uppercase tracking-[0.3em] mb-16">Global Reach Across All Major Platforms</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {["Spotify", "Apple Music", "YouTube", "JioSaavn", "Gaana", "Amazon"].map((p, idx) => (
              <div key={idx} className="flex items-center gap-2 hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-primary animate-pulse" />
                <span className="font-bold text-xl text-white">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (Bento Style) */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 btn-gradient p-12 rounded-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h2 className="text-5xl font-black font-display text-black mb-6 leading-none">Ready to lead the charts?</h2>
              <p className="text-black/70 text-xl font-bold max-w-md font-sans">Our artist dashboard gives you real-time analytics and global distribution in one click.</p>
            </div>
            <div className="relative z-10 mt-8">
              <Link href="/apply" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block">
                Get Started Today
              </Link>
            </div>
            <Activity className="absolute -bottom-10 -right-10 w-[300px] h-[300px] text-black/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-surface-container-high p-12 rounded-xl flex flex-col justify-between border border-white/10"
          >
            <div>
              <Headset className="text-secondary w-12 h-12 mb-6" />
              <h3 className="text-2xl font-display font-bold text-white mb-4">Dedicated Support</h3>
              <p className="text-white/60 font-sans">24/7 human support for all your release queries and metadata fixes.</p>
            </div>
            <Link href="/contact" className="text-secondary font-bold flex items-center gap-2 group font-sans">
              Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
