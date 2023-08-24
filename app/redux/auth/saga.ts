import { getUserInfoError, getUserInfoSuccess } from 'app/redux/auth/slice';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* getUserSaga(): unknown {
  try {
    const user = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'));

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
