import { getSoundsError, getSoundsSuccess } from 'app/redux/timer/slice';
import { errorHandler } from 'app/redux/utils/utils';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';

export function* getSoundsSaga(): unknown {
  try {
    const sounds = yield call(api.fetchSounds);
    yield put(getSoundsSuccess(sounds));
    // @ts-ignore
  } catch (e: never) {
    yield put(getSoundsError(e.message));
    errorHandler(e.code);
  }
}

export function* timerListener() {
  yield takeLatest('timer/getSounds', getSoundsSaga);
}
