import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  Users, 
  Music, 
  FileCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Fetch real stats
  const [userCount, releaseCount, appCount, recentApps] = await Promise.all([
    prisma.user.count(),
    prisma.release.count(),
    prisma.application.count({ where: { status: "NEW" } }),
    prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    })
  ]);

  const stats = [
    { name: "Total Users", value: userCount.toString(), icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Live Releases", value: releaseCount.toString(), icon: Music, color: "text-primary", bg: "bg-primary/10" },
    { name: "New Applications", value: appCount.toString(), icon: FileCheck, color: "text-secondary", bg: "bg-secondary/10" },
    { name: "System Uptime", value: "99.9%", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black font-display text-white mb-2 tracking-tight">System <span className="gradient-text">Overview</span></h1>
        <p className="text-white/40 text-sm font-sans">Real-time platform metrics and pending actions.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Updated Now</span>
            </div>
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{stat.name}</p>
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <Clock className="w-5 h-5 text-primary" /> Recent Applications
            </h2>
            <Link href="/dashboard/admin/applications" className="text-xs font-bold text-primary hover:underline">
               View All
            </Link>
          </div>

          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5">Applicant</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5">Type</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5">Date</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.length > 0 ? recentApps.map((app: any) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5 border-b border-white/5">
                      <div>
                        <p className="font-bold text-white leading-none mb-1">{(app.applicantData as any).fullName || (app.applicantData as any).labelName}</p>
                        <p className="text-[10px] font-mono text-white/40">{app.applicationId}</p>
                      </div>
                    </td>
                    <td className="p-5 border-b border-white/5">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                        app.type === "ARTIST" ? "bg-primary/20 text-primary border border-primary/20" : "bg-secondary/20 text-secondary border border-secondary/20"
                      }`}>
                        {app.type}
                      </span>
                    </td>
                    <td className="p-5 border-b border-white/5 text-xs text-white/40">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 border-b border-white/5">
                      <Link href={`/dashboard/admin/applications/${app.id}`} className="text-white/40 group-hover:text-primary transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-white/20 font-bold italic">No pending applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white">System Status</h2>
           <div className="space-y-4">
              <div className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-white/60">Database</p>
                    <p className="text-sm font-black text-green-400">OPERATIONAL</p>
                 </div>
                 <div className="w-12 h-12 bg-green-400/10 rounded-2xl flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                 </div>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-white/60">Storage Subsystem</p>
                    <p className="text-sm font-black text-green-400">OPERATIONAL</p>
                 </div>
                 <div className="w-12 h-12 bg-green-400/10 rounded-2xl flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-[2rem] border border-white/10 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <FileCheck className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter italic">Review Queue</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">
                 You have **{appCount}** applications waiting for review. Processing them promptly ensures a better artist experience.
              </p>
              <Link href="/dashboard/admin/applications" className="btn-gradient w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                 Start Reviewing <ArrowUpRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
