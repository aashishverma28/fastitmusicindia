import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  ArrowLeft, 
  TrendingUp, 
  Music, 
  DollarSign, 
  Calendar,
  Globe,
  PieChart,
  BarChart3
} from "lucide-react";
import Link from "next/link";

export default async function ArtistDetailAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "LABEL") {
    redirect("/login");
  }

  const labelProfile = await prisma.labelProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!labelProfile) return redirect("/dashboard/label");

  const artist = await prisma.artistProfile.findUnique({
    where: { id: id },
    include: {
      user: { select: { email: true, username: true } },
      releases: {
        where: { labelId: labelProfile.id },
        include: { tracks: true }
      },
      revenues: {
        where: { labelId: labelProfile.id }
      }
    }
  });

  if (!artist) {
    return redirect("/dashboard/label/roster");
  }

  const totalStreams = artist.revenues.reduce((acc, rev) => acc + rev.streams, 0);
  const totalRevenue = artist.revenues.reduce((acc, rev) => acc + rev.revenueAmount, 0);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/label/roster" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            {artist.stageName} <span className="text-secondary">Analytics</span>
          </h1>
          <p className="text-white/40 text-xs font-sans">Detailed performance data for this roster member.</p>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Total Plays", value: totalStreams.toLocaleString(), icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
          { name: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-secondary", bg: "bg-secondary/10" },
          { name: "Active Catalog", value: `${artist.releases.length} Releases`, icon: Music, color: "text-blue-400", bg: "bg-blue-400/10" },
        ].map((stat) => (
          <div key={stat.name} className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.name}</p>
              <h3 className="text-3xl font-black text-white italic">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Catalog Performance */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
               <BarChart3 className="w-5 h-5 text-secondary" /> Catalog Performance
            </h2>
            <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead>
                     <tr className="bg-white/5">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Release</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Streams</th>
                        <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Revenue</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {artist.releases.length > 0 ? artist.releases.map((release) => {
                        const releaseStreams = artist.revenues
                          .filter(r => r.releaseId === release.id)
                          .reduce((acc, r) => acc + r.streams, 0);
                        const releaseRev = artist.revenues
                          .filter(r => r.releaseId === release.id)
                          .reduce((acc, r) => acc + r.revenueAmount, 0);

                        return (
                          <tr key={release.id} className="hover:bg-white/[0.02]">
                            <td className="px-8 py-5 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                {release.coverArtUrl ? (
                                  <img src={release.coverArtUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Music className="w-5 h-5 text-white/10" />
                                )}
                              </div>
                              <span className="font-bold text-white">{release.title}</span>
                            </td>
                            <td className="px-8 py-5 font-mono text-white/60">{releaseStreams.toLocaleString()}</td>
                            <td className="px-8 py-5 text-right font-black text-secondary">₹{releaseRev.toLocaleString()}</td>
                          </tr>
                        );
                     }) : (
                        <tr>
                           <td colSpan={3} className="px-8 py-20 text-center text-white/20 italic text-xs">
                              No recordings distributed under this label yet.
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Platform Breakdown */}
         <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
               <Globe className="w-5 h-5 text-primary" /> Platform Breakdown
            </h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <div className="flex items-center justify-center py-10">
                  <PieChart className="w-32 h-32 text-white/5 animate-pulse" />
               </div>
               <p className="text-center text-white/20 text-xs font-sans">
                  Deep platform-specific analytics for <strong>{artist.stageName}</strong> are being processed. 
                  Geographic and demographic data will populate as more streams are verified.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
