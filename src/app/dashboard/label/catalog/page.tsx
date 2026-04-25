"use client";

import { useState, useEffect } from "react";
import { 
  Music, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Play,
  Users,
  LayoutGrid,
  List
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmptyState from "@/components/shared/EmptyState";

export default function LabelCatalogPage() {
  const [releases, setReleases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
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
    <div className="space-y-10 pb-20">
      {showSuccess && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
           <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <p className="text-sm font-bold text-white">Batch distribution initiated. All tracks are now under review.</p>
           </div>
           <button onClick={() => window.history.replaceState({}, '', window.location.pathname)} className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Label <span className="gradient-text">Catalog</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Managing {releases.length} records across your signed roster.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all ${viewMode === "table" ? "bg-white/10 text-white" : "text-white/20 hover:text-white"}`}
              >
                 <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/20 hover:text-white"}`}
              >
                 <LayoutGrid className="w-4 h-4" />
              </button>
           </div>
           <Link href="/dashboard/label/catalog/new" className="btn-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
             <Plus className="w-5 h-5" /> Submit New Music
           </Link>
        </div>
      </div>

      {!isLoading && releases.length === 0 ? (
        <EmptyState 
           icon={Music}
           title="Empty Catalog"
           description="Your label's discography is currently empty. Start distributing music for your artists."
           action={{ label: "Start your first batch", href: "/dashboard/label/catalog/new" }}
        />
      ) : (
        <>
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-2 rounded-[2rem] border border-white/5">
             <div className="flex items-center gap-2 px-6 py-2 flex-grow">
                <Search className="w-4 h-4 text-white/20" />
                <input type="text" placeholder="Search by release, artist, or ISRC..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/10 font-sans" />
             </div>
             <div className="h-4 w-px bg-white/5 hidden md:block"></div>
             <div className="flex items-center gap-2 p-2">
                {["All", "Live", "Review", "Rejected"].map((f: any) => (
                  <button key={f} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${f === "All" ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
                    {f}
                  </button>
                ))}
                <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white transition-all">
                   <Filter className="w-4 h-4" />
                </button>
             </div>
          </div>

          {viewMode === "table" ? (
            <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Recording</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Artist</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Release date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
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
                         <div className="flex items-center gap-2">
                            <Users className="w-3 h-3 text-secondary" />
                            <span className="font-bold text-white/80">{rel.artist?.stageName || "N/A"}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(rel.status)}`}>
                            {rel.status}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-white/40 font-mono">
                        {new Date(rel.releaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button className="p-3 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10 transition-all">
                            <ExternalLink className="w-4 h-4" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {releases.map((rel) => (
                 <div key={rel.id} className="glass rounded-3xl border border-white/5 overflow-hidden group hover:border-primary/20 transition-all">
                    <div className="aspect-square relative overflow-hidden">
                       {rel.coverArtUrl ? (
                         <img src={rel.coverArtUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       ) : (
                         <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <Music className="w-12 h-12 text-white/10" />
                         </div>
                       )}
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <Play className="w-10 h-10 text-primary fill-primary" />
                       </div>
                       <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border backdrop-blur-md ${getStatusStyle(rel.status)}`}>
                            {rel.status}
                          </span>
                       </div>
                    </div>
                    <div className="p-5 space-y-2">
                       <h4 className="font-bold text-white truncate">{rel.title}</h4>
                       <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold text-white/40 truncate">{rel.artist?.stageName}</p>
                          <p className="text-[9px] font-black text-secondary uppercase">{rel.type}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
