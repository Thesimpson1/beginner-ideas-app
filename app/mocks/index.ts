import { AuthState } from 'app/redux/auth/slice';
import { NotesState } from 'app/redux/notes/slice';
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
export const mockInitialNotesState: NotesState = {
  sortMode: 'By creating date',
  dataSortMode: 'On',
  isOpenDeleteComponent: false,

  isFetchNotes: false,
  notes: null,
  fetchNotesError: '',

  isPushNewNote: false,
  pushNewNoteError: '',

  isUpdateNote: false,
  updateNoteError: '',

  isDeleteNote: false,
  deleteNoteError: '',
};

export const MockNoteValue1 = {
  date: '2024-01-12',
  note: 'MockNote',
  subTitle: 'MockSubTitle',
  title: 'MockTitle',
  user: 'MockUser',
};
export const MockNoteValue2 = {
  date: '2024-02-12',
  note: 'MockNote',
  subTitle: 'MockSubTitle',
  title: 'MockTitle',
  user: 'MockUser',
};
