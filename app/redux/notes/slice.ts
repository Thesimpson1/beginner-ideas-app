import { createSlice } from '@reduxjs/toolkit';
import { createValidObjectForDisplay } from 'app/redux/notes/helpers';

import { CardItemI } from 'app/screens/Notes/types';

export interface NotesState {
  sortMode: string;
  dataSortMode: string;
  isOpenDeleteComponent: boolean;

  isFetchNotes: boolean;
  notes: CardItemI[] | null;
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
  isOpenDeleteComponent: false,

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
export interface PushNoteActionPayloadI {
  date: string;
  title: string;
  subTitle: string;
  note: string;
  user: string;
}
interface PushNoteActionI {
  type: string;
  payload: PushNoteActionPayloadI;
}
interface GetNodesActionI {
  type: string;
  payload: { user: string | null };
}
interface GetNotesSuccessActionI {
  type: string;
  payload: { [key: string]: PushNoteActionPayloadI };
}
export const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setIsOpenDeleteComponent: (state, action) => {
      state.isOpenDeleteComponent = action.payload;
    },

    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
    setDataSortMode: (state, action) => {
      state.dataSortMode = action.payload;
    },
    // eslint-disable-next-line
    getNotes: (state, action: GetNodesActionI) => {
      state.isFetchNotes = true;
      state.fetchNotesError = '';
    },
    getNotesSuccess: (state, action: GetNotesSuccessActionI) => {
      state.isFetchNotes = false;
      state.notes = createValidObjectForDisplay({ data: action.payload });
    },
    getNotesError: (state, action) => {
      state.isFetchNotes = false;
      state.fetchNotesError = action.payload;
    },
    // eslint-disable-next-line
    pushNote: (state, action: PushNoteActionI) => {
      state.isPushNewNote = true;
      state.pushNewNoteError = '';
    },
    pushNoteSuccess: (state, action: GetNotesSuccessActionI) => {
      state.isPushNewNote = false;
      state.notes = createValidObjectForDisplay({ data: action.payload });
    },
    pushNoteError: (state, action) => {
      state.isPushNewNote = false;
      state.pushNewNoteError = action.payload;
    },
    // eslint-disable-next-line
    updateNote: (state, action) => {
      state.isUpdateNote = true;
      state.updateNoteError = '';
    },
    updateNoteSuccess: (state, action: GetNotesSuccessActionI) => {
      state.isUpdateNote = false;
      state.notes = createValidObjectForDisplay({ data: action.payload });
    },
    updateNoteError: (state, action) => {
      state.isUpdateNote = false;
      state.updateNoteError = action.payload;
    },
    // eslint-disable-next-line
    deleteNote: (state, action) => {
      state.isDeleteNote = true;
      state.deleteNoteError = '';
    },
    deleteNoteSuccess: (state, action: GetNotesSuccessActionI) => {
      state.isDeleteNote = false;
      state.notes = createValidObjectForDisplay({ data: action.payload });
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
  setIsOpenDeleteComponent,
} = slice.actions;

export default slice.reducer;
