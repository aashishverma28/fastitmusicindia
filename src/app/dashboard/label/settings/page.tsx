"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  CreditCard, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save,
  Lock,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "general", name: "General Info", icon: Building2 },
  { id: "contact", name: "Contact & Social", icon: Phone },
  { id: "financial", name: "Financial & Tax", icon: CreditCard },
  { id: "security", name: "Security", icon: Lock },
];

export default function LabelSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [formData, setFormData] = useState<any>({
    labelName: "",
    logo: "",
    website: "",
    description: "",
    contactPersonName: "",
    contactPersonRole: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagramUrl: "",
    youtubeUrl: "",
    facebookUrl: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    gstNumber: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/label/profile");
      const data = await res.json();
      if (res.ok) {
        setFormData(data.profile);
      }
    } catch (err) {
      console.error("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/label/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Update failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-secondary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">Loading Encryption Cores...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tighter italic">
            Command <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Manage your institutional identity and security protocols.</p>
        </div>
        <div className="flex items-center gap-4">
           {formData.isVerified && (
             <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Verified Label</span>
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all border ${
                activeTab === tab.id 
                ? "bg-secondary/10 border-secondary/20 text-white" 
                : "bg-white/5 border-transparent text-white/40 hover:bg-white/10"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-secondary" : "text-white/20"}`} />
              <span className="text-sm font-bold">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
              
              <AnimatePresence mode="wait">
                {activeTab === "general" && (
                  <motion.div 
                    key="general"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                       <div className="relative group cursor-pointer">
                          <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                             {formData.logo ? (
                               <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                             ) : (
                               <Building2 className="w-10 h-10 text-white/10" />
                             )}
                          </div>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                             <Camera className="w-6 h-6 text-white" />
                          </div>
                       </div>
                       <div className="flex-grow space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Label Identity Name</label>
                             <input 
                               type="text" 
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.labelName}
                               onChange={(e) => setFormData({...formData, labelName: e.target.value})}
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Official Website</label>
                             <div className="relative">
                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                  type="text" 
                                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                                  value={formData.website || ""}
                                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                                  placeholder="https://yourlabel.com"
                                />
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">About The Label</label>
                       <textarea 
                         rows={4}
                         className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all resize-none"
                         value={formData.description || ""}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                         placeholder="Describe your label's vision and genre focus..."
                       />
                    </div>
                  </motion.div>
                )}

                {activeTab === "contact" && (
                  <motion.div 
                    key="contact"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Primary Contact Person</label>
                          <div className="relative">
                             <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                             <input 
                               type="text" 
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.contactPersonName}
                               onChange={(e) => setFormData({...formData, contactPersonName: e.target.value})}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Role / Designation</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                             value={formData.contactPersonRole}
                             onChange={(e) => setFormData({...formData, contactPersonRole: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email Address</label>
                          <div className="relative">
                             <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                             <input 
                               type="email" 
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Phone Number</label>
                          <div className="relative">
                             <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                             <input 
                               type="text" 
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.phone}
                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             />
                          </div>
                       </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-6">
                       <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/20 italic">Social Matrix</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                             <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500/50" />
                             <input 
                               type="text" 
                               placeholder="Instagram Profile URL"
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.instagramUrl || ""}
                               onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                             />
                          </div>
                          <div className="relative">
                             <Youtube className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/50" />
                             <input 
                               type="text" 
                               placeholder="YouTube Channel URL"
                               className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                               value={formData.youtubeUrl || ""}
                               onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                             />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "financial" && (
                  <motion.div 
                    key="financial"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Bank Account Holder Name</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                             value={formData.accountHolder || ""}
                             onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Bank Name</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                             value={formData.bankName || ""}
                             onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Account Number</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                             value={formData.accountNumber || ""}
                             onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">IFSC Code</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                             value={formData.ifscCode || ""}
                             onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">PAN Number</label>
                          <input 
                             type="text" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all uppercase"
                             value={formData.panNumber || ""}
                             onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
                          />
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                   <motion.div 
                     key="security"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="max-w-md space-y-8"
                   >
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Current Password</label>
                           <input 
                             type="password" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">New Password</label>
                           <input 
                             type="password" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Confirm New Password</label>
                           <input 
                             type="password" 
                             className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-secondary/50 outline-none transition-all"
                           />
                        </div>
                        <button type="button" className="text-secondary text-xs font-bold hover:underline">Reset via Email Protocol</button>
                     </div>
                   </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
                        message.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {message.text}
                    </motion.div>
                  )}
                </div>
                <button 
                  disabled={isSaving}
                  className="w-full md:w-auto btn-gradient px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Synchronize Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
