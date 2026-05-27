"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  LayoutDashboard, Mic, AlbumIcon, ClipboardList, 
  CreditCard, Settings, Bell, Search, LogOut, 
  TrendingUp, ClockAlert, CheckCircle2, Users 
} from "lucide-react";
import { Skeleton } from "@/components/shared/Skeleton";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

type Stat = { label: string; value: string; change: string; up: boolean; accent: string };

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stat[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersRes] = await Promise.all([
          fetch("/api/admin/users").then(r => r.json()).catch(() => ({ users: [] })),
        ]);
        const allUsers: any[] = usersRes.users || [];
        const artistCount = allUsers.filter((u: any) => u.role === "ARTIST").length;
        const labelCount  = allUsers.filter((u: any) => u.role === "LABEL").length;

        setStats([
          { label: "Total Artists",    value: artistCount.toString(),  change: "",       up: true,  accent: "#ff88b6" },
          { label: "Total Labels",     value: labelCount.toString(),   change: "",       up: true,  accent: "#ffd709" },
          { label: "Pending Reviews",  value: "—",                     change: "Review", up: false, accent: "#ff88b6" },
          { label: "Active This Month",value: "—",                     change: "View",   up: true,  accent: "#ffd709" },
        ]);
        setArtists(allUsers.filter((u: any) => u.role === "ARTIST").slice(0, 5));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const employeeName = (session?.user as any)?.name || "Staff";

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-primary">Internal Dashboard</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Overview
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Welcome back, <span className="text-white font-semibold">{employeeName}</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0,1,2,3].map((i: any) => (
            <Skeleton key={i} className="h-[120px] rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-5 relative overflow-hidden group transition-transform hover:-translate-y-0.5 border"
                 style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="absolute right-0 top-0 w-28 h-28 rounded-full" style={{ background: `${s.accent}1a`, filter: "blur(30px)", transform: "translate(30%, -30%)" }} />
              <p className="text-sm font-medium mb-3 text-white/40">{s.label}</p>
              <div className="flex items-end justify-between relative z-10">
                <h3 className="text-4xl font-black text-white font-display">{s.value}</h3>
                {s.change && (
                  <span className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        style={{ background: `${s.accent}20`, color: s.accent }}>
                    {s.up ? <TrendingUp className="w-3 h-3" /> : <ClockAlert className="w-3 h-3" />}
                    {s.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Artist roster summary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold font-display">Active Roster Summary</h3>
          <Link href="/dashboard/employee/artists" className="text-xs text-primary font-bold hover:underline">
            View Full Roster →
          </Link>
        </div>

        {/* Header row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/5">
          <div className="col-span-4">Artist / ID</div>
          <div className="col-span-3">Genre</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          [0,1,2,3].map((i: any) => (
            <Skeleton key={i} className="h-[72px] rounded-2xl bg-white/5 animate-pulse" />
          ))
        ) : artists.length === 0 ? (
          <div className="rounded-2xl p-10 text-center border border-dashed border-white/10" style={{ background: "var(--card-bg)" }}>
            <Users className="w-10 h-10 mx-auto mb-3 text-white/20" />
            <p className="text-white/40">No artists found</p>
          </div>
        ) : (
          artists.map((artist) => (
            <div key={artist.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 group transition-colors border"
                 style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-black flex-shrink-0 font-display"
                     style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
                  {(artist.username || artist.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight font-display">
                    {artist.username || artist.email.split("@")[0]}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{artist.email}</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:block">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-white/70">
                  {artist.artistProfile?.primaryGenre || "—"}
                </span>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={artist.isActive
                        ? { background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.25)" }
                        : { background: "rgba(255,110,132,0.1)", color: "#ff6e84", border: "1px solid rgba(255,110,132,0.25)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: artist.isActive ? "#ffd709" : "#ff6e84" }} />
                  {artist.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="col-span-2 flex justify-end items-center gap-3">
                <ResetPasswordButton email={artist.email} />
                <Link href={`/dashboard/employee/artists`}
                      className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 cursor-pointer">
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
