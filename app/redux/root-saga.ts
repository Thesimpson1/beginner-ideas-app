import { notesListener } from 'app/redux/notes/saga';
import { timerListener } from 'app/redux/timer/saga';
import { fork } from 'redux-saga/effects';

import { authListener } from './auth/saga';

export function* rootSaga() {
  yield fork(authListener);
  yield fork(timerListener);
  yield fork(notesListener);
}
