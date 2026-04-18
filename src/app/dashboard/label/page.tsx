import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  Users, 
  Music, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Building2, 
  ChevronRight,
  Headphones,
  Globe,
  PieChart,
  PlusCircle
} from "lucide-react";
import Link from "next/link";

export default async function LabelDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "LABEL") {
    redirect("/login");
  }

  // Fetch Label Profile
  const labelProfile = await prisma.labelProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!labelProfile) {
     return redirect("/apply/status"); 
  }

  const revenueData = await prisma.revenue.aggregate({
    where: { label: { userId: session.user.id } },
    _sum: { streams: true, revenueAmount: true }
  });

  const totalStreams = revenueData._sum.streams || 0;
  const totalRevenue = revenueData._sum.revenueAmount || 0;
  const rosterCount = labelProfile.artistCount || 0;

  const formatNum = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  };

  const stats = [
    { name: "Total Roster", value: `${rosterCount} Artists`, icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
    { name: "Global Plays", value: totalStreams > 0 ? formatNum(totalStreams) : "0", icon: Headphones, color: "text-primary", bg: "bg-primary/10" },
    { name: "Quarterly Revenue", value: `₹${totalRevenue > 0 ? formatNum(totalRevenue) : "0"}`, icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
    { name: "Market Share", value: totalStreams > 0 ? "2.4%" : "0%", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tighter italic">
            Label <span className="gradient-text">Intelligence</span>
          </h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Consolidated performance metrics for <span className="text-white font-bold">{labelProfile.labelName}</span>.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="bg-white/5 px-6 py-3 rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <PieChart className="w-4 h-4" /> Market Analysis
           </button>
           <Link href="/dashboard/label/catalog/new" className="btn-gradient px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-secondary/20 border border-secondary/20">
              <PlusCircle className="w-4 h-4" /> Submit Batch
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-white/10">30D</span>
            </div>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Artist Roster Snapshot */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white italic flex items-center gap-2">
                 <Users className="w-5 h-5 text-secondary" /> Top Performers
              </h2>
              <Link href="/dashboard/label/roster" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">Full Roster</Link>
           </div>
           
           <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/5">
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Artist</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Releases</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Plays (30d)</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 font-sans">
                    {[
                       { name: "Aria West", releases: 12, plays: "45.2k", color: "bg-primary" },
                       { name: "Lunar Shadows", releases: 4, plays: "28.1k", color: "bg-blue-400" },
                       { name: "Oceanic Vibe", releases: 7, plays: "12.5k", color: "bg-green-400" },
                    ].map((artist, i) => (
                       <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${artist.color}/20 flex items-center justify-center font-black text-[10px] text-white`}>
                                   {artist.name[0]}
                                </div>
                                <span className="font-bold text-white group-hover:text-secondary transition-colors">{artist.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-4 text-white/40 font-bold text-sm tracking-tight">{artist.releases}</td>
                          <td className="px-8 py-4 text-white/40 font-bold text-sm tracking-tight">{artist.plays}</td>
                          <td className="px-8 py-4">
                             <Link href={`/dashboard/label/roster/${i}`} className="text-white/20 group-hover:text-white transition-colors">
                                <ChevronRight className="w-5 h-5" />
                             </Link>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Territory Overview */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white italic">Territory Analytics</h2>
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="space-y-6">
                 {[
                    { country: "India", share: 65, color: "bg-secondary" },
                    { country: "United States", share: 15, color: "bg-primary" },
                    { country: "United Kingdom", share: 10, color: "bg-blue-400" },
                    { country: "Others", share: 10, color: "bg-white/10" },
                 ].map((t) => (
                    <div key={t.country} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white/40">{t.country}</span>
                          <span className="text-white">{t.share}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${t.color}`} style={{ width: `${t.share}%` }}></div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4 group cursor-pointer hover:border-secondary transition-all">
                 <Globe className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                 <div>
                    <p className="text-xs font-black text-white uppercase tracking-tighter">Global Footprint</p>
                    <p className="text-[10px] text-white/40 font-sans mt-0.5">Explore full geographic data</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
