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
    if (!howlRef.current || howlRef.current.src() !== currentTrack.url) {
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
           <div className="flex items-center justify-between gap-6">
              {/* Track Info */}
              <div className="flex items-center gap-4 w-1/3">
                 <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-white/10">
                    <Image src={currentTrack.cover} alt={currentTrack.title} fill className="object-cover" />
                 </div>
                 <div className="hidden sm:block">
                    <h4 className="text-white font-bold truncate max-w-[150px]">{currentTrack.title}</h4>
                    <p className="text-white/40 text-xs truncate max-w-[150px]">{currentTrack.artist}</p>
                 </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-2 flex-grow">
                 <div className="flex items-center gap-6">
                    <button className="text-white/40 hover:text-white transition-colors">
                       <SkipBack className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                    >
                       {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5 ml-1" />}
                    </button>
                    <button className="text-white/40 hover:text-white transition-colors">
                       <SkipForward className="w-5 h-5" />
                    </button>
                 </div>
                 {/* Progress Mock */}
                 <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: isPlaying ? "100%" : "30%" }}
                       transition={{ duration: isPlaying ? 30 : 0, ease: "linear" }}
                       className="h-full bg-primary"
                    />
                 </div>
              </div>

              {/* Volume & Close */}
              <div className="flex items-center justify-end gap-6 w-1/3">
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
                  className="p-2 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
                 >
                    <X className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
