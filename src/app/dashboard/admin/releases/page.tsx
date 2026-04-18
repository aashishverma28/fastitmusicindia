import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  Music, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ChevronRight,
  Globe
} from "lucide-react";
import Link from "next/link";

export default async function AdminReleasesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const releases = await prisma.release.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      artist: true,
      label: true
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-display text-white mb-2 tracking-tight italic">Global <span className="text-secondary">Releases</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Review, approve, and manage all music distributed on Fastit Music India.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 group focus-within:border-secondary transition-all">
              <Search className="w-4 h-4 text-white/20 group-focus-within:text-secondary" />
              <input type="text" placeholder="Search Title or ISRC..." className="bg-transparent border-none outline-none text-sm w-48 text-white" />
           </div>
           <button className="bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-white/60">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-white/5 pb-px overflow-x-auto custom-scrollbar">
         {["All", "Drafts", "Submitted", "Under Review", "Approved", "Live", "Rejected", "Taken Down"].map((tab, i) => (
           <button 
            key={tab} 
            className={`pb-4 px-2 text-sm font-bold whitespace-nowrap transition-all relative ${
              i === 0 ? "text-secondary border-b-2 border-secondary" : "text-white/40 hover:text-white"
            }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* Releases List */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hidden md:grid">
           <div className="col-span-5">Release Detail</div>
           <div className="col-span-3">Owner (Artist/Label)</div>
           <div className="col-span-2">Status</div>
           <div className="col-span-1">Date</div>
           <div className="col-span-1 text-right">View</div>
        </div>

        <div className="divide-y divide-white/5">
          {releases.length > 0 ? releases.map((rel) => (
            <div key={rel.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-white/[0.02] transition-colors group">
              <div className="md:col-span-5 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 relative border border-white/5 group-hover:border-secondary/30 transition-all">
                    {rel.coverArtUrl ? (
                       <img src={rel.coverArtUrl} alt={rel.title} className="w-full h-full object-cover" />
                    ) : (
                       <Music className="w-5 h-5 text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                 </div>
                 <div className="min-w-0">
                    <h3 className="font-bold text-white group-hover:text-secondary transition-colors truncate">
                       {rel.title}
                    </h3>
                    <p className="text-[10px] font-mono text-white/40 uppercase truncate">{rel.type} • {rel.genre}</p>
                 </div>
              </div>

              <div className="md:col-span-3">
                 <p className="text-sm font-bold text-white truncate">{rel.artist.stageName}</p>
                 {rel.label && <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate">{rel.label.labelName}</p>}
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                 {rel.status === "DRAFT" || rel.status === "SUBMITTED" ? <div className="w-2 h-2 rounded-full bg-blue-400"></div> : null}
                 {rel.status === "APPROVED" || rel.status === "LIVE" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : null}
                 {rel.status === "REJECTED" || rel.status === "TAKEN_DOWN" ? <XCircle className="w-4 h-4 text-red-500" /> : null}
                 {rel.status === "UNDER_REVIEW" ? <Clock className="w-4 h-4 text-yellow-500" /> : null}
                 <span className={`text-xs font-bold ${
                    rel.status === "DRAFT" || rel.status === "SUBMITTED" ? "text-blue-400" : 
                    rel.status === "APPROVED" || rel.status === "LIVE" ? "text-green-400" :
                    rel.status === "REJECTED" || rel.status === "TAKEN_DOWN" ? "text-red-500" : "text-yellow-500"
                 }`}>
                    {rel.status.replace("_", " ")}
                 </span>
              </div>

              <div className="md:col-span-1 text-xs font-bold text-white/40">
                 {new Date(rel.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                 })}
              </div>

              <div className="md:col-span-1 text-right">
                 <Link 
                  href={`/dashboard/admin/releases/${rel.id}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-secondary/30 transition-all"
                 >
                    <ChevronRight className="w-5 h-5" />
                 </Link>
              </div>
            </div>
          )) : (
            <div className="p-24 text-center">
               <Globe className="w-16 h-16 text-white/10 mx-auto mb-6" />
               <p className="text-white/20 font-bold text-xl italic tracking-tight">No Releases Found</p>
               <p className="text-white/10 text-sm mt-2">When artists submit music, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
