import { create } from "zustand";

export const useStore = create((set) => ({
  selectedVideo: null,
  setSelectedVideo: (id) => set({ selectedVideo: id }),
}))
