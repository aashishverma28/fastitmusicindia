"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ClipboardList, Search, CheckCircle2, Clock, XCircle, ChevronRight, FileText, User, Building } from "lucide-react";
import { Skeleton } from "@/components/shared/Skeleton";

export default function EmployeeApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "ARTIST" | "LABEL">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "NEW" | "UNDER_REVIEW" | "APPROVED" | "REJECTED">("ALL");

  useEffect(() => {
    async function loadApplications() {
      try {
        const res = await fetch("/api/admin/applications");
        const data = await res.json();
        setApplications(data.applications || []);
        setFilteredApplications(data.applications || []);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  useEffect(() => {
    let result = applications;

    // Filter by type
    if (typeFilter !== "ALL") {
      result = result.filter(app => app.type === typeFilter);
    }

    // Filter by status
    if (statusFilter !== "ALL") {
      result = result.filter(app => app.status === statusFilter);
    }

    // Filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      result = result.filter(app => {
        const fullName = (app.applicantData?.fullName || "").toLowerCase();
        const labelName = (app.applicantData?.labelName || "").toLowerCase();
        const email = (app.applicantData?.email || app.applicantData?.contactEmail || "").toLowerCase();
        const phone = (app.applicantData?.phone || app.applicantData?.contactPhone || "").toLowerCase();
        const appId = (app.applicationId || "").toLowerCase();

        return fullName.includes(query) || 
               labelName.includes(query) || 
               email.includes(query) || 
               phone.includes(query) ||
               appId.includes(query);
      });
    }

    setFilteredApplications(result);
  }, [searchQuery, typeFilter, statusFilter, applications]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-primary">Registry</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Applications
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Review pending artist and label applications.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full w-64 border focus-within:border-primary/50 transition-colors"
               style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
            <Search className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/30" 
            />
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border"
           style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
        {/* Type Filter */}
        <div className="flex gap-2">
          {["ALL", "ARTIST", "LABEL"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                typeFilter === t
                  ? "bg-primary text-white"
                  : "bg-black/5 dark:bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {t === "ALL" ? "All Types" : t}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "NEW", "UNDER_REVIEW", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? "bg-[#ffc301] text-black"
                  : "bg-black/5 dark:bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {s === "ALL" ? "All Statuses" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/30 border-b border-white/5">
          <div className="col-span-4">Applicant</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Submitted</div>
          <div className="col-span-1 text-right">View</div>
        </div>

        {loading ? (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[76px] rounded-2xl bg-white/5 border animate-pulse" style={{ borderColor: "var(--glass-border)" }} />
          ))
        ) : filteredApplications.length > 0 ? (
          filteredApplications.map((app) => {
            const applicantName = app.applicantData?.fullName || app.applicantData?.labelName || "Unknown Applicant";
            const applicantEmail = app.applicantData?.email || app.applicantData?.contactEmail || "No Email";

            return (
              <div key={app.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 transition-colors border"
                   style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                       style={app.type === "ARTIST" ? { background: "rgba(240,10,136,0.15)", color: "#f00a88" } : { background: "rgba(255,195,1,0.15)", color: "#ffc301" }}>
                    {app.type === "ARTIST" ? <User className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-tight font-display">
                      {applicantName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5 text-white/40">{app.applicationId} • {applicantEmail}</p>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-white/70">
                    {app.type}
                  </span>
                </div>

                <div className="col-span-6 md:col-span-2 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={
                          app.status === "NEW" ? { background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" } :
                          app.status === "APPROVED" ? { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" } :
                          app.status === "REJECTED" ? { background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" } :
                          { background: "rgba(250,204,21,0.1)", color: "#facc15", border: "1px solid rgba(250,204,21,0.2)" }
                        }>
                    {app.status === "NEW" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    {app.status === "APPROVED" && <CheckCircle2 className="w-3 h-3" />}
                    {app.status === "REJECTED" && <XCircle className="w-3 h-3" />}
                    {app.status === "UNDER_REVIEW" && <Clock className="w-3 h-3" />}
                    {app.status.replace("_", " ")}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-3 text-xs text-white/40">
                  {new Date(app.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                </div>

                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <Link href={`/dashboard/employee/applications/${app.id}`}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl p-16 text-center border border-dashed border-white/10" style={{ background: "var(--card-bg)" }}>
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-white/40 font-bold">No applications found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
