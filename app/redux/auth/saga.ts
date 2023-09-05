import { getUserInfoError, getUserInfoSuccess } from 'app/redux/auth/slice';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';

export function* getUserSaga(): unknown {
  try {
    const user = yield call(api.getUserInfoApi);

    const userFormatted = yield user.json();

    yield put(getUserInfoSuccess(userFormatted));
  } catch (e) {
    // @ts-ignore
    yield put(getUserInfoError(e.message));
  }
}

export function* authListener() {
  yield takeLatest('auth/getUserInfo', getUserSaga);
}
