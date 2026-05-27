"use client";

import { useState, useEffect } from "react";
import { CreditCard, Search, CheckCircle2, Clock, AlertTriangle, ArrowUpRight, Activity } from "lucide-react";
import { Skeleton } from "@/components/shared/Skeleton";

export default function EmployeeFinancePage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED">("ALL");
  
  // Processing dialog state
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState("");
  const [updating, setUpdating] = useState(false);
  const [statusAction, setStatusAction] = useState<"COMPLETED" | "FAILED">("COMPLETED");

  async function loadPayments() {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      setPayments(data.payments || []);
      setFilteredPayments(data.payments || []);
    } catch (err) {
      console.error("Failed to load payments", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    let result = payments;

    // Filter by status
    if (statusFilter !== "ALL") {
      result = result.filter(p => p.status === statusFilter);
    }

    // Filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      result = result.filter(p => {
        const email = (p.email || "").toLowerCase();
        const method = (p.method || "").toLowerCase();
        const ref = (p.referenceNumber || "").toLowerCase();
        const amount = p.amount.toString();

        return email.includes(query) || 
               method.includes(query) || 
               ref.includes(query) || 
               amount.includes(query);
      });
    }

    setFilteredPayments(result);
  }, [searchQuery, statusFilter, payments]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!processingId) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/payments/${processingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusAction,
          referenceNumber: statusAction === "COMPLETED" ? refNumber : null
        })
      });

      if (!res.ok) {
        throw new Error("Failed to process payment status change");
      }

      setProcessingId(null);
      setRefNumber("");
      loadPayments(); // Reload list
    } catch (err) {
      console.error(err);
      alert("Error updating payment status.");
    } finally {
      setUpdating(false);
    }
  };

  // Metrics
  const totalPaidOut = payments
    .filter(p => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayouts = payments
    .filter(p => p.status === "PENDING" || p.status === "PROCESSING")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingCount = payments.filter(p => p.status === "PENDING").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-secondary">Accounts</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Finance & Payouts
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Process label and artist payout transactions.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full w-64 border focus-within:border-secondary/50 transition-colors"
               style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
            <Search className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search payees, reference ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/30" 
            />
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Paid Out", value: `₹${totalPaidOut.toLocaleString()}`, color: "#ff88b6", desc: "Settled payments" },
          { label: "Pending Payouts", value: `₹${pendingPayouts.toLocaleString()}`, color: "#ffd709", desc: "Requests awaiting process" },
          { label: "Queue Load", value: `${pendingCount} Pending`, color: "#ff6e84", desc: "Transactions in queue" },
        ].map((card, i) => (
          <div key={i} className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2 text-white/40">{card.label}</p>
            <p className="text-3xl font-black" style={{ color: card.color }}>{card.value}</p>
            <p className="text-[10px] text-white/30 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 border-b border-white/5 pb-4">
        {["ALL", "PENDING", "PROCESSING", "COMPLETED", "FAILED"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === s
                ? "bg-secondary text-black"
                : "bg-black/5 dark:bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            {s === "ALL" ? "All Payouts" : s}
          </button>
        ))}
      </div>

      {/* Payouts list */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/30 border-b border-white/5">
          <div className="col-span-4">Payee</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Method</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[76px] rounded-2xl bg-white/5 border animate-pulse" style={{ borderColor: "var(--glass-border)" }} />
          ))
        ) : filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <div key={payment.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 transition-colors border"
                 style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black flex-shrink-0"
                     style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
                  {payment.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight font-display">
                    {payment.email}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider mt-0.5 text-white/40">
                    ID: {payment.id} • {payment.role}
                  </p>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 font-mono font-bold text-sm text-white">
                ₹{payment.amount.toLocaleString()}
              </div>

              <div className="col-span-6 md:col-span-2 text-xs text-white/50 capitalize font-bold">
                {payment.method}
              </div>

              <div className="col-span-6 md:col-span-2 flex items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={
                        payment.status === "COMPLETED" ? { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" } :
                        payment.status === "PENDING" ? { background: "rgba(250,204,21,0.1)", color: "#facc15", border: "1px solid rgba(250,204,21,0.2)" } :
                        payment.status === "PROCESSING" ? { background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" } :
                        { background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }
                      }>
                  {payment.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                  {payment.status === "PENDING" && <Clock className="w-3 h-3 animate-pulse" />}
                  {payment.status === "PROCESSING" && <Activity className="w-3 h-3 animate-spin" />}
                  {payment.status === "FAILED" && <AlertTriangle className="w-3 h-3" />}
                  {payment.status}
                </span>
              </div>

              <div className="col-span-12 md:col-span-2 flex justify-end items-center">
                {payment.status === "PENDING" || payment.status === "PROCESSING" ? (
                  <button
                    onClick={() => { setProcessingId(payment.id); setStatusAction("COMPLETED"); }}
                    className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors bg-secondary text-black hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    Settle Request
                  </button>
                ) : (
                  <div className="text-[10px] text-white/30 font-mono">
                    {payment.referenceNumber ? `Ref: ${payment.referenceNumber}` : "Processed"}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl p-16 text-center border border-dashed border-white/10" style={{ background: "var(--card-bg)" }}>
            <CreditCard className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-white/40 font-bold">No payout records found</p>
          </div>
        )}
      </div>

      {/* Settle Payout Dialog */}
      {processingId && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
            <h2 className="text-xl font-black text-white font-display mb-1">Process Payout</h2>
            <p className="text-white/40 text-xs mb-6">Update status and link reference number for payout ID: {processingId}</p>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Action Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusAction("COMPLETED")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      statusAction === "COMPLETED"
                        ? "bg-emerald-500 text-white"
                        : "bg-black/5 dark:bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    Mark Settled
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusAction("FAILED")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      statusAction === "FAILED"
                        ? "bg-red-500 text-white"
                        : "bg-black/5 dark:bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    Mark Failed
                  </button>
                </div>
              </div>

              {statusAction === "COMPLETED" && (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">Bank/UPI Reference ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TXN987654321"
                    value={refNumber}
                    onChange={e => setRefNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border focus:border-secondary"
                    style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setProcessingId(null); setRefNumber(""); }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-white/50 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-primary to-secondary text-black hover:scale-102 disabled:opacity-50 cursor-pointer"
                >
                  {updating ? "Processing..." : "Confirm Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
