"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Mic, AlbumIcon, ClipboardList, 
  CreditCard, Settings, LogOut, Menu, X, Search, Bell 
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview",     icon: LayoutDashboard, href: "/dashboard/employee" },
  { label: "Artists",      icon: Mic,             href: "/dashboard/employee/artists" },
  { label: "Labels",       icon: AlbumIcon,       href: "/dashboard/employee/labels" },
  { label: "Applications", icon: ClipboardList,   href: "/dashboard/employee/applications" },
  { label: "Finance",      icon: CreditCard,      href: "/dashboard/employee/finance" },
  { label: "Settings",     icon: Settings,        href: "/dashboard/employee/settings" },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/staff/login");
    } else if (status === "authenticated" && (session.user as any).role !== "EMPLOYEE") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#ff88b6", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const employeeName = (session.user as any).name || "Staff Member";

  return (
    <div className="min-h-screen flex relative antialiased bg-[#0e0e0e] text-white font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;900&family=Manrope:wght@400;500;600;700&display=swap');`}</style>
      
      {/* Ambient glows */}
      <div className="fixed pointer-events-none z-0 top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="fixed pointer-events-none z-0 bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 z-40 flex flex-col p-5 gap-1 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-[#080809] border-r border-white/5`}>
        
        <div className="px-3 py-4 mb-4">
          <Link href="/dashboard/employee" className="block">
            <h1 className="text-2xl font-display font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fastit Music
            </h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mt-1 text-white/30">
              Staff Portal
            </p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item: any) => {
            const isActive = item.href === "/dashboard/employee" 
              ? pathname === "/dashboard/employee" 
              : pathname.startsWith(item.href);

            return (
              <Link key={item.label} href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all border ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary border-transparent text-black shadow-md hover:scale-[1.01]"
                        : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                    }`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-white/5">
          <button onClick={() => signOut({ callbackUrl: "/staff/login" })}
                  className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-sm font-bold transition-all text-red-400 hover:text-red-300 hover:bg-red-500/5 cursor-pointer">
            <LogOut className="w-5 h-5 flex-shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10 overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 h-16 gap-4 bg-[#0e0e0e]/80 backdrop-blur-md border-b border-white/5">
          <button className="md:hidden p-2 rounded-lg text-white/50 hover:text-white cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-grow md:flex-grow-0 md:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-xl py-2 pl-9 pr-4 text-xs bg-black/40 border border-white/5 text-white placeholder:text-white/35 outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full relative text-primary hover:bg-white/5 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{employeeName}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1 font-mono font-bold">STAFF NODE</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-black bg-gradient-to-r from-primary to-secondary">
                {employeeName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
