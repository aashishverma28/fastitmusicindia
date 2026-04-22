"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Link as LinkIcon, User } from "lucide-react";
import { MOCK_BLOGS } from "@/data/mock";
import { notFound } from "next/navigation";

export default function BlogPostReader({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = MOCK_BLOGS.find((p: any) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <Link href="/blog" className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Journal
          </Link>
        </div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Article Header */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                {post.category}
              </span>
              <div className="flex items-center gap-6 text-white/30 text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 inline-flex">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10 overflow-hidden">
                <User className="w-6 h-6 text-white/40" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Editorial Team</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Fastit Music India</p>
              </div>
            </div>
          </div>

          {/* Feature Image */}
          <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src={post.cover} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority
            />
          </div>

          {/* Article Content - Mock Content */}
          <div className="prose prose-invert prose-lg max-w-none font-sans text-white/70 leading-relaxed space-y-8">
            <p className="text-xl text-white font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2 bg-primary/5 rounded-r-2xl">
              {post.excerpt}
            </p>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="text-3xl font-black font-display text-white mt-12 mb-6">Standardizing Music Metadata</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <ul className="space-y-4 list-disc pl-6 text-white/80">
              <li>Always provide high-resolution lossless cover art (3000x3000px).</li>
              <li>Ensure artist names match exactly on all platforms.</li>
              <li>Use Correct ISRC codes for catalog migrations.</li>
            </ul>

            <h2 className="text-3xl font-black font-display text-white mt-12 mb-6">Preparing for Global Distribution</h2>
            <p>
              At Fastit, we handle the heavy lifting of delivery to 150+ platforms. However, your role in providing accurate data is crucial. A single typo in a track title can delay global releases by several days.
            </p>

            <div className="bg-secondary/5 border border-secondary/20 p-8 rounded-3xl mt-12">
               <h4 className="text-secondary font-black font-display text-xl mb-4">Did you know?</h4>
               <p className="text-white/60">
                 Over 60,000 tracks are uploaded to Spotify every single day. Standing out requires not just great music, but perfect technical delivery and optimized metadata.
               </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4">
                <span className="text-white/40 font-bold uppercase text-xs tracking-widest">Share this Insight:</span>
                <div className="flex gap-4">
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white border border-white/5">
                      <Facebook className="w-4 h-4" />
                   </button>
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white border border-white/5">
                      <Twitter className="w-4 h-4" />
                   </button>
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white border border-white/5">
                      <LinkIcon className="w-4 h-4" />
                   </button>
                </div>
             </div>
             
             <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all">
                <Share2 className="w-5 h-5" /> Copy Link
             </button>
          </div>
        </motion.article>

        {/* Related Posts Placeholder */}
        <div className="mt-32 pt-24 border-t border-white/5">
           <h3 className="text-3xl font-black font-display text-white mb-12">Related <span className="gradient-text">Insights</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_BLOGS.filter((p: any) => p.id !== post.id).slice(0, 2).map((p: any) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="glass p-6 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all">
                   <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                      <Image src={p.cover} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <h4 className="text-xl font-black font-display text-white group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
