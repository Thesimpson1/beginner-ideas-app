import { fork } from 'redux-saga/effects';

import { authListener } from './auth/saga';

export function* rootSaga() {
  yield fork(authListener);
}
