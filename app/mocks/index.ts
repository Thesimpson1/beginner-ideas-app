import { AuthState } from 'app/redux/auth/slice';

export const mockInitialState: AuthState = {
  isFetchUserInfo: false,
  user: '',
  fetchUserInfoError: '',
  isCreateUserFetch: false,
  createUserError: '',
  isLogin: false,
  loginError: '',
  isLogout: false,
  logoutError: '',
};
