"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { 
  LayoutDashboard, Mic, AlbumIcon, ClipboardList, 
  CreditCard, Settings, Bell, Search, LogOut, 
  TrendingUp, ClockAlert, CheckCircle2, Users, Menu, X 
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview",     icon: LayoutDashboard, href: "/dashboard/employee",              active: true  },
  { label: "Artists",      icon: Mic,             href: "/dashboard/employee/artists"                     },
  { label: "Labels",       icon: AlbumIcon,        href: "/dashboard/employee/labels"                     },
  { label: "Applications", icon: ClipboardList,   href: "/dashboard/employee/applications"               },
  { label: "Finance",      icon: CreditCard,      href: "/dashboard/employee/finance"                    },
  { label: "Settings",     icon: Settings,        href: "/dashboard/employee/settings"                   },
];

type Stat = { label: string; value: string; change: string; up: boolean; accent: string };

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
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
    <div className="min-h-screen flex relative antialiased" style={{ background: "#0e0e0e", color: "#fff", fontFamily: "'Manrope', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;900&family=Manrope:wght@400;500;600;700&display=swap');`}</style>

      {/* Ambient glow */}
      <div className="fixed pointer-events-none z-0" style={{ top: "-10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,136,182,0.15)", filter: "blur(120px)" }} />
      <div className="fixed pointer-events-none z-0" style={{ bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,215,9,0.08)", filter: "blur(120px)" }} />

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 z-40 flex flex-col p-4 gap-1 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
             style={{ background: "#0e0e0e", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        
        <div className="px-4 py-5 mb-2">
          <h1 className="text-xl font-black tracking-tighter" style={{ fontFamily: "Epilogue", background: "linear-gradient(to right, #ffd709, #ff88b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fastit Music</h1>
          <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Internal Portal</p>
        </div>

        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <Link key={item.label} href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={item.active
                    ? { background: "linear-gradient(90deg,#ffd709,#ff88b6)", color: "#000", fontWeight: 700 }
                    : { color: "rgba(255,255,255,0.45)" }
                  }>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <button onClick={() => signOut({ callbackUrl: "/staff/login" })}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium transition-all"
                  style={{ color: "rgba(255,100,100,0.7)" }}>
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* Top bar */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 gap-4"
                style={{ background: "rgba(14,14,14,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <button className="md:hidden p-2 rounded-lg transition-colors" style={{ color: "rgba(255,255,255,0.5)" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search artists, labels, ISRC..."
              className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white outline-none"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full relative" style={{ color: "#ff88b6" }}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#ff88b6" }} />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black"
                 style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
              {employeeName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10 space-y-10">

          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#ff88b6" }}>Internal Dashboard</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "Epilogue" }}>
                Artist Roster
              </h2>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Welcome back, <span className="text-white font-semibold">{employeeName}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                <ClipboardList className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Stats grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.04)", height: 120 }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-2xl p-5 relative overflow-hidden group transition-transform hover:-translate-y-0.5"
                     style={{ background: i >= 2 ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))` : "rgba(255,255,255,0.04)", border: `1px solid ${s.accent}33` }}>
                  <div className="absolute right-0 top-0 w-28 h-28 rounded-full" style={{ background: `${s.accent}1a`, filter: "blur(30px)", transform: "translate(30%, -30%)" }} />
                  <p className="text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                  <div className="flex items-end justify-between relative z-10">
                    <h3 className="text-4xl font-black" style={{ fontFamily: "Epilogue" }}>{s.value}</h3>
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

          {/* Artist list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "Epilogue" }}>Active Roster</h3>
              <div className="flex gap-2 text-xs font-bold">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.2)" }}>
                  <span className="w-2 h-2 rounded-full bg-[#ffd709]" /> Active
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(255,136,182,0.1)", color: "#ff88b6", border: "1px solid rgba(255,136,182,0.2)" }}>
                  <span className="w-2 h-2 rounded-full bg-[#ff88b6] animate-pulse" /> Pending
                </span>
              </div>
            </div>

            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider"
                 style={{ color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="col-span-4">Artist / ID</div>
              <div className="col-span-2">Genre</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {loading ? (
              [0,1,2].map(i => (
                <div key={i} className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.04)", height: 72 }} />
              ))
            ) : artists.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Users className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.2)" }} />
                <p style={{ color: "rgba(255,255,255,0.35)" }}>No artists found</p>
              </div>
            ) : (
              artists.map((artist, i) => (
                <div key={artist.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 group transition-colors"
                     style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-black flex-shrink-0"
                         style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
                      {(artist.username || artist.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: "Epilogue" }}>
                        {artist.username || artist.email.split("@")[0]}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{artist.email}</p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>
                      {artist.artistProfile?.primaryGenre || "—"}
                    </span>
                  </div>
                  <div className="col-span-2 hidden md:block text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {artist.artistProfile?.city || "—"}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                          style={artist.isActive
                            ? { background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.25)" }
                            : { background: "rgba(255,110,132,0.1)", color: "#ff6e84", border: "1px solid rgba(255,110,132,0.25)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: artist.isActive ? "#ffd709" : "#ff6e84" }} />
                      {artist.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Link href={`/dashboard/employee/artists/${artist.id}`}
                          className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
                          style={{ background: "rgba(255,136,182,0.1)", color: "#ff88b6", border: "1px solid rgba(255,136,182,0.2)" }}>
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                Showing {artists.length} artists
              </p>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
                        style={{ background: "linear-gradient(90deg,#ffd709,#ff88b6)" }}>1</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
