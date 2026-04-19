import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { 
  ArrowLeft, 
  Music, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  Calendar, 
  User, 
  Building2, 
  Tag 
} from "lucide-react";
// ReleaseStatusManager import removed since it doesn't exist and inline forms are used.

export default async function AdminReleaseDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const release = await prisma.release.findUnique({
    where: { id },
    include: {
      artist: true,
      label: true,
      tracks: {
        orderBy: { trackNumber: "asc" }
      }
    }
  });

  if (!release) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Release Not Found</h2>
        <p className="text-white/40 mb-6">The requested release does not exist or has been deleted.</p>
        <Link href="/dashboard/admin/releases" className="btn-gradient px-6 py-2 rounded-xl">Back to Releases</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/releases" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight italic">Release <span className="text-secondary">Review</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Evaluate and manage this submission.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Release Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row gap-8">
            <div className="w-48 h-48 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative flex-shrink-0">
              {release.coverArtUrl ? (
                <img src={release.coverArtUrl} alt={release.title} className="w-full h-full object-cover" />
              ) : (
                <Music className="w-12 h-12 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full border bg-black/40 text-secondary border-secondary/20">
                    {release.type}
                  </span>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                    release.status === "DRAFT" || release.status === "SUBMITTED" ? "bg-blue-400/10 text-blue-400 border-blue-400/20" : 
                    release.status === "APPROVED" || release.status === "LIVE" ? "bg-green-400/10 text-green-400 border-green-400/20" :
                    release.status === "REJECTED" || release.status === "TAKEN_DOWN" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }`}>
                    {release.status.replace("_", " ")}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white">{release.title}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-white/30 flex items-center gap-1"><User className="w-3 h-3"/> Artist</p>
                  <p className="text-sm font-bold text-white">{release.artist.stageName}</p>
                </div>
                {release.label && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-white/30 flex items-center gap-1"><Building2 className="w-3 h-3"/> Label</p>
                    <p className="text-sm font-bold text-white">{release.label.labelName}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-white/30 flex items-center gap-1"><Calendar className="w-3 h-3"/> Release Date</p>
                  <p className="text-sm font-bold text-white">
                    {new Date(release.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-white/30 flex items-center gap-1"><Tag className="w-3 h-3"/> Genre</p>
                  <p className="text-sm font-bold text-white">{release.genre} {release.subGenre ? `• ${release.subGenre}` : null}</p>
                </div>
              </div>

              {release.description && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase text-white/30 mb-2">Description / Press Release</p>
                  <p className="text-sm text-white/60 font-sans leading-relaxed">{release.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tracklist Window */}
          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
             <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white italic flex items-center gap-2"><Music className="w-5 h-5 text-secondary" /> Tracklist ({release.tracks.length})</h3>
             </div>
             <div className="divide-y divide-white/5">
                {release.tracks.length > 0 ? release.tracks.map((track) => (
                  <div key={track.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-white/40">
                           {track.trackNumber}
                        </div>
                        <div>
                           <h4 className="font-bold text-white">{track.title}</h4>
                           <p className="text-xs text-white/40 font-mono mt-1">ISRC: {track.isrc || "Pending"} • Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <audio controls src={track.audioFileUrl} className="h-10 w-64 md:w-48 appearance-none rounded-full bg-transparent" />
                     </div>
                  </div>
                )) : (
                  <div className="p-10 text-center">
                     <p className="text-white/40 italic">No tracks uploaded yet.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar Status / Action Panel */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white italic">Management</h3>
              <p className="text-sm text-white/40 font-sans">
                 Review this submission carefully. Ensure all metadata is accurate and audio files meet quality guidelines before approving.
              </p>

              {/* Status form (simplified simulation for now until API is built, or basic manual instructions) */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                 <p className="text-[10px] font-black uppercase text-white/30 text-center">Current Status: {release.status}</p>
                 {release.status === "SUBMITTED" || release.status === "UNDER_REVIEW" ? (
                   <div className="flex flex-col gap-3">
                     <form method="POST" action={`/api/admin/releases/${release.id}/status`} className="w-full">
                       <input type="hidden" name="status" value="APPROVED" />
                       <button type="submit" className="w-full btn-gradient py-3 rounded-xl font-bold text-sm">Approve Release</button>
                     </form>
                     <form method="POST" action={`/api/admin/releases/${release.id}/status`} className="w-full">
                       <input type="hidden" name="status" value="REJECTED" />
                       <button type="submit" className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors">Reject / Request Changes</button>
                     </form>
                   </div>
                 ) : (
                   <div className="p-4 rounded-xl bg-white/5 text-center">
                     <CheckCircle2 className="w-6 h-6 text-white/20 mx-auto mb-2" />
                     <p className="text-xs text-white/50">This release has already been processed.</p>
                   </div>
                 )}
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white italic">Metadata Checklist</h3>
              <ul className="space-y-3 text-sm text-white/60">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary"/> Cover Art HQ (3000x3000px)</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary"/> Copyright correctly inputted</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary"/> No explicit content mismatch</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary"/> Audio files lossless (.wav)</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
