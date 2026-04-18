import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  FileCheck, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default async function AdminApplicationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-display text-white mb-2 tracking-tight italic">Registry <span className="gradient-text">Queue</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Review and process partner applications for Fastit Music India.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 group focus-within:border-primary transition-all">
              <Search className="w-4 h-4 text-white/20 group-focus-within:text-primary" />
              <input type="text" placeholder="Search Application ID..." className="bg-transparent border-none outline-none text-sm w-48 text-white" />
           </div>
           <button className="bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-white/60">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-white/5 pb-px">
         {["All", "New", "Reviewing", "Approved", "Rejected"].map((tab, i) => (
           <button 
            key={tab} 
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${
              i === 0 ? "text-primary border-b-2 border-primary" : "text-white/40 hover:text-white"
            }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* Applications List */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
           <div className="col-span-4">Applicant Detail</div>
           <div className="col-span-2">Type</div>
           <div className="col-span-2">Status</div>
           <div className="col-span-3">Submitted At</div>
           <div className="col-span-1 text-right">View</div>
        </div>

        <div className="divide-y divide-white/5">
          {applications.length > 0 ? applications.map((app) => (
            <div key={app.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-white/[0.02] transition-colors group">
              <div className="col-span-4 flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                    app.type === "ARTIST" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                 }`}>
                    {((app.applicantData as any).fullName?.[0] || (app.applicantData as any).labelName?.[0] || "?").toUpperCase()}
                 </div>
                 <div>
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                       {(app.applicantData as any).fullName || (app.applicantData as any).labelName}
                    </h3>
                    <p className="text-[10px] font-mono text-white/40">{app.applicationId}</p>
                 </div>
              </div>

              <div className="col-span-2">
                 <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                    app.type === "ARTIST" ? "bg-black/40 text-primary border-primary/20" : "bg-black/40 text-secondary border-secondary/20"
                 }`}>
                    {app.type}
                 </span>
              </div>

              <div className="col-span-2 flex items-center gap-2">
                 {app.status === "NEW" && <div className="w-2 h-2 rounded-full bg-blue-400"></div>}
                 {app.status === "APPROVED" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                 {app.status === "REJECTED" && <XCircle className="w-4 h-4 text-red-500" />}
                 {app.status === "UNDER_REVIEW" && <Clock className="w-4 h-4 text-yellow-500" />}
                 <span className={`text-xs font-bold ${
                    app.status === "NEW" ? "text-blue-400" : 
                    app.status === "APPROVED" ? "text-green-400" :
                    app.status === "REJECTED" ? "text-red-500" : "text-yellow-500"
                 }`}>
                    {app.status.replace("_", " ")}
                 </span>
              </div>

              <div className="col-span-3 text-sm text-white/40">
                 {new Date(app.createdAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                 })}
              </div>

              <div className="col-span-1 text-right">
                 <Link 
                  href={`/dashboard/admin/applications/${app.id}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                 >
                    <ChevronRight className="w-5 h-5" />
                 </Link>
              </div>
            </div>
          )) : (
            <div className="p-24 text-center">
               <FileCheck className="w-16 h-16 text-white/10 mx-auto mb-6" />
               <p className="text-white/20 font-bold text-xl italic tracking-tight">System Registry is Currently Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
