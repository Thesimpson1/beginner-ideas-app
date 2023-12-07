import { createSlice } from '@reduxjs/toolkit';

interface NotesFromServerI {
  [key: string]: string;
}

export interface NotesState {
  sortMode: string;
  dataSortMode: string;

  isFetchNotes: boolean;
  notes: NotesFromServerI | null;
  fetchNotesError: string;

  isPushNewNote: boolean;
  pushNewNoteError: string;

  isUpdateNote: boolean;
  updateNoteError: string;

  isDeleteNote: boolean;
  deleteNoteError: string;
}

const initialState: NotesState = {
  sortMode: 'By creating date',
  dataSortMode: 'On',

  isFetchNotes: false,
  notes: null,
  fetchNotesError: '',

  isPushNewNote: false,
  pushNewNoteError: '',

  isUpdateNote: false,
  updateNoteError: '',

  isDeleteNote: false,
  deleteNoteError: '',
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

    getNotes: (state, action) => {
      state.isFetchNotes = true;
      state.fetchNotesError = '';
    },
    getNotesSuccess: (state, action) => {
      state.isFetchNotes = false;
      state.notes = action.payload;
    },
    getNotesError: (state, action) => {
      state.isFetchNotes = false;
      state.fetchNotesError = action.payload;
    },

    pushNote: (state, action) => {
      state.isPushNewNote = true;
      state.pushNewNoteError = '';
    },
    pushNoteSuccess: (state, action) => {
      state.isPushNewNote = false;
      state.notes = action.payload;
    },
    pushNoteError: (state, action) => {
      state.isPushNewNote = false;
      state.pushNewNoteError = action.payload;
    },

    updateNote: (state, action) => {
      state.isUpdateNote = true;
      state.updateNoteError = '';
    },
    updateNoteSuccess: (state, action) => {
      state.isUpdateNote = false;
      state.notes = action.payload;
    },
    updateNoteError: (state, action) => {
      state.isUpdateNote = false;
      state.updateNoteError = action.payload;
    },

    deleteNote: (state, action) => {
      state.isDeleteNote = true;
      state.deleteNoteError = '';
    },
    deleteNoteSuccess: (state, action) => {
      state.isDeleteNote = false;
      state.notes = action.payload;
    },
    deleteNoteError: (state, action) => {
      state.isDeleteNote = false;
      state.deleteNoteError = action.payload;
    },

    clearAll: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  clearAll,
  setDataSortMode,
  setSortMode,
  getNotesSuccess,
  getNotes,
  getNotesError,
  pushNoteError,
  pushNoteSuccess,
  pushNote,
  deleteNoteError,
  deleteNoteSuccess,
  updateNoteError,
  updateNoteSuccess,
  updateNote,
  deleteNote,
} = slice.actions;

export default slice.reducer;
