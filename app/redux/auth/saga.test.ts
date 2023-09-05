import { getUserSaga } from 'app/redux/auth/saga';
import { getUserInfoError, getUserInfoSuccess } from 'app/redux/auth/slice';

import { api } from 'app/api';
import { runTestSaga } from 'app/utils/test-utils/saga-test-configs';

const mockInitState = {
  auth: {
    fetchUserInfoError: '',
    isFetchUserInfo: false,
    user: [],
  },
};

describe('Get User Saga handler', () => {
  const responseSuccess = { json: () => Promise.resolve([]) } as Response;
  const error = { message: 'error' };
  it('success case', async () => {
    const requestDelete = jest
      .spyOn(api, 'getUserInfoApi')
      .mockImplementation(() => Promise.resolve(responseSuccess));
    const dispatched = await runTestSaga({
      state: mockInitState,
      saga: getUserSaga,
    });
    expect(requestDelete).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getUserInfoSuccess([])]);
    requestDelete.mockRestore();
  });
  it('error case', async () => {
    const requestDelete = jest
      .spyOn(api, 'getUserInfoApi')
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitState,
      saga: getUserSaga,
    });
    expect(requestDelete).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getUserInfoError('error')]);
    requestDelete.mockRestore();
  });
});
