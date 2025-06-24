import { create } from "zustand";

export const useStore = create((set, get) => ({
  isBackgroundEnabled: true,
  isContainerOpen: false,
  isPlaying: false,
  isMuted: false,
  hasInteracted: false,
  selectedVideo: 'jfKfPfyJRdk',
  selectedPlayer: null,
  videoTitle: null,
  videoList: [],
  selectedVideoIndex: 0,

  setVideoList: (videos) => {
    set({ videoList: videos })
  },

  setSelectedVideoIndex: (index) => {
    const video = get().videoList[index];
    if (video) {
      set({ selectedVideoIndex: index, selectedVideo: video });
    }
  },

  setHasInteracted: () => set({ hasInteracted: true }),
  setSelectedVideo: (id) => set({ selectedVideo: id }),
  setVideoTitle: (title) => set({ videoTitle: title }),
  setIsBackgroundEnabled: (value) => set({ hasInteracted: value }),
  setIsContainerOpen: (value) => set({isContainerOpen: value}),
  setPlayer: (player) => set({ selectedPlayer: player }),

  playVideo: () => {
    const player = get().selectedPlayer;
    player?.playVideo();
    set({isPlaying: true, hasInteracted: true});
  },

  pauseVideo: () => {
    const player = get().selectedPlayer;
    player?.pauseVideo();
    set({isPlaying: false});
  },

  muteVideo: () => {
    const player = get().selectedPlayer;
    player?.mute();
    set({isMuted: true});
  },

  unmuteVideo: () => {
    const player = get().selectedPlayer;
    player?.unMute();
    set({isMuted: false});
  },

  nextVideo: () => {
    const { selectedVideoIndex, videoList } = get();
    const nextIndex = selectedVideoIndex + 1;
    if (nextIndex < videoList.length) {
      get().setSelectedVideoIndex(nextIndex);
    }
  },

  prevVideo: () => {
    const { selectedVideoIndex } = get();
    const prevIndex = selectedVideoIndex - 1;
    if (prevIndex >= 0) {
      get().setSelectedVideoIndex(prevIndex);
    }
  },

  setVolume: (value) => {
    const player = get().selectedPlayer;
    player?.setVolume(value);
    if (value > 0) set({ isMuted: false });
    else set({ isMuted: true });
  },
}));
