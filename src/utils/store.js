import { create } from "zustand";
const DEFAULT_VIDEO_LIST = ["jfKfPfyJRdk", "xORCbIptqcc", "IC38LWnquWw", "M3n9irByaLA", "67mNa2T8H3U", "9kzE8isXlQY"]

export const useStore = create((set, get) => ({
  isBackgroundEnabled: true,
  isContainerOpen: false,
  isPlaying: false,
  isMuted: false,
  hasInteracted: false,
  selectedVideo: 'jfKfPfyJRdk',
  selectedPlayer: null,
  videoTitle: null,
  lastVolume: 50,
  genre: 'lofi',
  videoList: DEFAULT_VIDEO_LIST,
  videoListLofi: DEFAULT_VIDEO_LIST,
  videoListHiphop: ['lOgEMplYFW0', 'ANS5LPdkSD4', 'xN1YPxdXObI', '9LGnNDdjXRk','86XzuPmMriw',],
  videoListJazz: ['Dx5qFachd3A','j-tYR6tvtb0','DGTFqaQh26w', 'MYPVQccHhAQ',],
  videoListTech: ['rSpwqZJJGCM','MoLSQPtyLWE','fYZFcce9VI0', 'IMvHoyUp2Uo', 'tw0n-LNvptI',],
  selectedVideoIndex: 0,

  setGenre: (genre) => {
    let videoList;
    switch (genre) {
      case 'lofi':
        videoList = get().videoListLofi;
        break;
      case 'hip-hop':
        videoList = get().videoListHiphop;
        break;
      case 'jazz':
        videoList = get().videoListJazz;
        break;
      case 'tech':
        videoList = get().videoListTech;
        break;
      default:
        videoList = get().videoListLofi;
        break;
    }

    set({ genre, videoList })
    
  },

  setSelectedVideoIndex: (index) => {
    const video = get().videoList[index];
    if (video) {
      set({ selectedVideoIndex: index, selectedVideo: video });
    }
  },

  setHasInteracted: () => set({ hasInteracted: true }),
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
    } else {
      get().setSelectedVideoIndex(0);
    }
  },

  prevVideo: () => {
    const { selectedVideoIndex, videoList } = get();
    const prevIndex = selectedVideoIndex - 1;
    if (prevIndex >= 0) {
      get().setSelectedVideoIndex(prevIndex);
    } else {
      get().setSelectedVideoIndex(videoList.length - 1);      
    }
  },

  setVolume: (value) => {
    const player = get().selectedPlayer;

    player?.setVolume(value);
    if (value > 0) set({ isMuted: false,  lastVolume: value });
    else set({ isMuted: true, lastVolume: 0 });
  },
}));
