import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import authReducer from 'app/redux/auth/slice';
import notesReducer from 'app/redux/notes/slice';
import timerReducer from 'app/redux/timer/slice';
import createSagaMiddleware from 'redux-saga';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  auth: authReducer,
  timer: timerReducer,
  notes: notesReducer,
});
export const sagaMiddleware = createSagaMiddleware();
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
