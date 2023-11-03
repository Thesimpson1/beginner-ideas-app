import { Sound } from 'react-native-notification-sounds';
import { mockInitialTimerState } from 'app/mocks';
import { getSoundsSaga } from 'app/redux/timer/saga';
import { getSoundsError, getSoundsSuccess } from 'app/redux/timer/slice';

import { api } from 'app/api';
import { runTestSaga } from 'app/utils/test-utils/saga-test-configs';

describe('get Sounds Saga handler', () => {
  const error = { message: 'error' };
  const mockResponse: () => Promise<Sound[]> = async () => {
    return [{ title: 'test' }] as Sound[];
  };
  it('getSoundsSaga success case', async () => {
    const getSoundsApi = jest
      .spyOn(api, 'fetchSounds')
      .mockImplementation(mockResponse);
    const dispatched = await runTestSaga({
      state: mockInitialTimerState,
      saga: getSoundsSaga,
    });
    expect(getSoundsApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getSoundsSuccess([{ title: 'test' }])]);
    getSoundsApi.mockRestore();
  });

  it('getSoundsSaga error case', async () => {
    const getSoundsApi = jest
      .spyOn(api, 'fetchSounds')
      // @ts-ignore
      .mockImplementation(() => Promise.reject(error));
    const dispatched = await runTestSaga({
      state: mockInitialTimerState,
      saga: getSoundsSaga,
    });
    expect(getSoundsApi).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getSoundsError('error')]);
    getSoundsApi.mockRestore();
  });
});
