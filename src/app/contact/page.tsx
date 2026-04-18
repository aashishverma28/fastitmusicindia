"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Headphones, 
  Send, 
  Clock, 
  Globe,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      title: "General Support",
      description: "Distribution queries, metadata updates, and account help.",
      email: "support@fastitmusic.com",
      icon: <Headphones className="w-6 h-6 text-primary" />,
    },
    {
      title: "Business & Partnerships",
      description: "For record labels, brands, and collaborative ventures.",
      email: "partners@fastitmusic.com",
      icon: <Globe className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Legal & DMCA",
      description: "Copyright infringement and legal documentation.",
      email: "legal@fastitmusic.com",
      icon: <MapPin className="w-6 h-6 text-blue-400" />,
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-black text-xs tracking-widest uppercase"
          >
            Get in Touch
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter">
            Let&apos;s talk <span className="gradient-text">Music.</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-sans">
            Whether you are an artist with a demo or a label looking for distribution, we are here to amplify your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative"
          >
             <h2 className="text-3xl font-black font-display text-white mb-10">Send a Message</h2>
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/50 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Kabir Sharma"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/50 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="kabir@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 ml-1">Inquiry Type</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-secondary transition-all font-sans appearance-none">
                    <option value="distribution">Distribution Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="financial">Financial & Payments</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 ml-1">Message</label>
                  <textarea 
                    placeholder="Tell us about your project or query..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-primary/50 transition-all font-sans min-h-[150px]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-gradient w-full py-6 rounded-2xl font-black font-display text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Send Inquiry <Send className="w-6 h-6" />
                </button>
             </form>

             {/* Background glow behind form */}
             <div className="absolute inset-x-10 -bottom-10 h-2 bg-primary/20 blur-3xl -z-10"></div>
          </motion.div>

          {/* Contact Details Section */}
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-black font-display text-white">Direct Channels</h2>
              <div className="space-y-6">
                {contactMethods.map((method, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="p-4 bg-black/40 rounded-xl group-hover:bg-primary/10 transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                      <p className="text-white/40 text-sm font-sans mb-3">{method.description}</p>
                      <a href={`mailto:${method.email}`} className="text-primary font-bold hover:underline">{method.email}</a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black font-display text-white">Connect with the Lab</h2>
              <div className="flex gap-4">
                 <a href="#" className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/5 border border-white/5 transition-all">
                    <Instagram className="w-8 h-8" />
                 </a>
                 <a href="#" className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-sky-400 hover:bg-sky-400/5 border border-white/5 transition-all">
                    <Twitter className="w-8 h-8" />
                 </a>
                 <a href="#" className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-red-500 hover:bg-red-500/5 border border-white/5 transition-all">
                    <Youtube className="w-8 h-8" />
                 </a>
              </div>
            </div>

            <div className="p-8 glass bg-secondary/5 border border-secondary/10 rounded-3xl">
               <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-secondary flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-white font-bold">Standard Support Hours</p>
                    <p className="text-white/50 text-sm font-sans">Monday — Friday: 10:00 AM - 6:00 PM IST</p>
                    <p className="text-secondary text-[10px] font-black uppercase tracking-widest pt-2 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> 24/7 Human support for urgent metadata issues
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
