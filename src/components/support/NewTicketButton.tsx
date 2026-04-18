"use client";

import { useState } from "react";
import { 
  Plus, 
  Send, 
  Loader2, 
  AlertCircle,
  MessageSquare,
  ChevronDown
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewTicketButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "Technical",
    subject: "",
    description: "",
    priority: "Low"
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!formData.subject || !formData.description) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsOpen(false);
        setFormData({ category: "Technical", subject: "", description: "", priority: "Low" });
        router.refresh();
      } else {
        alert("Failed to submit ticket.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Technical", "Financial", "Legal", "Content Edits", "Marketing"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
      >
        <Plus className="w-5 h-5" /> Open New Ticket
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <div className="glass w-full max-w-2xl p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="space-y-2">
                 <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase inline-flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-primary" /> Support <span className="gradient-text">Protocol</span>
                 </h3>
                 <p className="text-sm text-white/40 font-sans">Formalize your query for internal review by our specialists.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Inquiry Category</label>
                    <select 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white text-xs font-bold focus:border-primary/40 outline-none appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                       {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Escalation Priority</label>
                    <select 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white text-xs font-bold focus:border-primary/40 outline-none appearance-none"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    >
                       {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Subject Line</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white text-sm font-bold focus:border-primary/40 outline-none"
                      placeholder="e.g. Urgent Metadata Change for 'Neon Dreams'"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Detailed Brief</label>
                    <textarea 
                      className="w-full bg-black/40 border border-white/5 rounded-3xl p-6 text-white font-sans text-sm focus:border-primary/40 outline-none resize-none min-h-[150px]"
                      placeholder="Please provide as much context as possible..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                 </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex gap-3">
                 <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                 <p className="text-[10px] text-primary/80 leading-relaxed font-sans">
                    Systemic alerts will notify you via the dashboard bell once our team responds to this thread.
                 </p>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.subject || !formData.description}
                  className="btn-gradient w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.02] transition-all"
                 >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    Submit Support Request
                 </button>
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest py-2"
                 >
                    Cancel Protocol
                 </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
