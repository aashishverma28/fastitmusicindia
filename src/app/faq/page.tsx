"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle, HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Distribution",
    questions: [
      {
        q: "How long does it take for my music to go live?",
        a: "Typically, releases go live on major platforms like Spotify and Apple Music within 24 to 72 hours. However, we recommend submitting your release at least 2 weeks in advance to ensure successful playlist pitching and marketing."
      },
      {
        q: "Which platforms do you distribute to?",
        a: "We distribute to over 150+ platforms globally, including Spotify, Apple Music, YouTube Music, Amazon Music, JioSaavn, Gaana, Wynk, Deezer, Tidal, and many regional platforms across the world."
      },
      {
        q: "Can I move my existing catalog to Fastit?",
        a: "Yes! We specialize in catalog migration. Using your existing ISRCs and UPCs, we can migrate your music to Fastit with zero loss in play counts or playlist placements."
      }
    ]
  },
  {
    category: "Royalties & Payments",
    questions: [
      {
        q: "What is the revenue share model?",
        a: "We believe in transparency. For our standard distribution plan, the artist keeps 90% of all royalties earned. The remaining 10% helps us maintain the infrastructure and provide 24/7 human support."
      },
      {
        q: "When and how do I get paid?",
        a: "Royalties are processed monthly. Once your account balance reaches the minimum threshold of ₹1,000, you can request a payout via Bank Transfer or UPI. Payments are usually processed within 3-5 business days."
      }
    ]
  },
  {
    category: "Application & Accounts",
    questions: [
      {
        q: "How do I join Fastit Music India?",
        a: "We are an application-based platform to ensure quality and prevent copyright fraud. You can apply as an Independent Artist or a Record Label through our portal. Review typically takes 3-5 business days."
      },
      {
        q: "Is there a setup fee or annual charge?",
        a: "No. Unlike many other distributors, Fastit has no upfront setup fees or recurring annual charges for distribution. We only earn when you earn."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = faqs.map(f => f.category);
  const currentFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 bg-white/5 rounded-2xl border border-white/10"
          >
            <HelpCircle className="w-8 h-8 text-secondary" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black font-display text-white tracking-tighter">
            How can we <span className="text-secondary">help?</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-sans">
            Find answers to common questions about distribution, royalties, and our platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
          <input 
            type="text" 
            placeholder="Search for a question..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-lg text-white font-display placeholder:text-white/10 focus:border-secondary transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Categories Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6 ml-4">Categories</h3>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => {setActiveCategory(cat); setOpenIndex(0);}}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-between group ${
                  activeCategory === cat 
                    ? "bg-secondary text-black" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat}
                <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="md:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {currentFaqs.map((faq, index) => (
                  <div 
                    key={index}
                    className={`glass rounded-2xl border transition-all duration-300 ${
                      openIndex === index ? "border-secondary/30 bg-secondary/5" : "border-white/5"
                    }`}
                  >
                    <button 
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                      <span className={`text-xl font-bold font-display transition-colors ${
                        openIndex === index ? "text-secondary" : "text-white group-hover:text-secondary"
                      }`}>
                        {faq.q}
                      </span>
                      <div className={`p-2 rounded-full transition-colors ${
                        openIndex === index ? "bg-secondary text-black" : "bg-white/5 text-white/30"
                      }`}>
                        {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 text-white/60 font-sans leading-relaxed text-lg border-t border-white/5 pt-6">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Support CTA */}
            <div className="mt-12 p-8 glass rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-primary" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Still have questions?</h4>
                    <p className="text-white/40 text-sm">Our human support team is ready to help 24/7.</p>
                 </div>
              </div>
              <Link href="/contact" className="btn-gradient px-8 py-4 rounded-xl font-bold flex items-center gap-2 group">
                 Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
