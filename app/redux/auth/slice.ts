import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isFetchUserInfo: boolean;
  user: [];
  fetchUserInfoError: string;
}

const initialState: AuthState = {
  isFetchUserInfo: false,
  user: [],
  fetchUserInfoError: '',
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
    getUserInfoError: (state, action) => {
      state.isFetchUserInfo = false;
      state.fetchUserInfoError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserInfo, getUserInfoSuccess, getUserInfoError } =
  slice.actions;

export default slice.reducer;
