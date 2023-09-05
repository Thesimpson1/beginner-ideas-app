import { rootReducer } from 'app/redux/root-reducer';

describe('Root reducer', () => {
  const initState = {
    auth: {
      fetchUserInfoError: '',
      isFetchUserInfo: false,
      user: [],
    },
  };

  it('should return the initial state', () => {
    expect(rootReducer(undefined, { type: undefined })).toStrictEqual(
      initState
    );
  });
});
