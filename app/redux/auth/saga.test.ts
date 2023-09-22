import { mockInitialState } from 'app/mocks';
import { createUserSaga, getUserSaga, loginSaga } from 'app/redux/auth/saga';
import {
  createUserError,
  createUserSuccess,
  getUserInfoError,
  getUserInfoSuccess, loginError, loginSuccess,
} from 'app/redux/auth/slice';

import { api } from 'app/api';
import { runTestSaga } from 'app/utils/test-utils/saga-test-configs';

describe('Get User Saga handler', () => {
  const error = { message: 'error' };
  it('getUserInfoApi success case', async () => {
    const getUserInfoApi = jest
      .spyOn(api, 'getUserInfoApi')
      .mockImplementation(() => null);
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: getUserSaga,
    });
    expect(getUserInfoApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getUserInfoSuccess(null)]);
    getUserInfoApi.mockRestore();
  });
  it('getUserInfoApi error case', async () => {
    const getUserInfoApi = jest
      .spyOn(api, 'getUserInfoApi')
      // @ts-ignore
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: getUserSaga,
    });
    expect(getUserInfoApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getUserInfoError('error')]);
    getUserInfoApi.mockRestore();
  });
});
describe('createUserSaga handler', () => {
  const error = { message: 'error' };
  const successResponse = {
    email: 'test email',
    password: 'test password ',
  } as never;

  it('createUserSaga success case', async () => {
    const createUserMockApi = jest
      .spyOn(api, 'createUserApi')
      .mockImplementation(() => Promise.resolve(successResponse));
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: createUserSaga,
      params: { payload: successResponse },
    });
    expect(createUserMockApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([createUserSuccess(successResponse)]);
    createUserMockApi.mockRestore();
  });
  it('createUserSaga error case', async () => {
    const createUserMockApi = jest
      .spyOn(api, 'createUserApi')
      // @ts-ignore
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: createUserSaga,
      params: { payload: successResponse },
    });
    expect(createUserMockApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([createUserError('error')]);
    createUserMockApi.mockRestore();
  });
});
describe('loginSaga handler', () => {
  const error = { message: 'error' };
  const successResponse = {
    email: 'test email',
    password: 'test password ',
  } as never;

  it('loginSaga success case', async () => {
    const loginApi = jest
      .spyOn(api, 'loginApi')
      .mockImplementation(() => Promise.resolve(successResponse));
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: loginSaga,
      params: { payload: successResponse },
    });
    expect(loginApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([loginSuccess(successResponse)]);
    loginApi.mockRestore();
  });
  it('loginSaga error case', async () => {
    const loginApi = jest
      .spyOn(api, 'loginApi')
      // @ts-ignore
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialState,
      saga: loginSaga,
      params: { payload: successResponse },
    });
    expect(loginApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([loginError('error')]);
    loginApi.mockRestore();
  });
});
