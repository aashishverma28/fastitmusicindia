"use client";

import { useState } from "react";
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  DollarSign
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PayoutRequestButton({ balance }: { balance: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState(balance);
  const router = useRouter();

  const handleRequest = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/payments/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, method }),
      });

      if (response.ok) {
        setIsOpen(false);
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit request.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEligible = balance >= 1000;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        disabled={!isEligible}
        className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${
          isEligible 
          ? "btn-gradient shadow-xl shadow-primary/20 hover:scale-105 active:scale-95" 
          : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
        }`}
      >
        <Send className="w-4 h-4" /> Request Payout
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <div className="glass w-full max-w-lg p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <DollarSign className="w-32 h-32" />
              </div>

              <div className="space-y-2">
                 <h3 className="text-3xl font-black text-white italic tracking-tighter">Initiate <span className="gradient-text">Transfer</span></h3>
                 <p className="text-sm text-white/40 font-sans">Funds will be electronically transferred to your registered account.</p>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Withdrawal Amount (Min ₹1,000)</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black">₹</span>
                       <input 
                        type="number" 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-white text-3xl font-black focus:border-primary/40 outline-none"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                       />
                    </div>
                    <p className="text-[10px] text-white/30 font-sans tracking-tight">Available: <span className="text-white font-bold">₹{balance.toLocaleString()}</span></p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Transfer Method</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                        onClick={() => setMethod("bank")}
                        className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                          method === "bank" ? "bg-primary/10 border-primary text-primary" : "bg-black/40 border-white/5 text-white/40"
                        }`}
                       >
                          <Building2 className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Bank NEFT</span>
                       </button>
                       <button 
                        onClick={() => setMethod("upi")}
                        className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                          method === "upi" ? "bg-secondary/10 border-secondary text-secondary" : "bg-black/40 border-white/5 text-white/40"
                        }`}
                       >
                          <CreditCard className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest">UPI ID</span>
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex gap-3">
                 <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                 <p className="text-[10px] text-yellow-500/80 leading-relaxed font-sans">
                    Once requested, the amount will be locked in 'Pending' status until the system confirms the wire transfer.
                 </p>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={handleRequest}
                  disabled={isSubmitting || amount < 1000 || amount > balance}
                  className="btn-gradient w-full py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    Confirm Withdrawal
                 </button>
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest py-2"
                 >
                    Cancel Transaction
                 </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}

// Fixed missing import
import { CreditCard } from "lucide-react";
