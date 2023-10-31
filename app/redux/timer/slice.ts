import { createSlice } from '@reduxjs/toolkit';

export interface SoundsItem {
  title: string;
  url: string;
  soundID: string;
}
export interface TimerState {
  isFetchNotificationSounds: boolean;
  notificationSounds: Array<SoundsItem> | null;
  fetchNotificationSoundsError: string;

  currentSound: SoundsItem | null;
}

const initialState: TimerState = {
  isFetchNotificationSounds: false,
  notificationSounds: null,
  fetchNotificationSoundsError: '',

  currentSound: null,
};

export const slice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    getSounds: (state) => {
      state.isFetchNotificationSounds = true;
      state.fetchNotificationSoundsError = '';
    },
    getSoundsSuccess: (state, action) => {
      state.isFetchNotificationSounds = false;
      state.notificationSounds = action.payload;
      state.currentSound =
        state.currentSound === null ? action.payload[0] : state.currentSound;
    },
    getSoundsError: (state, action) => {
      state.isFetchNotificationSounds = false;
      state.fetchNotificationSoundsError = action.payload;
    },
    setCurrentSound: (state, action) => {
      state.currentSound = action.payload;
    },
    clearSounds: (state) => {
      state.notificationSounds = null;
    },
    clearAll: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  getSounds,
  getSoundsSuccess,
  getSoundsError,
  setCurrentSound,
  clearSounds,
  clearAll,
} = slice.actions;

export default slice.reducer;
