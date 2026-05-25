"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, SkipForward, SkipBack } from "lucide-react";
import Image from "next/image";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, volume, togglePlay, stop, setVolume } = useAudioStore();
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!currentTrack) {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current = null;
      }
      return;
    }

    // New track or URL change
    if (!howlRef.current || (howlRef.current as any)._src !== currentTrack.url) {
      if (howlRef.current) howlRef.current.stop();
      
      howlRef.current = new Howl({
        src: [currentTrack.url],
        html5: true,
        volume: volume,
        onend: () => {
          stop();
        }
      });
    }

    if (isPlaying) {
      howlRef.current.play();
    } else {
      howlRef.current.pause();
    }

    return () => {
      // Don't necessarily stop on every re-render, 
      // only if the track completely changes or component unmounts
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
  }, [volume]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4"
      >
        <div className="max-w-4xl mx-auto glass backdrop-blur-3xl border border-white/10 rounded-3xl p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              {/* Track Info */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0 max-w-[40%] sm:w-1/3">
                 <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
                    <Image src={currentTrack.cover} alt={currentTrack.title} fill className="object-cover" />
                 </div>
                 <div className="min-w-0">
                    <h4 className="text-white font-bold text-xs sm:text-sm truncate max-w-[90px] xs:max-w-[120px] sm:max-w-[150px]">{currentTrack.title}</h4>
                    <p className="text-white/40 text-[10px] sm:text-xs truncate max-w-[90px] xs:max-w-[120px] sm:max-w-[150px]">{currentTrack.artist}</p>
                 </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-grow min-w-0">
                 <div className="flex items-center gap-4 sm:gap-6">
                    <button className="text-white/40 hover:text-white transition-colors">
                       <SkipBack className="w-4.5 h-4.5 sm:w-5 h-5" />
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shrink-0"
                    >
                       {isPlaying ? <Pause className="fill-current w-4.5 h-4.5 sm:w-5 h-5" /> : <Play className="fill-current w-4.5 h-4.5 sm:w-5 h-5 ml-0.5 sm:ml-1" />}
                    </button>
                    <button className="text-white/40 hover:text-white transition-colors">
                       <SkipForward className="w-4.5 h-4.5 sm:w-5 h-5" />
                    </button>
                 </div>
                 {/* Progress Mock */}
                 <div className="w-full max-w-[140px] xs:max-w-[180px] sm:max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: isPlaying ? "100%" : "30%" }}
                       transition={{ duration: isPlaying ? 30 : 0, ease: "linear" }}
                       className="h-full bg-primary"
                    />
                  </div>
              </div>

              {/* Volume & Close */}
              <div className="flex items-center justify-end gap-3 sm:gap-6 shrink-0 sm:w-1/3">
                 <div className="hidden md:flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-white/40" />
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 accent-primary" 
                    />
                 </div>
                 <button 
                  onClick={stop}
                  className="p-2 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all shrink-0"
                 >
                    <X className="w-4.5 h-4.5 sm:w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
