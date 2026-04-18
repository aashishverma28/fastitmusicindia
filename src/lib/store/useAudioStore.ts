import { create } from "zustand";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface AudioStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  setTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  stop: () => set({ isPlaying: false, currentTrack: null }),
}));
