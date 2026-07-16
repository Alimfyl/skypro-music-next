import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TrackType } from '@/data/tracks';

type PlayerState = {
  currentTrack: TrackType | null;
  currentPlaylist: TrackType[];
  isPlaying: boolean;
  isLooping: boolean;
  isShuffle: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  currentPlaylist: [],
  isPlaying: false,
  isLooping: false,
  isShuffle: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleLooping: (state) => {
      state.isLooping = !state.isLooping;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});

export const {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlaying,
  togglePlaying,
  toggleLooping,
  toggleShuffle,
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;