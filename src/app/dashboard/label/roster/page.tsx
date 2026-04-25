"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  TrendingUp,
  UserPlus,
  Loader2
} from "lucide-react";
import Link from "next/link";
import SignArtistModal from "@/components/dashboard/label/SignArtistModal";

export default function LabelRosterPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRoster();
  }, []);

  const fetchRoster = async () => {
    try {
      const res = await fetch("/api/label/roster");
      const data = await res.json();
      if (res.ok) setArtists(data.artists);
    } catch (err) {
      console.error("Failed to fetch roster");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArtists = artists.filter(artist => 
    artist.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNum = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toLocaleString();
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white mb-2 tracking-tighter italic">
            Artist <span className="gradient-text">Roster</span>
          </h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Manage and monitor the performance of your signed talent.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
              <input 
                type="text" 
                placeholder="Search talent..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-secondary/50 w-64 transition-all placeholder:text-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="btn-gradient p-3 rounded-xl shadow-lg shadow-secondary/10 hover:scale-105 transition-all group"
           >
              <UserPlus className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>

      {/* Roster Grid/Table */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden min-h-[400px] flex flex-col">
        {isLoading ? (
          <div className="flex-grow flex flex-col items-center justify-center space-y-4">
             <Loader2 className="w-10 h-10 text-secondary animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">Scanning Satellite Roster...</p>
          </div>
        ) : filteredArtists.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Talent Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Catalog</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Performance</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Economics</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredArtists.map((artist) => (
                <tr key={artist.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-white/10 flex items-center justify-center font-black text-lg text-white">
                        {artist.stageName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <p className="font-bold text-white group-hover:text-secondary transition-colors">{artist.stageName}</p>
                           {artist.isVerified && <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-background shadow-lg shadow-blue-400/20" title="Verified Artist" />}
                        </div>
                        <p className="text-[10px] font-mono text-white/40 tracking-tight">@{artist.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white/60">{artist.releaseCount} Releases</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Active Catalog</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <TrendingUp className="w-4 h-4 text-green-400" />
                       <span className="text-sm font-black text-white italic">{formatNum(artist.streams)}</span>
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Plays</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-sm font-black text-secondary">₹{artist.revenue.toLocaleString()}</p>
                     <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Gross Share</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/dashboard/label/roster/${artist.id}`}
                      className="inline-flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-secondary/20 hover:text-white hover:border-secondary transition-all"
                    >
                      Analytics <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-32 text-center space-y-6 flex-grow flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/5">
              <Users className="w-10 h-10 text-white/10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white italic tracking-tighter">
                {searchTerm ? "No Matches Found" : "Roster is Empty"}
              </h3>
              <p className="text-white/40 text-sm font-sans max-w-sm mx-auto">
                {searchTerm ? `No roster members match "${searchTerm}".` : "Start signing talent to your label to manage their distribution and royalties."}
              </p>
            </div>
            {!searchTerm && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 btn-gradient px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest"
              >
                 <UserPlus className="w-4 h-4" /> Sign Your First Artist
              </button>
            )}
          </div>
        )}
      </div>

      <SignArtistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onArtistAdded={fetchRoster} 
      />
    </div>
  );
}
