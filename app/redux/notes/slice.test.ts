import {
  mockInitialNotesState,
  MockNoteValue1,
  MockNoteValue2,
} from 'app/mocks';

import reducer, {
  clearAll,
  deleteNote,
  deleteNoteError,
  deleteNoteSuccess,
  getNotes,
  getNotesError,
  getNotesSuccess,
  pushNote,
  pushNoteError,
  pushNoteSuccess,
  setDataSortMode,
  setIsOpenDeleteComponent,
  setSortMode,
  updateNote,
  updateNoteError,
  updateNoteSuccess,
} from './slice';
const MockNotes = {
  'Fri Jan 12 2024 16:55:01 GMT+0100': { ...MockNoteValue1 },
  'Fri Jan 13 2024 16:55:01 GMT+0100': { ...MockNoteValue2 },
};
describe('Note slice', () => {
  const mockErrorText = 'Some error';
  const initState = { ...mockInitialNotesState };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(initState);
  });
  it('should handle a set Is Open Delete Component', () => {
    mockInitialNotesState.isOpenDeleteComponent = true;
    expect(reducer(initState, setIsOpenDeleteComponent(true))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isOpenDeleteComponent = false;
  });
  it('should handle a set Sort Mode', () => {
    const mockMode = 'Mock Mode';
    mockInitialNotesState.sortMode = mockMode;

    expect(reducer(initState, setSortMode(mockMode))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.sortMode = 'By creating date';
  });
  it('should handle a set Data Sort Mode', () => {
    const mockMode = 'Off';
    mockInitialNotesState.dataSortMode = mockMode;

    expect(reducer(initState, setDataSortMode(mockMode))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.dataSortMode = 'On';
  });
  it('should handle a get Notes', () => {
    const mockUser = 'Mock User';
    mockInitialNotesState.isFetchNotes = true;
    mockInitialNotesState.fetchNotesError = '';

    expect(reducer(initState, getNotes({ user: mockUser }))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isFetchNotes = false;
  });
  it('should handle a get Notes Success', () => {
    mockInitialNotesState.isFetchNotes = false;
    mockInitialNotesState.notes = [
      { ...MockNoteValue2, key: 'Fri Jan 13 2024 16:55:01 GMT+0100' },
      { ...MockNoteValue1, key: 'Fri Jan 12 2024 16:55:01 GMT+0100' },
    ];

    expect(reducer(initState, getNotesSuccess(MockNotes))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.notes = null;
  });
  it('should handle a get Notes Error', () => {
    mockInitialNotesState.isFetchNotes = false;
    mockInitialNotesState.fetchNotesError = mockErrorText;

    expect(reducer(initState, getNotesError(mockErrorText))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.fetchNotesError = '';
  });
  it('should handle a push Note', () => {
    mockInitialNotesState.isPushNewNote = true;
    mockInitialNotesState.pushNewNoteError = '';

    expect(reducer(initState, pushNote(MockNoteValue1))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isPushNewNote = false;
  });
  it('should handle a push Note Success', () => {
    mockInitialNotesState.isPushNewNote = false;
    mockInitialNotesState.notes = [
      { ...MockNoteValue2, key: 'Fri Jan 13 2024 16:55:01 GMT+0100' },
      { ...MockNoteValue1, key: 'Fri Jan 12 2024 16:55:01 GMT+0100' },
    ];

    expect(reducer(initState, pushNoteSuccess(MockNotes))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isPushNewNote = false;
    mockInitialNotesState.notes = null;
  });
  it('should handle a push Note Error', () => {
    mockInitialNotesState.pushNewNoteError = mockErrorText;

    expect(reducer(initState, pushNoteError(mockErrorText))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.pushNewNoteError = '';
  });
  it('should handle a update Note', () => {
    mockInitialNotesState.isUpdateNote = true;
    mockInitialNotesState.updateNoteError = '';

    expect(reducer(initState, updateNote(MockNoteValue1))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isUpdateNote = false;
  });
  it('should handle a update Note Success', () => {
    mockInitialNotesState.isUpdateNote = false;
    mockInitialNotesState.notes = [
      { ...MockNoteValue2, key: 'Fri Jan 13 2024 16:55:01 GMT+0100' },
      { ...MockNoteValue1, key: 'Fri Jan 12 2024 16:55:01 GMT+0100' },
    ];

    expect(reducer(initState, updateNoteSuccess(MockNotes))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.notes = null;
  });
  it('should handle a update Note Error', () => {
    mockInitialNotesState.isUpdateNote = false;
    mockInitialNotesState.updateNoteError = mockErrorText;
    expect(reducer(initState, updateNoteError(mockErrorText))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.updateNoteError = '';
  });
  it('should handle a delete Note', () => {
    mockInitialNotesState.isDeleteNote = true;
    mockInitialNotesState.deleteNoteError = '';

    expect(reducer(initState, deleteNote(MockNoteValue1))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.isDeleteNote = false;
  });
  it('should handle a delete Note Success', () => {
    mockInitialNotesState.isDeleteNote = false;
    mockInitialNotesState.notes = [
      { ...MockNoteValue2, key: 'Fri Jan 13 2024 16:55:01 GMT+0100' },
      { ...MockNoteValue1, key: 'Fri Jan 12 2024 16:55:01 GMT+0100' },
    ];

    expect(reducer(initState, deleteNoteSuccess(MockNotes))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.notes = null;
  });
  it('should handle a delete Note Error', () => {
    mockInitialNotesState.isDeleteNote = false;
    mockInitialNotesState.deleteNoteError = mockErrorText;

    expect(reducer(initState, deleteNoteError(mockErrorText))).toStrictEqual(
      mockInitialNotesState
    );
    mockInitialNotesState.deleteNoteError = '';
  });
  it('should handle a clear All', () => {
    expect(reducer(initState, clearAll())).toStrictEqual(mockInitialNotesState);
  });
});
