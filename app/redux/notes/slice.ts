import { createSlice } from '@reduxjs/toolkit';

export interface NotesState {
  sortMode: string;
  dataSortMode: string;
}

const initialState: NotesState = {
  sortMode: 'By creating date',
  dataSortMode: 'On',
};

export const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
    setDataSortMode: (state, action) => {
      state.dataSortMode = action.payload;
    },
    clearAll: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { clearAll, setDataSortMode, setSortMode } = slice.actions;

export default slice.reducer;
