"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, Search, Filter } from "lucide-react";
import { MOCK_BLOGS } from "@/data/mock";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Distribution", "Education", "Spotlight", "News"];
  
  const filteredPosts = MOCK_BLOGS.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  const featuredPost = MOCK_BLOGS[0];
  const secondaryPosts = filteredPosts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center md:text-left mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase"
          >
            Insights & Guides
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black font-display text-white tracking-tighter"
          >
            The Sonic <span className="gradient-text">Journal.</span>
          </motion.h1>
          <p className="text-white/40 text-xl max-w-2xl font-sans">
            Level up your music career with our latest industry insights, tutorials, and success stories.
          </p>
        </div>

        {/* Featured Post Card */}
        {activeCategory === "All" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 group"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border border-white/10 glass hover:border-primary/20 transition-all duration-500">
               <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                  <Image 
                    src={featuredPost.cover} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-8 left-8">
                     <div className="bg-primary text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">
                        Featured Article
                     </div>
                  </div>
               </div>
               <div className="p-12 flex flex-col justify-center space-y-8 bg-black/40">
                  <div className="flex items-center gap-6 text-white/40 text-sm font-bold uppercase tracking-widest">
                     <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                     <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min read</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed font-sans line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black font-display text-xl group-hover:gap-5 transition-all">
                    Read Full Story <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
               </div>
            </Link>
          </motion.div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
            <span className="text-white/20 font-bold uppercase text-[10px] tracking-[0.2em] mr-2">Filter By:</span>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-secondary text-black" 
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {secondaryPosts.map((post, i) => (
            <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group"
            >
              <Link href={`/blog/${post.slug}`} className="space-y-6 block">
                 <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-white/5">
                    <Image 
                      src={post.cover} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4">
                       <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/80">
                          {post.category}
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                       <span>{post.date}</span>
                       <span>•</span>
                       <span>5 min read</span>
                    </div>
                    <h3 className="text-2xl font-black font-display text-white group-hover:text-primary transition-colors line-clamp-2">
                       {post.title}
                    </h3>
                    <p className="text-white/50 font-sans line-clamp-2 leading-relaxed">
                       {post.excerpt}
                    </p>
                 </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination / Load More Placeholder */}
        <div className="mt-24 text-center">
           <button className="px-12 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
              Load More Articles
           </button>
        </div>
      </div>
    </div>
  );
}
