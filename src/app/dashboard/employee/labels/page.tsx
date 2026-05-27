"use client";

import { useState, useEffect } from "react";
import { Building2, Search } from "lucide-react";
import { Skeleton } from "@/components/shared/Skeleton";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

export default function EmployeeLabelsPage() {
  const [labels, setLabels] = useState<any[]>([]);
  const [filteredLabels, setFilteredLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadLabels() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        const labelUsers = (data.users || []).filter((u: any) => u.role === "LABEL");
        setLabels(labelUsers);
        setFilteredLabels(labelUsers);
      } catch (err) {
        console.error("Failed to load labels", err);
      } finally {
        setLoading(false);
      }
    }
    loadLabels();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredLabels(labels);
      return;
    }

    const filtered = labels.filter(label => {
      const labelName = (label.labelProfile?.labelName || "").toLowerCase();
      const contactPerson = (label.labelProfile?.contactPersonName || "").toLowerCase();
      const username = (label.username || "").toLowerCase();
      const email = (label.email || "").toLowerCase();
      const genre = (label.labelProfile?.genreFocus || "").toLowerCase();
      const city = (label.labelProfile?.city || "").toLowerCase();

      return labelName.includes(query) || 
             contactPerson.includes(query) ||
             username.includes(query) || 
             email.includes(query) || 
             genre.includes(query) || 
             city.includes(query);
    });
    setFilteredLabels(filtered);
  }, [searchQuery, labels]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-secondary">Partners</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Record Labels
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Manage and view all approved record labels on the platform.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full w-64 border focus-within:border-secondary/50 transition-colors"
               style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
            <Search className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search by label name, contact..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/30" 
            />
          </div>
        </div>
      </div>

      {/* Labels List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/30 border-b border-white/5">
          <div className="col-span-5">Label / Info</div>
          <div className="col-span-2">Focus Genre</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {loading ? (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[76px] rounded-2xl bg-white/5 border animate-pulse" style={{ borderColor: "var(--glass-border)" }} />
          ))
        ) : filteredLabels.length > 0 ? (
          filteredLabels.map((label) => (
            <div key={label.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 transition-colors border"
                 style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 text-black font-display"
                     style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
                  {(label.labelProfile?.labelName || label.username || label.email)[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight font-display">
                    {label.labelProfile?.labelName || label.username || label.email.split('@')[0]}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5 text-white/40">
                    @{label.username || label.email.split('@')[0]} • {label.email}
                  </p>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-white/70">
                  {label.labelProfile?.genreFocus || "Multi-Genre"}
                </span>
              </div>

              <div className="col-span-6 md:col-span-2 text-xs text-white/40">
                {label.labelProfile?.contactPersonName || "Unknown"} 
              </div>

              <div className="col-span-12 md:col-span-3 flex justify-end items-center gap-3">
                <ResetPasswordButton email={label.email} />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl p-16 text-center border border-dashed border-white/10" style={{ background: "var(--card-bg)" }}>
            <Building2 className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-white/40 font-bold">No labels found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
