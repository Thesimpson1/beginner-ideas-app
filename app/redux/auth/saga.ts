import {
  createUserError,
  createUserSuccess,
  getUserInfoError,
  getUserInfoSuccess,
  loginError,
  loginSuccess,
} from 'app/redux/auth/slice';
import { errorHandler } from 'app/redux/utils/utils';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from 'app/api';
import { createUserApi, loginApi } from 'app/api/auth';

export function* getUserSaga(): unknown {
  try {
    const user = yield call(api.getUserInfoApi);
    yield put(getUserInfoSuccess(user));
    // @ts-ignore
  } catch (e: never) {
    yield put(getUserInfoError(e.message));
    errorHandler(e.code);
  }
}
interface SetUserPayloadI {
  [key: string]: { email: string; password: string };
}
type SetUserInfoSagaPropsType = SetUserPayloadI & {
  type: string;
};
export function* createUserSaga({
  payload: { email, password },
}: SetUserInfoSagaPropsType) {
  try {
    const data: ReturnType<typeof createUserApi> = yield api.createUserApi({
      email,
      password,
    });
    yield put(createUserSuccess(data));
    // @ts-ignore
  } catch (e: never) {
    yield put(createUserError(e.message));
    errorHandler(e.code);
  }
}
export function* loginSaga({
  payload: { email, password },
}: SetUserInfoSagaPropsType) {
  try {
    const data: ReturnType<typeof loginApi> = yield api.loginApi({
      email,
      password,
    });
    yield put(loginSuccess(data));
    // @ts-ignore
  } catch (e: never) {
    yield put(loginError(e.message));
    errorHandler(e.code);
  }
}
export function* authListener() {
  yield takeLatest('auth/getUserInfo', getUserSaga);
  yield takeLatest('auth/createUser', createUserSaga);
  yield takeLatest('auth/login', loginSaga);
}
