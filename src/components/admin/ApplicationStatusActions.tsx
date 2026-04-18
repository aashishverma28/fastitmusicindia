"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  AlertTriangle,
  Send
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationStatusActions({ application }: { application: any }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const updateStatus = async (status: string, reason?: string) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`/api/applications/${application.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          rejectionReason: reason
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.refresh();
        setShowRejectModal(false);
      } else {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : (data.error || "Failed to update status.");
        setError(errorMsg);
      }
    } catch (err) {
      setError("Error connecting to server. Please check your connection.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (application.status !== "NEW" && application.status !== "UNDER_REVIEW") {
    return (
      <div className={`px-6 py-3 rounded-2xl flex items-center gap-2 border ${
        application.status === "APPROVED" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
      }`}>
        {application.status === "APPROVED" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-black text-sm uppercase tracking-widest">{application.status}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 relative">
      <button 
        onClick={() => updateStatus("APPROVED")}
        disabled={isUpdating}
        className="flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
      >
        {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
        Approve Profile
      </button>

      <button 
        onClick={() => {
          setError(null);
          setShowRejectModal(true);
        }}
        disabled={isUpdating}
        className="flex items-center gap-2 bg-white/5 text-red-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border border-red-500/10 hover:bg-red-500/10 transition-all disabled:opacity-50"
      >
        <XCircle className="w-4 h-4" />
        Reject
      </button>

      {/* Global Error Display */}
      {error && !showRejectModal && (
        <div className="absolute -bottom-12 right-0 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase px-4 py-2 rounded-xl animate-in fade-in slide-in-from-top-2">
           {error}
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/60">
          <div className="glass w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white italic tracking-tight">Rejection <span className="text-red-500">Notice</span></h3>
              <p className="text-sm text-white/40 font-sans">Provide a clear reason for rejection. This will be sent to the applicant.</p>
            </div>

            <div className="space-y-2">
              <textarea 
                placeholder="e.g. Identity documents are blurry. Please re-upload."
                className={`w-full bg-black/40 border ${rejectionReason ? 'border-white/10' : 'border-red-500/20'} rounded-2xl p-4 text-white font-sans text-sm focus:border-red-500 outline-none min-h-[120px] transition-all`}
                onChange={(e) => setRejectionReason(e.target.value)}
                value={rejectionReason}
              />
              {!rejectionReason && (
                <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest pl-2">Reason is required to send notification</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold">
                 {error}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => updateStatus("REJECTED", rejectionReason)}
                disabled={isUpdating || !rejectionReason}
                className="flex items-center justify-center gap-2 bg-red-500 text-white py-4 rounded-xl font-bold hover:glow-red transition-all disabled:opacity-50 disabled:grayscale"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Rejection <Send className="w-4 h-4" /></>}
              </button>
              <button 
                onClick={() => {
                  setShowRejectModal(false);
                  setError(null);
                }}
                className="text-white/40 hover:text-white transition-colors text-sm font-bold"
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
