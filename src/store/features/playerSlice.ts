import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TrackType } from '@/data/tracks';

type PlayerState = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
};

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setCurrentTrack, setIsPlaying, togglePlaying } =
  playerSlice.actions;

export const playerReducer = playerSlice.reducer;