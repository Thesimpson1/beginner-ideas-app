import { runSaga } from 'redux-saga';

export const runTestSaga = async ({ state = {}, saga, params = {} }: any) => {
  const dispatched: unknown[] = [];

  await runSaga(
    {
      getState: () => state,
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    params
  );

  return dispatched;
};
