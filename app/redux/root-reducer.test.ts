import {
  mockInitialNotesState,
  mockInitialState,
  mockInitialTimerState,
} from 'app/mocks';
import { rootReducer } from 'app/redux/root-reducer';
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
describe('Root reducer', () => {
  const initState = {
    auth: mockInitialState,
    timer: mockInitialTimerState,
    notes: mockInitialNotesState,
  };

  it('should return the initial state', () => {
    expect(rootReducer(undefined, { type: undefined })).toStrictEqual(
      initState
    );
  });
});
