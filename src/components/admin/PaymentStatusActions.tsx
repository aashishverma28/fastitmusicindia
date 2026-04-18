"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Dialog,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentStatusActions({ payment }: { payment: any }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const router = useRouter();

  const handleUpdate = async (status: string, ref?: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/payments/${payment.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, referenceNumber: ref }),
      });

      if (response.ok) {
        setShowRefModal(false);
        router.refresh();
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (payment.status === "COMPLETED") {
    return (
      <div className="flex flex-col items-end gap-1">
         <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Disbursed</span>
         <p className="text-[10px] font-mono text-white/20">{payment.referenceNumber}</p>
      </div>
    );
  }

  if (payment.status === "FAILED") {
    return <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Transaction Failed</span>;
  }

  return (
    <div className="flex items-center justify-end gap-3">
       <button 
        onClick={() => setShowRefModal(true)}
        disabled={isUpdating}
        className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
       >
          Mark Paid
       </button>
       <button 
        onClick={() => handleUpdate("FAILED")}
        disabled={isUpdating}
        className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/20 transition-all"
       >
          Fail
       </button>

       {showRefModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/60">
           <div className="glass w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 space-y-6">
              <div className="space-y-2 text-center">
                 <h3 className="text-2xl font-black text-white italic tracking-tighter">Fulfillment <span className="text-green-500">Record</span></h3>
                 <p className="text-sm text-white/40 font-sans">Enter the bank reference or UPI transaction ID for this payout.</p>
              </div>

              <input 
                type="text" 
                placeholder="TXN-987234XXXX"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-mono text-sm focus:border-green-500 outline-none text-center tracking-widest"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
              />

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => handleUpdate("COMPLETED", refNumber)}
                  disabled={isUpdating || !refNumber}
                  className="bg-green-500 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                 >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Complete Transfer"}
                 </button>
                 <button 
                  onClick={() => setShowRefModal(false)}
                  className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                 >
                    Cancel
                 </button>
              </div>
           </div>
        </div>
       )}
    </div>
  );
}
