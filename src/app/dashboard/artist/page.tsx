import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  Music, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Play,
  Clock,
  ExternalLink,
  ChevronRight,
  Headphones,
  Download,
  PlusCircle
} from "lucide-react";
import Link from "next/link";

export default async function ArtistDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  // Fetch Artist Data
  const artistProfile = await prisma.artistProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      releases: {
        take: 5,
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!artistProfile) {
     return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
           <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
              <Users className="w-10 h-10 text-primary" />
           </div>
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-white italic tracking-tight">Complete Your Profile</h2>
              <p className="text-white/40 max-w-md mx-auto">We couldn't find your artist profile details. Please complete your onboarding to start distributing music.</p>
           </div>
           <button className="btn-gradient px-8 py-3 rounded-xl font-bold">Complete Setup</button>
        </div>
     );
  }

  const revenueData = await prisma.revenue.aggregate({
    where: { artist: { userId: session.user.id } },
    _sum: { streams: true, revenueAmount: true }
  });

  const totalStreams = revenueData._sum.streams || 0;
  const totalRevenue = revenueData._sum.revenueAmount || 0;
  const monthlyListeners = Math.floor(totalStreams * 0.33);

  const formatNum = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  };

  const stats = [
    { name: "Total Streams", value: totalStreams > 0 ? formatNum(totalStreams) : "0", change: totalStreams > 0 ? "+12%" : "-", icon: Headphones, color: "text-primary", bg: "bg-primary/10" },
    { name: "Monthly Listeners", value: monthlyListeners > 0 ? formatNum(monthlyListeners) : "0", change: monthlyListeners > 0 ? "+5%" : "-", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Estimated Revenue", value: `₹${totalRevenue > 0 ? formatNum(totalRevenue) : "0"}`, change: totalRevenue > 0 ? "+18%" : "-", icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
    { name: "Global Rank", value: totalStreams > 0 ? "#1,420" : "-", change: totalStreams > 0 ? "Top 5%" : "-", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tight italic">
            Welcome back, <span className="gradient-text">{artistProfile.stageName}</span>
          </h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Your music performance across all platforms is looking great this month.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="bg-white/5 px-6 py-3 rounded-xl border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
           </button>
           <Link href="/dashboard/artist/releases/new" className="btn-gradient px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
              <PlusCircle className="w-4 h-4" /> New Release
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md bg-white/5 ${stat.color}`}>{stat.change}</span>
            </div>
            <div>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-white flex items-center gap-2 italic">
                <TrendingUp className="w-5 h-5 text-primary" /> Streaming Analytics
             </h2>
             <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                <button className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/10 rounded-md">Weekly</button>
                <button className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Monthly</button>
             </div>
          </div>
          
          <div className="glass h-[350px] rounded-[2.5rem] border border-white/5 flex items-center justify-center relative overflow-hidden group">
             {/* Mock Chart Visualization */}
             <div className="absolute inset-0 flex items-end justify-between px-10 pb-10 opacity-20">
                {[40, 70, 45, 90, 65, 80, 55, 95, 75, 40, 85, 60].map((h, i) => (
                  <div key={i} className="w-3 bg-primary rounded-t-full transition-all duration-1000 group-hover:bg-secondary" style={{ height: `${h}%` }}></div>
                ))}
             </div>
             <div className="z-10 text-center space-y-2">
                <p className="text-white/60 font-medium italic">Advanced Analytics Visualization</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Connect Data Providers to Begin</p>
             </div>
          </div>
        </div>

        {/* Recent Releases Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-white italic">Latest Catalog</h2>
             <Link href="/dashboard/artist/releases" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">See All</Link>
          </div>

          <div className="space-y-4">
             {artistProfile.releases.length > 0 ? artistProfile.releases.map((rel) => (
               <div key={rel.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/[0.02] transition-all">
                  <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 relative">
                     {rel.coverArtUrl ? (
                        <img src={rel.coverArtUrl} alt={rel.title} className="w-full h-full object-cover" />
                     ) : (
                        <Music className="w-6 h-6 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                     )}
                  </div>
                  <div className="flex-grow min-w-0">
                     <h4 className="font-bold text-white text-sm truncate group-hover:text-primary transition-colors">{rel.title}</h4>
                     <p className="text-[10px] text-white/40 font-mono tracking-tighter uppercase">{rel.type} • {rel.status}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${rel.status === "LIVE" ? "bg-green-400" : "bg-yellow-500 animate-pulse"}`}></div>
               </div>
             )) : (
               <div className="glass p-8 rounded-[2rem] border border-white/5 text-center space-y-4">
                  <Music className="w-10 h-10 text-white/5 mx-auto" />
                  <p className="text-xs font-bold text-white/20 italic">No releases found in your catalog.</p>
                  <Link href="/dashboard/artist/releases/new" className="inline-block text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Distribute Music Now</Link>
               </div>
             )}

             <Link href="/dashboard/artist/releases/new" className="flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 group hover:border-primary/40 transition-all">
                <div className="space-y-1">
                   <p className="text-xs font-black text-white uppercase tracking-tighter">Ready for the world?</p>
                   <p className="text-[10px] text-white/40 font-sans tracking-tight">Upload your next hit today.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                   <PlusCircle className="w-5 h-5" />
                </div>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
