"use client";

import { useState, useEffect } from "react";
import { 
  Music, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Play
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/shared/EmptyState";

export default function ArtistReleasesPage() {
  const [releases, setReleases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success");

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const response = await fetch("/api/releases");
      const data = await response.json();
      if (response.ok) {
        setReleases(data.releases);
      }
    } catch (err) {
      console.error("Failed to fetch releases");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "LIVE": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "SUBMITTED": return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "UNDER_REVIEW": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "REJECTED": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-white/5 text-white/40 border-white/10";
    }
  };

  return (
    <div className="space-y-10">
      {showSuccess && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
           <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <p className="text-sm font-bold text-white">Release submitted successfully! It is now under review.</p>
           </div>
           <button onClick={() => window.history.replaceState({}, '', window.location.pathname)} className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Music <span className="gradient-text">Catalog</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Manage your distributed discography and track live status across stores.</p>
        </div>
        <Link href="/dashboard/artist/releases/new" className="btn-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
          <Plus className="w-5 h-5" /> Create New Release
        </Link>
      </div>

      {!isLoading && releases.length === 0 ? (
        <EmptyState 
           icon={Music}
           title="Silence in the Studio"
           description="Your catalog is currently silent. Start your distribution journey by submitting your first masterpiece."
           action={{ label: "Distribute your first track", href: "/dashboard/artist/releases/new" }}
        />
      ) : (
        <>
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-2 rounded-[2rem] border border-white/5">
             <div className="flex items-center gap-2 px-6 py-2 flex-grow">
                <Search className="w-4 h-4 text-white/20" />
                <input type="text" placeholder="Search by title, ISRC or UPC..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/10 font-sans" />
             </div>
             <div className="h-4 w-px bg-white/5 hidden md:block"></div>
             <div className="flex items-center gap-2 p-2">
                {["All", "Live", "Review", "Rejected"].map((f) => (
                  <button key={f} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${f === "All" ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
                    {f}
                  </button>
                ))}
                <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white transition-all">
                   <Filter className="w-4 h-4" />
                </button>
             </div>
          </div>

          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Release info</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Streams</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Release date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                       <td colSpan={5} className="px-8 py-8 h-20 bg-white/[0.02]"></td>
                    </tr>
                  ))
                ) : releases.map((rel) => (
                  <tr key={rel.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden border border-white/5 relative flex-shrink-0">
                           {rel.coverArtUrl ? (
                             <img src={rel.coverArtUrl} alt={rel.title} className="w-full h-full object-cover" />
                           ) : (
                             <Music className="w-6 h-6 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                           )}
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Play className="w-5 h-5 text-white fill-white" />
                           </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-primary transition-colors">{rel.title}</h4>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{rel.type} • {rel.genre}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(rel.status)}`}>
                          {rel.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2 text-white/60">
                          <span className="font-mono font-bold">0</span>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Plays</p>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-white/40 font-mono">
                      {new Date(rel.releaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10 transition-all">
                             <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10 transition-all">
                             <MoreVertical className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-8 py-4 glass rounded-3xl border border-white/5">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Showing {releases.length} recordings</p>
             <div className="flex gap-2">
                {[1].map(p => (
                  <button key={p} className="w-8 h-8 rounded-lg bg-primary text-black font-black text-xs">{p}</button>
                ))}
             </div>
          </div>
        </>
      )}
    </div>
  );
}
