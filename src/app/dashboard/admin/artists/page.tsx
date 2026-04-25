import { prisma as db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";
import { Users, Mail, Phone, MapPin, User } from "lucide-react";

export default async function AdminArtistsPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUB_ADMIN" && session.user.role !== "EMPLOYEE")) {
    redirect("/login");
  }

  const artists = await db.artistProfile.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-display tracking-tight text-white">Artists</h1>
          <p className="text-white/50 text-sm mt-1">Manage all approved artist accounts</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg border border-primary/20 flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="font-bold">{artists.length} Total Artists</span>
        </div>
      </div>

      <div className="grid gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Info */}
            <div className="flex items-center gap-4 flex-grow">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                {artist.profilePhoto ? (
                  <Image src={artist.profilePhoto} alt={artist.stageName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-xl text-white/30">
                    {artist.stageName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-black text-lg text-white flex items-center gap-2">
                  {artist.stageName}
                  {artist.verificationBadge && (
                    <span className="bg-blue-500/20 text-blue-500 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 uppercase tracking-wider">
                      Verified
                    </span>
                  )}
                </h3>
                <p className="text-white/50 text-sm">{artist.fullName} <span className="text-primary/60 font-mono ml-2">@{artist.user.username || artist.user.email.split('@')[0]}</span></p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {artist.user.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {artist.phone}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {artist.city}, {artist.state}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 items-end min-w-[200px] w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-xs text-white/40 mb-2">
                Joined {new Date(artist.createdAt).toLocaleDateString()}
              </div>
              <ResetPasswordButton email={artist.user.email} />
            </div>
          </div>
        ))}

        {artists.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-bold">No artists found</h3>
            <p className="text-white/40 text-sm mt-1">Approved artists will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
