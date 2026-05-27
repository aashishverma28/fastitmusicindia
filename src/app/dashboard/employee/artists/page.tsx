"use client";

import { useState, useEffect } from "react";
import { Mic, Search, Users } from "lucide-react";
import { Skeleton } from "@/components/shared/Skeleton";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

export default function EmployeeArtistsPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadArtists() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        const artistUsers = (data.users || []).filter((u: any) => u.role === "ARTIST");
        setArtists(artistUsers);
        setFilteredArtists(artistUsers);
      } catch (err) {
        console.error("Failed to load artists", err);
      } finally {
        setLoading(false);
      }
    }
    loadArtists();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredArtists(artists);
      return;
    }

    const filtered = artists.filter(artist => {
      const stageName = (artist.artistProfile?.stageName || "").toLowerCase();
      const fullName = (artist.artistProfile?.fullName || "").toLowerCase();
      const username = (artist.username || "").toLowerCase();
      const email = (artist.email || "").toLowerCase();
      const genre = (artist.artistProfile?.primaryGenre || "").toLowerCase();
      const city = (artist.artistProfile?.city || "").toLowerCase();

      return stageName.includes(query) || 
             fullName.includes(query) ||
             username.includes(query) || 
             email.includes(query) || 
             genre.includes(query) || 
             city.includes(query);
    });
    setFilteredArtists(filtered);
  }, [searchQuery, artists]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-primary">Roster</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Artists
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Manage and view all approved artists on the platform.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 border border-white/10 w-64 focus-within:border-primary/50 transition-colors">
            <Search className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search by name, email, genre..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/30" 
            />
          </div>
        </div>
      </div>

      {/* Artists List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white/30 border-b border-white/5">
          <div className="col-span-5">Artist / Info</div>
          <div className="col-span-2">Genre</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {loading ? (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[76px] rounded-2xl bg-white/5 animate-pulse" />
          ))
        ) : filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 transition-colors border"
                 style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 text-black font-display"
                     style={{ background: "linear-gradient(135deg,#ffd709,#ff88b6)" }}>
                  {(artist.artistProfile?.stageName || artist.username || artist.email)[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight font-display">
                    {artist.artistProfile?.stageName || artist.username || artist.email.split('@')[0]}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5 text-white/40">
                    @{artist.username || artist.email.split('@')[0]} • {artist.email}
                  </p>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5 bg-white/5 text-white/70">
                  {artist.artistProfile?.primaryGenre || "Unknown"}
                </span>
              </div>

              <div className="col-span-6 md:col-span-2 text-xs text-white/40">
                {artist.artistProfile?.city ? `${artist.artistProfile.city}, ${artist.artistProfile.state || ""}` : "Unknown"} 
              </div>

              <div className="col-span-12 md:col-span-3 flex justify-end items-center gap-3">
                <ResetPasswordButton email={artist.email} />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl p-16 text-center border border-dashed border-white/10" style={{ background: "var(--card-bg)" }}>
            <Users className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-white/40 font-bold">No artists found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
