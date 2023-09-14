import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isFetchUserInfo: boolean;
  user: string | null;
  fetchUserInfoError: string;
  isSetUserFetch: boolean;
  isSetUserError: string;
}
interface GetUserInfoErrorActionI {
  type: string;
  payload: string;
}
const initialState: AuthState = {
  isFetchUserInfo: false,
  user: null,
  fetchUserInfoError: '',
  isSetUserFetch: false,
  isSetUserError: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserInfo: (state) => {
      state.isFetchUserInfo = true;
    },
    getUserInfoSuccess: (state, action) => {
      state.isFetchUserInfo = false;
      state.user = action.payload;
    },
    getUserInfoError: (state, action: GetUserInfoErrorActionI) => {
      state.isFetchUserInfo = false;
      state.fetchUserInfoError = action.payload;
    },
    setUserInfo: (state, action) => {
      state.isSetUserFetch = true;
    },
    setUserInfoSuccess: (state, action) => {
      state.isSetUserFetch = false;
      state.user = action.payload.user?.email.slice(
        0,
        action.payload.user?.email.indexOf('@')
      );
    },
    setUserInfoError: (state, action: GetUserInfoErrorActionI) => {
      state.isSetUserFetch = false;
      state.isSetUserError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoError,
  setUserInfo,
  setUserInfoSuccess,
  setUserInfoError,
} = slice.actions;

export default slice.reducer;
