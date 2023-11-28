import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'app/redux/auth/slice';
import timerReducer from 'app/redux/timer/slice';
import notesReducer from 'app/redux/notes/slice';
import { persistReducer } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
export const rootReducer = combineReducers({
  auth: authReducer,
  timer: timerReducer,
  notes: notesReducer,
});
export const persistedReducer = persistReducer(persistConfig, rootReducer);
