import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'app/redux/auth/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
