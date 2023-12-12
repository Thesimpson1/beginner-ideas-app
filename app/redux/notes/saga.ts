import {
  deleteNoteError,
  deleteNoteSuccess,
  getNotesError,
  getNotesSuccess,
  PushNoteActionPayloadI,
  pushNoteError,
  pushNoteSuccess,
  updateNoteError,
  updateNoteSuccess,
} from 'app/redux/notes/slice';
import { errorHandler } from 'app/redux/utils/utils';
import { put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';

interface SetGetNotesPayloadI {
  [key: string]: { user: string };
}
type SetGetNotesSagaPropsType = SetGetNotesPayloadI & {
  type: string;
};

interface SetPushNotePayloadI {
  [key: string]: PushNoteActionPayloadI;
}
type SetPushNoteSagaPropsType = SetPushNotePayloadI & {
  type: string;
};

interface UpdateNotePayloadI {
  [key: string]: { user: string; note: string; key: string };
}
type UpdateNoteSagaPropsType = UpdateNotePayloadI & {
  type: string;
};

interface DeleteNotePayloadI {
  [key: string]: { user: string; key: string };
}
type DeleteNoteSagaPropsType = DeleteNotePayloadI & {
  type: string;
};

export function* getNotesSaga({
  payload: { user },
}: SetGetNotesSagaPropsType): unknown {
  try {
    yield api.createReference({
      user,
    });
    const getNotesOnce: PushNoteActionPayloadI = yield api.readNotes({
      user,
    });
    yield put(getNotesSuccess(getNotesOnce));
    // @ts-ignore
  } catch (e: never) {
    yield put(getNotesError(e.message));
    errorHandler(e.code);
  }
}

export function* pushNoteSaga({ payload }: SetPushNoteSagaPropsType): unknown {
  try {
    console.log('1111', payload);
    yield api.pushNote({
      ...payload,
    });
    const getNotesOnce: PushNoteActionPayloadI = yield api.readNotes({
      user: payload.user,
    });
    yield put(pushNoteSuccess(getNotesOnce));
    // @ts-ignore
  } catch (e: never) {
    yield put(pushNoteError(e.message));
    errorHandler(e.code);
  }
}

export function* updateNoteSaga({
  payload: { user, note, key },
}: UpdateNoteSagaPropsType): unknown {
  try {
    yield api.updateNote({
      user,
      note,
      key,
    });
    const getNotesOnce: PushNoteActionPayloadI = yield api.readNotes({
      user,
    });
    yield put(updateNoteSuccess(getNotesOnce));
    // @ts-ignore
  } catch (e: never) {
    yield put(updateNoteError(e.message));
    errorHandler(e.code);
  }
}

export function* deleteNoteSaga({
  payload: { user, key },
}: DeleteNoteSagaPropsType): unknown {
  try {
    yield api.deleteNote({
      user,
      key,
    });
    const getNotesOnce: PushNoteActionPayloadI = yield api.readNotes({
      user,
    });
    yield put(deleteNoteSuccess(getNotesOnce));
    // @ts-ignore
  } catch (e: never) {
    yield put(deleteNoteError(e.message));
    errorHandler(e.code);
  }
}
export function* notesListener() {
  yield takeLatest('notes/getNotes', getNotesSaga);
  yield takeLatest('notes/pushNote', pushNoteSaga);
  yield takeLatest('notes/updateNote', updateNoteSaga);
  yield takeLatest('notes/deleteNote', deleteNoteSaga);
}
