import {
  getUserInfoError,
  getUserInfoSuccess,
  setUserInfoError,
  setUserInfoSuccess,
} from 'app/redux/auth/slice';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';
import { setUserInfoApi } from 'app/api/auth';

export function* getUserSaga(): unknown {
  try {
    const user = yield call(api.getUserInfoApi);
    yield put(getUserInfoSuccess(user));
  } catch (e) {
    // @ts-ignore
    yield put(getUserInfoError(e.message));
  }
}
interface SetUserPayloadI {
  [key: string]: { email: string; password: string };
}
type SetUserInfoSagaPropsType = SetUserPayloadI & {
  type: string;
};
export function* setUserInfoSaga({
  payload: { email, password },
}: SetUserInfoSagaPropsType) {
  try {
    const data: ReturnType<typeof setUserInfoApi> = yield api.setUserInfoApi({
      email,
      password,
    });
    yield put(setUserInfoSuccess(data));
  } catch (e) {
    // @ts-ignore
    yield put(setUserInfoError(e.message));
  }
}

export function* authListener() {
  yield takeLatest('auth/getUserInfo', getUserSaga);
  yield takeLatest('auth/setUserInfo', setUserInfoSaga);
}
