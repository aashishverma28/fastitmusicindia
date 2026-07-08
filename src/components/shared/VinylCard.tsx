import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Music } from "lucide-react";

interface VinylCardProps {
  id: string | number;
  title: string;
  artist: string;
  cover: string;
  slug?: string;
  genre?: string;
  releaseDate?: string;
  audioUrl?: string;
  onPlay?: (e: React.MouseEvent) => void;
  isAdminOrStaff?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  onEdit?: (e: React.MouseEvent) => void;
}

export const VinylCard: React.FC<VinylCardProps> = ({
  id,
  title,
  artist,
  cover,
  slug,
  genre,
  releaseDate,
  audioUrl,
  onPlay,
  isAdminOrStaff = false,
  onRemove,
  onEdit,
}) => {
  const detailLink = `/releases/${slug || id}`;
  const displayGenre = genre ? genre.split(" / ")[0] : "Indie";

  return (
    <div className="group relative flex flex-col vinyl-container w-full select-none">
      {/* Action Buttons for Admins */}
      {isAdminOrStaff && (
        <div className="absolute -top-3 -right-3 z-30 flex items-center gap-1.5 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl"
              title="Edit Release"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xl"
              title="Remove Release"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Album Box & Record (Clickable Link to details) */}
      <div className="relative aspect-square w-full rounded-2xl overflow-visible mb-5">
        <Link href={detailLink} className="block w-full h-full relative z-10">
          {/* Vinyl Disc (slides out to right on hover) */}
          <div className="vinyl-disc">
            <div
              className="vinyl-center-label"
              style={{ backgroundImage: `url(${cover})` }}
            />
            <div className="vinyl-center-hole" />
          </div>

          {/* Vinyl Sleeve (Cover Art) */}
          <div className="vinyl-sleeve w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-primary/30 group-hover:-translate-x-3 duration-500">
            <Image
              src={cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Play Hover Overlay on Sleeve */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
              {onPlay && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPlay(e);
                  }}
                  className="w-14 h-14 bg-white hover:bg-primary text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500 hover:scale-110 active:scale-95"
                >
                  <Play className="fill-current w-6 h-6 ml-0.5" />
                </button>
              )}
            </div>

            {/* Sleeve Spine/Sticker Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/40 border-r border-white/5 shadow-inner" />
            
            {/* Genre Sticker */}
            {displayGenre && (
              <div className="absolute top-3 left-4">
                <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-zinc-700/50 text-[9px] font-black uppercase tracking-widest text-zinc-200">
                  {displayGenre}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="space-y-1 relative z-25 group-hover:-translate-x-3 transition-transform duration-500">
        <Link href={detailLink} className="block">
          <h4 className="font-display font-black text-lg text-white group-hover:text-primary transition-colors truncate leading-tight">
            {title}
          </h4>
        </Link>
        <p className="text-white/50 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 truncate">
          <Music className="w-3.5 h-3.5 text-white/30" /> {artist}
        </p>
      </div>
    </div>
  );
};
