import { getSoundsError, getSoundsSuccess } from 'app/redux/timer/slice';
import { errorHandler } from 'app/redux/utils/utils';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';

export function* notesListener() {
  // yield takeLatest('notes/getSounds', getSoundsSaga);
}
