import { AuthState } from 'app/redux/auth/slice';
import { TimerState } from 'app/redux/timer/slice';

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
export const mockInitialTimerState: TimerState = {
  isFetchNotificationSounds: false,
  notificationSounds: null,
  fetchNotificationSoundsError: '',

  currentSound: null,
};
