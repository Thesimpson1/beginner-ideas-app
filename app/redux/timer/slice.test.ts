import { mockInitialState } from 'app/mocks';

import reducer, {
  createUser,
  createUserError,
  createUserSuccess,
  getUserInfo,
  getUserInfoError,
  getUserInfoSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  skipLogin,
} from './slice';

describe('Auth slice', () => {
  const testResponse = { email: 'testEmail@gmail.com' };
  const testResponse2 = {
    user: {
      email: 'testEmail@gmail.com',
    },
  };
  const changedTestText = 'testEmail';
  const mockErrorText = 'Some error';
  const initState = { ...mockInitialState };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(initState);
  });

  it('should handle a get user info', () => {
    mockInitialState.isFetchUserInfo = true;
    expect(reducer(initState, getUserInfo())).toStrictEqual(mockInitialState);
  });

  it('should handle a get user info success when result null', () => {
    mockInitialState.user = null;
    mockInitialState.isFetchUserInfo = false;
    expect(reducer(initState, getUserInfoSuccess(null))).toStrictEqual(
      mockInitialState
    );
  });

  it('should handle a get user info success when result normal', () => {
    mockInitialState.isFetchUserInfo = false;
    mockInitialState.user = changedTestText;
    expect(reducer(initState, getUserInfoSuccess(testResponse))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.user = '';
  });
  it('should handle a get user info error', () => {
    mockInitialState.isFetchUserInfo = false;
    mockInitialState.fetchUserInfoError = mockErrorText;
    expect(reducer(initState, getUserInfoError(mockErrorText))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.fetchUserInfoError = '';
  });
  it('should handle a createUser', () => {
    mockInitialState.isCreateUserFetch = true;
    expect(reducer(initState, createUser({}))).toStrictEqual(mockInitialState);
    mockInitialState.isCreateUserFetch = false;
  });
  it('should handle a createUserSuccess', () => {
    mockInitialState.user = changedTestText;
    expect(reducer(initState, createUserSuccess(testResponse2))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.user = '';
  });
  it('should handle a createUserError', () => {
    mockInitialState.createUserError = mockErrorText;
    expect(reducer(initState, createUserError(mockErrorText))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.createUserError = '';
  });
  it('should handle a login', () => {
    mockInitialState.isLogin = true;
    expect(reducer(initState, login({}))).toStrictEqual(mockInitialState);
    mockInitialState.isLogin = false;
  });
  it('should handle a loginSuccess', () => {
    mockInitialState.user = changedTestText;
    expect(reducer(initState, loginSuccess(testResponse2))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.user = '';
  });
  it('should handle a loginError', () => {
    mockInitialState.loginError = mockErrorText;
    expect(reducer(initState, loginError(mockErrorText))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.loginError = '';
  });
  it('should handle a logout', () => {
    mockInitialState.isLogout = true;
    expect(reducer(initState, logout())).toStrictEqual(mockInitialState);
    mockInitialState.isLogout = false;
  });
  it('should handle a logoutSuccess', () => {
    mockInitialState.user = null;
    expect(reducer(initState, logoutSuccess())).toStrictEqual(mockInitialState);
    mockInitialState.user = '';
  });
  it('should handle a logoutError', () => {
    mockInitialState.logoutError = mockErrorText;
    expect(reducer(initState, logoutError(mockErrorText))).toStrictEqual(
      mockInitialState
    );
    mockInitialState.logoutError = '';
  });

  it('should handle a skipLogin', () => {
    mockInitialState.user = 'Guest';
    expect(reducer(initState, skipLogin())).toStrictEqual(mockInitialState);
    mockInitialState.user = '';
  });
});
