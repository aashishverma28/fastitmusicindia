"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  Headphones, 
  Send, 
  Clock, 
  HelpCircle,
  FileText,
  CreditCard,
  Music2,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const faqs = [
  {
    question: "How long does it take for my music to go live?",
    answer: "Once your release is approved, it typically takes 24–72 hours to appear on major platforms like Spotify, Apple Music, and JioSaavn. Some stores may take up to 7 days."
  },
  {
    question: "How do I update my release metadata?",
    answer: "You can request metadata changes (title, artwork, credits) by emailing support@fastitmusic.in with your release name and the changes needed. Our team will process it within 24 hours."
  },
  {
    question: "When do I receive my royalty payments?",
    answer: "Royalties are processed monthly. Earnings from streaming platforms are collected, and payouts are made to your registered bank account by the 15th of each month for the previous month's earnings."
  },
  {
    question: "Can I distribute to specific platforms only?",
    answer: "Yes! During the release submission process, you can select which platforms you want your music distributed to. You can also request platform-specific distribution by contacting our team."
  },
  {
    question: "How do I take down a release?",
    answer: "Send a takedown request to support@fastitmusic.in with the release details. Takedowns are processed within 24–48 hours, though some stores may take longer to reflect the change."
  },
  {
    question: "Do I keep my rights and masters?",
    answer: "Absolutely. Fastit Music India is a non-exclusive distributor. You retain 100% ownership of your masters and rights. You can leave at any time with your catalog."
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate submission
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  const supportCategories = [
    {
      title: "Distribution Help",
      description: "Release submissions, platform delivery, and metadata updates.",
      icon: <Music2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Account & Payments",
      description: "Royalty payouts, account settings, and billing inquiries.",
      icon: <CreditCard className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Legal & DMCA",
      description: "Copyright claims, content disputes, and takedown requests.",
      icon: <FileText className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-black text-xs tracking-widest uppercase"
          >
            We&apos;re Here to Help
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter"
          >
            Support <span className="gradient-text">Center.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-xl max-w-2xl mx-auto font-sans"
          >
            Get help with your releases, account, or anything else. Our team is ready to assist you.
          </motion.p>

          {/* Primary Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <a 
              href="mailto:support@fastitmusic.in" 
              className="inline-flex items-center gap-3 btn-gradient px-10 py-5 rounded-2xl font-black font-display text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Mail className="w-6 h-6" />
              support@fastitmusic.in
            </a>
          </motion.div>
        </div>

        {/* Support Categories */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportCategories.map((cat, i) => (
              <motion.a
                key={i}
                href="mailto:support@fastitmusic.in"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-3xl border border-white/5 space-y-6 group hover:translate-y-[-10px] hover:border-primary/20 transition-all cursor-pointer block"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black font-display text-white">{cat.title}</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm">{cat.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Email Support <ExternalLink className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative"
          >
            <h2 className="text-3xl font-black font-display text-white mb-2">Submit a Ticket</h2>
            <p className="text-white/40 text-sm font-sans mb-10">We&apos;ll get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your full name"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-white/50 ml-1">Category</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-secondary transition-all font-sans appearance-none">
                  <option value="distribution">Distribution & Releases</option>
                  <option value="payments">Payments & Royalties</option>
                  <option value="account">Account Issues</option>
                  <option value="technical">Technical Support</option>
                  <option value="legal">Legal & DMCA</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-white/50 ml-1">Describe Your Issue</label>
                <textarea 
                  required
                  placeholder="Please describe your issue in detail..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans min-h-[150px]"
                />
              </div>

              <button 
                type="submit" 
                disabled={formStatus === "sending" || formStatus === "sent"}
                className={`w-full py-6 rounded-2xl font-black font-display text-xl flex items-center justify-center gap-3 transition-all ${
                  formStatus === "sent" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "btn-gradient hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {formStatus === "idle" && <><Send className="w-6 h-6" /> Submit Ticket</>}
                {formStatus === "sending" && <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>}
                {formStatus === "sent" && <><CheckCircle2 className="w-6 h-6" /> Ticket Submitted!</>}
                {formStatus === "error" && <><AlertCircle className="w-6 h-6" /> Try Again</>}
              </button>
            </form>

            {/* Background glow behind form */}
            <div className="absolute inset-x-10 -bottom-10 h-2 bg-primary/20 blur-3xl -z-10"></div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-black font-display text-white flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-secondary" />
                Frequently Asked Questions
              </h2>
              <p className="text-white/40 text-sm font-sans">Quick answers to common questions.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="text-white font-bold pr-4 group-hover:text-primary transition-colors">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px] pb-6" : "max-h-0"}`}>
                    <p className="text-white/50 text-sm font-sans leading-relaxed px-6">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Hours & Email */}
            <div className="space-y-6">
              <div className="p-8 glass bg-primary/5 border border-primary/10 rounded-3xl">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-white font-bold">Email Us Directly</p>
                    <a href="mailto:support@fastitmusic.in" className="text-primary font-bold text-lg hover:underline">
                      support@fastitmusic.in
                    </a>
                    <p className="text-white/40 text-xs font-sans pt-1">Average response time: under 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="p-8 glass bg-secondary/5 border border-secondary/10 rounded-3xl">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-secondary flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-white font-bold">Support Hours</p>
                    <p className="text-white/50 text-sm font-sans">Monday — Saturday: 10:00 AM – 6:00 PM IST</p>
                    <p className="text-secondary text-[10px] font-black uppercase tracking-widest pt-2 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> 24/7 support for urgent release issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
