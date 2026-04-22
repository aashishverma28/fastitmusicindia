import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  TrendingUp, 
  Music, 
  MapPin, 
  Globe, 
  Headphones, 
  Calendar,
  Layers,
  ChevronUp,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function ArtistAnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  // Fetch performance data
  const revenueData = await prisma.revenue.findMany({
    where: { artist: { userId: session.user.id } },
    include: {
      track: true,
      release: true
    },
    orderBy: { period: "desc" }
  });

  // Calculate Aggregates
  const totalStreams = revenueData.reduce((acc, r) => acc + r.streams, 0);
  const totalRevenue = revenueData.reduce((acc, r) => acc + r.revenueAmount, 0);
  
  // Group by Track
  const trackPerformance = revenueData.reduce((acc: any, r) => {
    const key = r.trackId || "unassigned";
    if (!acc[key]) acc[key] = { title: r.track?.title || r.release?.title || "Unknown", streams: 0, revenue: 0 };
    acc[key].streams += r.streams;
    acc[key].revenue += r.revenueAmount;
    return acc;
  }, {});

  const topTracks = Object.values(trackPerformance).sort((a: any, b: any) => b.streams - a.streams).slice(0, 5);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic"><span className="gradient-text">Pulse</span> Analytics</h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Real-time engagement and distribution insights for your catalog.</p>
        </div>
        <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/5">
           {["7D", "30D", "90D", "All"].map((t) => (
             <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === "30D" ? "bg-primary text-black" : "text-white/40 hover:text-white"}`}>{t}</button>
           ))}
        </div>
      </div>

      {/* Snapshot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4 shadow-[0_0_50px_rgba(255,136,182,0.05)]">
            <div className="flex items-center justify-between">
               <div className="p-4 rounded-2xl bg-primary/20">
                  <Headphones className="w-6 h-6 text-primary" />
               </div>
               <div className="flex items-center gap-1 text-green-400 text-xs font-black">
                  <ChevronUp className="w-4 h-4" /> 12%
               </div>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Total Consumption</p>
               <h3 className="text-4xl font-black text-white italic tracking-tighter">{(totalStreams / 1000).toFixed(1)}k <span className="text-sm font-sans font-medium text-white/40 not-italic">Plays</span></h3>
            </div>
         </div>

         <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
            <div className="flex items-center justify-between">
               <div className="p-4 rounded-2xl bg-blue-400/20">
                  < Globe className="w-6 h-6 text-blue-400" />
               </div>
               <div className="flex items-center gap-1 text-green-400 text-xs font-black">
                  <ChevronUp className="w-4 h-4" /> 8%
               </div>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Territorial Reach</p>
               <h3 className="text-4xl font-black text-white italic tracking-tighter">14 <span className="text-sm font-sans font-medium text-white/40 not-italic">Countries</span></h3>
            </div>
         </div>

         <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
            <div className="flex items-center justify-between">
               <div className="p-4 rounded-2xl bg-green-400/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
               </div>
               <div className="flex items-center gap-1 text-red-400 text-xs font-black">
                  <ChevronDown className="w-4 h-4" /> 2%
               </div>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Market Velocity</p>
               <h3 className="text-4xl font-black text-white italic tracking-tighter">Top 5% <span className="text-sm font-sans font-medium text-white/40 not-italic">Share</span></h3>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Main Chart Card */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass p-10 rounded-[3rem] border border-white/5 space-y-8 flex-grow relative overflow-hidden group">
               <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-2xl font-black text-white italic tracking-tighter">Streaming <span className="text-primary">Dynamics</span></h2>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Plays</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Revenue</span>
                     </div>
                  </div>
               </div>

               {/* High-Fidelity Mock Chart */}
               <div className="h-[300px] flex items-end justify-between gap-2 pt-10 px-4">
                  {[40, 60, 45, 90, 65, 80, 55, 95, 75, 50, 85, 70].map((h, i) => (
                    <div key={i} className="flex-grow flex flex-col items-center justify-end group/bar cursor-pointer">
                       <div className="w-full bg-primary/10 rounded-t-xl group-hover/bar:bg-primary/30 transition-all duration-500 relative" style={{ height: `${h}%` }}>
                          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                             {h * 10}
                          </div>
                          <div className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-700" style={{ height: `${h * 0.7}%` }}></div>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="flex justify-between px-4 pt-6 border-t border-white/5">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                    <span key={m} className="text-[10px] font-black text-white/20 uppercase tracking-widest">{m}</span>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <h2 className="text-lg font-bold text-white italic">Platform Breakdown</h2>
                  <div className="space-y-5">
                     {[
                       { name: "Spotify", share: 62, color: "bg-[#1DB954]" },
                       { name: "Apple Music", share: 22, color: "bg-[#FA2D48]" },
                       { name: "YouTube Music", share: 12, color: "bg-[#FF0000]" },
                       { name: "Amazon Music", share: 4, color: "bg-[#00A8E1]" },
                     ].map((p: any) => (
                       <div key={p.name} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-white/40 italic">{p.name}</span>
                             <span className="text-white">{p.share}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full ${p.color}`} style={{ width: `${p.share}%` }}></div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <h2 className="text-lg font-bold text-white italic">Audio Fidelity</h2>
                  <div className="flex items-center justify-center pt-4">
                     {/* Simplified Gauge */}
                     <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                           <circle cx="80" cy="80" r="70" fill="transparent" stroke="url(#blue_gradient)" strokeWidth="12" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" />
                           <defs>
                              <linearGradient id="blue_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                 <stop offset="0%" stopColor="#3B82F6" />
                                 <stop offset="100%" stopColor="#8B5CF6" />
                              </linearGradient>
                           </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                           <p className="text-3xl font-black text-white italic">75%</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Hi-Res Lossless</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Track Performance List */}
         <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-white italic flex items-center gap-3">
               <Music className="w-5 h-5 text-primary" /> Track Power
            </h2>
            <div className="glass p-2 rounded-[3rem] border border-white/5 divide-y divide-white/5">
               {topTracks.length > 0 ? topTracks.map((t: any, i) => (
                 <div key={i} className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all rounded-3xl first:rounded-t-[2.5rem] last:rounded-b-[2.5rem]">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-white/10 group-hover:text-primary transition-colors">0{i + 1}</span>
                       <div>
                          <p className="font-bold text-white group-hover:text-primary transition-colors truncate w-32">{t.title}</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{(t.streams / 1000).toFixed(1)}k Plays</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-white">₹{t.revenue.toFixed(0)}</p>
                       <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">+4%</p>
                    </div>
                 </div>
               )) : (
                 <div className="p-20 text-center space-y-4">
                    <Layers className="w-10 h-10 text-white/5 mx-auto" />
                    <p className="text-xs font-bold text-white/20 italic tracking-tighter">Insufficient Data for Ranking</p>
                 </div>
               )}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-[2.5rem] border border-white/10 space-y-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all">
                  <MapPin className="w-24 h-24" />
               </div>
               <h3 className="text-2xl font-black text-white italic tracking-tighter">Territory Reach</h3>
               <p className="text-sm text-white/40 font-sans leading-relaxed">
                  Most of your listeners are tuning in from **Mumbai, Delhi, and Bangalore**. You're building a strong regional foothold.
               </p>
               <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">
                  Explore Global Heatmap <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

