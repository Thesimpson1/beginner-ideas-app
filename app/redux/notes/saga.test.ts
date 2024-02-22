import {
  mockInitialNotesState,
  MockNoteValue1,
  MockNoteValue2,
} from 'app/mocks';
import {
  deleteNoteSaga,
  getNotesSaga,
  pushNoteSaga,
  updateNoteSaga,
} from 'app/redux/notes/saga';
import {
  deleteNoteError,
  deleteNoteSuccess,
  getNotesError,
  getNotesSuccess,
  pushNoteError,
  pushNoteSuccess,
  updateNoteError,
  updateNoteSuccess,
} from 'app/redux/notes/slice';

import { api } from 'app/api';
import { runTestSaga } from 'app/utils/test-utils/saga-test-configs';

const error = { message: 'error' };
const MockNotes = {
  'Fri Jan 12 2024 16:55:01 GMT+0100': { ...MockNoteValue1 },
  'Fri Jan 13 2024 16:55:01 GMT+0100': { ...MockNoteValue2 },
};
const MockUser = 'MockUser';

describe('Get Notes Saga', () => {
  it('getNotesSaga success case', async () => {
    const createReference = jest
      .spyOn(api, 'createReference')
      .mockImplementation(() => null as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: getNotesSaga,
      params: { payload: { user: MockUser } },
    });
    expect(createReference).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getNotesSuccess(MockNotes)]);
    createReference.mockRestore();
    readNotes.mockRestore();
  });

  it('getNotesSaga error', async () => {
    const createReference = jest
      .spyOn(api, 'createReference')
      .mockImplementation(() => Promise.reject(error) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: getNotesSaga,
      params: { payload: { user: MockUser } },
    });
    expect(createReference).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(0);
    expect(dispatched).toEqual([getNotesError('error')]);
    createReference.mockRestore();
    readNotes.mockRestore();
  });
  it('readNotes error', async () => {
    const createReference = jest
      .spyOn(api, 'createReference')
      .mockImplementation(() => Promise.resolve(MockNotes) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: getNotesSaga,
      params: { payload: { user: MockUser } },
    });
    expect(createReference).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getNotesError('error')]);
    createReference.mockRestore();
    readNotes.mockRestore();
  });
});

describe('Push Note Saga', () => {
  it('pushNote success case', async () => {
    const pushNote = jest
      .spyOn(api, 'pushNote')
      .mockImplementation(() => null as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: pushNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(pushNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([pushNoteSuccess(MockNotes)]);
    pushNote.mockRestore();
    readNotes.mockRestore();
  });

  it('pushNote error', async () => {
    const pushNote = jest
      .spyOn(api, 'pushNote')
      .mockImplementation(() => Promise.reject(error) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: pushNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(pushNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(0);
    expect(dispatched).toEqual([pushNoteError('error')]);
    pushNote.mockRestore();
    readNotes.mockRestore();
  });
  it('readNotes error', async () => {
    const pushNote = jest
      .spyOn(api, 'pushNote')
      .mockImplementation(() => Promise.resolve(MockNotes) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: pushNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(pushNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([pushNoteError('error')]);
    pushNote.mockRestore();
    readNotes.mockRestore();
  });
});

describe('Update Note Saga', () => {
  it('updateNote success case', async () => {
    const updateNote = jest
      .spyOn(api, 'updateNote')
      .mockImplementation(() => null as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: updateNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(updateNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([updateNoteSuccess(MockNotes)]);
    updateNote.mockRestore();
    readNotes.mockRestore();
  });

  it('updateNote error', async () => {
    const updateNote = jest
      .spyOn(api, 'updateNote')
      .mockImplementation(() => Promise.reject(error) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: updateNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(updateNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(0);
    expect(dispatched).toEqual([updateNoteError('error')]);
    updateNote.mockRestore();
    readNotes.mockRestore();
  });
  it('readNotes error', async () => {
    const updateNote = jest
      .spyOn(api, 'updateNote')
      .mockImplementation(() => Promise.resolve(MockNotes) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: updateNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(updateNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([updateNoteError('error')]);
    updateNote.mockRestore();
    readNotes.mockRestore();
  });
});
describe('DeleteNoteSaga', () => {
  it('updateNote success case', async () => {
    const deleteNote = jest
      .spyOn(api, 'deleteNote')
      .mockImplementation(() => null as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: deleteNoteSaga,
      params: { payload: { user: MockUser, key: 'MockKey' } },
    });
    expect(deleteNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([deleteNoteSuccess(MockNotes)]);
    deleteNote.mockRestore();
    readNotes.mockRestore();
  });

  it('deleteNote error', async () => {
    const deleteNote = jest
      .spyOn(api, 'deleteNote')
      .mockImplementation(() => Promise.reject(error) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.resolve(MockNotes));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: deleteNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(deleteNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(0);
    expect(dispatched).toEqual([deleteNoteError('error')]);
    deleteNote.mockRestore();
    readNotes.mockRestore();
  });
  it('readNotes error', async () => {
    const deleteNote = jest
      .spyOn(api, 'deleteNote')
      .mockImplementation(() => Promise.resolve(MockNotes) as never);
    const readNotes = jest
      .spyOn(api, 'readNotes')
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialNotesState,
      saga: deleteNoteSaga,
      params: { payload: { user: MockUser } },
    });
    expect(deleteNote).toHaveBeenCalledTimes(1);
    expect(readNotes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([deleteNoteError('error')]);
    deleteNote.mockRestore();
    readNotes.mockRestore();
  });
});
