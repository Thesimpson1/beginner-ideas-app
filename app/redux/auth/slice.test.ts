import reducer, {
  getUserInfo,
  getUserInfoError,
  getUserInfoSuccess,
} from './slice';

describe('Auth slice', () => {
  const testText = 'Hello test';
  const initState = {
    fetchUserInfoError: '',
    isFetchUserInfo: false,
    user: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(initState);
  });

  it('should handle a get user info', () => {
    expect(reducer(initState, getUserInfo())).toStrictEqual({
      fetchUserInfoError: '',
      isFetchUserInfo: true,
      user: [],
    });
  });

  it('should handle a get user info success', () => {
    expect(reducer(initState, getUserInfoSuccess([testText]))).toStrictEqual({
      fetchUserInfoError: '',
      isFetchUserInfo: false,
      user: [testText],
    });
  });

  it('should handle a get user info error', () => {
    expect(reducer(initState, getUserInfoError(testText))).toStrictEqual({
      fetchUserInfoError: testText,
      isFetchUserInfo: false,
      user: [],
    });
  });
});
