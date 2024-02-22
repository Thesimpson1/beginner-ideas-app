import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isFetchUserInfo: boolean;
  user: string | null;
  fetchUserInfoError: string;
  isCreateUserFetch: boolean;
  createUserError: string;
  isLogin: boolean;
  loginError: string;
  isLogout: boolean;
  logoutError: string;
}
interface GetUserInfoErrorActionI {
  type: string;
  payload: string;
}
const initialState: AuthState = {
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

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserInfo: (state) => {
      state.isFetchUserInfo = true;
      state.fetchUserInfoError = '';
    },
    getUserInfoSuccess: (state, action) => {
      state.isFetchUserInfo = false;
      state.user = action.payload?.email
        ? action.payload?.email.slice(0, action.payload?.email.indexOf('@'))
        : action.payload;
    },
    getUserInfoError: (state, action: GetUserInfoErrorActionI) => {
      state.isFetchUserInfo = false;
      state.fetchUserInfoError = action.payload;
    },
    // eslint-disable-next-line
    createUser: (state, action) => {
      state.isCreateUserFetch = true;
      state.createUserError = '';
    },
    createUserSuccess: (state, action) => {
      state.isCreateUserFetch = false;
      state.user = action.payload.user?.email.slice(
        0,
        action.payload.user?.email.indexOf('@')
      );
    },
    createUserError: (state, action: GetUserInfoErrorActionI) => {
      state.isCreateUserFetch = false;
      state.createUserError = action.payload;
    },
    // eslint-disable-next-line
    login: (state, action) => {
      state.isLogin = true;
      state.loginError = '';
    },
    loginSuccess: (state, action) => {
      state.isLogin = false;
      state.user = action.payload.user?.email.slice(
        0,
        action.payload.user?.email.indexOf('@')
      );
    },
    loginError: (state, action: GetUserInfoErrorActionI) => {
      state.isLogin = false;
      state.loginError = action.payload;
    },
    logout: (state) => {
      state.isLogout = true;
      state.logoutError = '';
    },
    logoutSuccess: (state) => {
      state.isLogout = false;
      state.user = null;
    },
    logoutError: (state, action: GetUserInfoErrorActionI) => {
      state.isLogout = false;
      state.logoutError = action.payload;
    },
    skipLogin: (state) => {
      state.user = 'Guest';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoError,
  createUser,
  createUserSuccess,
  createUserError,
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
  logoutError,
  skipLogin,
} = slice.actions;

export default slice.reducer;
