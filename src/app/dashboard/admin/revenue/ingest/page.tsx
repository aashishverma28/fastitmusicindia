"use client";

import { useState } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Database,
  Search
} from "lucide-react";
import Link from "next/link";

export default function AdminRevenueIngestPage() {
  const [reportText, setReportText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleIngest = async () => {
    if (!reportText) return;
    setIsProcessing(true);
    setError("");
    setResult(null);

    try {
      // Expecting JSON for now for better control
      const reports = JSON.parse(reportText);
      
      const response = await fetch("/api/admin/revenue/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reports: Array.isArray(reports) ? reports : [reports] }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setReportText("");
      } else {
        setError(data.error || "Ingestion failed.");
      }
    } catch (err) {
      setError("Invalid JSON format. Please check your data.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/dashboard/admin" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-all mb-2 inline-block">
             ← Back to System
          </Link>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Data <span className="gradient-text">Ingestion</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight pt-1">Import monthly revenue reports from streaming platforms.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-6 flex flex-col h-full">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Report Data (JSON)
                 </h2>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Format: </span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Report Schema V1</span>
                 </div>
              </div>

              <textarea 
                className="flex-grow bg-black/40 border border-white/5 rounded-3xl p-6 text-white font-mono text-xs focus:border-primary/40 outline-none resize-none min-h-[400px]"
                placeholder='[
  { "isrc": "QM3RR2401001", "period": "2024-03", "platform": "Spotify", "streams": 4500, "revenue": 142.50 },
  ...
]'
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />

              <button 
                onClick={handleIngest}
                disabled={isProcessing || !reportText}
                className="btn-gradient w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                 {isProcessing ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" />
                     Processing Batch...
                   </>
                 ) : (
                   <>
                     Process Ingestion <Database className="w-5 h-5" />
                   </>
                 )}
              </button>
           </div>
        </div>

        <div className="space-y-8">
           {/* Guidelines */}
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-lg font-bold text-white italic">Ingestion Protocols</h2>
              <div className="space-y-4">
                 {[
                   { t: "ISRC Matching", d: "Data is mapped to tracks primarily via ISRC. Ensure codes are accurate." },
                   { t: "Period Locking", d: "Earnings are logged to specific months (YYYY-MM) for statement generation." },
                   { t: "Atomicity", d: "Batches are processed as single transactions. Errors roll back the whole set." }
                 ].map((item) => (
                    <div key={item.t} className="flex gap-4">
                       <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                       <div className="space-y-0.5">
                          <p className="text-xs font-black text-white uppercase tracking-tighter">{item.t}</p>
                          <p className="text-xs text-white/40 font-sans leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Results Modal-like Area */}
           {result && (
             <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[2.5rem] space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <CheckCircle2 className="w-6 h-6 text-black" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Batch Successful</h3>
                      <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Ingestion Complete</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black text-white/20 uppercase mb-1">Processed</p>
                      <p className="text-2xl font-black text-white">{result.processed}</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black text-white/20 uppercase mb-1">Total Input</p>
                      <p className="text-2xl font-black text-white">{result.total}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="w-full py-4 rounded-xl bg-green-500/20 text-green-400 font-bold text-xs uppercase tracking-widest hover:bg-green-500/30 transition-all"
                >
                   Clear Results
                </button>
             </div>
           )}

           {error && (
             <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2.5rem] space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4">
                   <AlertCircle className="w-6 h-6 text-red-500" />
                   <h3 className="text-lg font-bold text-white">Ingestion Halted</h3>
                </div>
                <p className="text-sm text-red-400 font-medium font-sans">{error}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
