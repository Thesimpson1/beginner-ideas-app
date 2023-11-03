import { mockInitialTimerState } from 'app/mocks';

import reducer, {
  clearAll,
  clearSounds,
  getSounds,
  getSoundsError,
  getSoundsSuccess,
  setCurrentSound,
  SoundsItem,
} from './slice';

describe('Timer slice', () => {
  const testResponse = [{ title: 'Test1' }, { title: 'Test2' }] as SoundsItem[];
  const testResponse2 = {
    title: 'AnotherTestResponse',
  } as SoundsItem;
  const mockErrorText = 'Some error';
  const initState = { ...mockInitialTimerState };

  it('should return the timer initial state', () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(initState);
  });
  it('should handle a get Sounds', () => {
    mockInitialTimerState.isFetchNotificationSounds = true;
    expect(reducer(initState, getSounds())).toStrictEqual(
      mockInitialTimerState
    );
    mockInitialTimerState.isFetchNotificationSounds = false;
  });
  it('should handle a getSoundsSuccess  when currentSound null', () => {
    mockInitialTimerState.currentSound = testResponse[0];
    mockInitialTimerState.notificationSounds = testResponse;
    expect(reducer(initState, getSoundsSuccess(testResponse))).toStrictEqual(
      mockInitialTimerState
    );
    mockInitialTimerState.notificationSounds = null;
    mockInitialTimerState.currentSound = null;
  });
  it('should handle a getSoundsSuccess', () => {
    mockInitialTimerState.currentSound = testResponse2;
    mockInitialTimerState.notificationSounds = testResponse;
    initState.currentSound = testResponse2;
    expect(reducer(initState, getSoundsSuccess(testResponse))).toStrictEqual(
      mockInitialTimerState
    );
    mockInitialTimerState.notificationSounds = null;
    mockInitialTimerState.currentSound = null;
    initState.currentSound = null;
  });
  it('should handle a getSoundsError', () => {
    mockInitialTimerState.fetchNotificationSoundsError = mockErrorText;
    expect(reducer(initState, getSoundsError(mockErrorText))).toStrictEqual(
      mockInitialTimerState
    );
    mockInitialTimerState.fetchNotificationSoundsError = '';
  });
  it('should handle a setCurrentSound', () => {
    mockInitialTimerState.currentSound = testResponse2;
    expect(reducer(initState, setCurrentSound(testResponse2))).toStrictEqual(
      mockInitialTimerState
    );
    mockInitialTimerState.currentSound = null;
  });
  it('should handle a clearSounds', () => {
    mockInitialTimerState.notificationSounds = null;
    initState.notificationSounds = testResponse;
    expect(reducer(initState, clearSounds())).toStrictEqual(
      mockInitialTimerState
    );
  });
  it('should handle a clearAll', () => {
    expect(reducer(initState, clearAll())).toStrictEqual(mockInitialTimerState);
  });
});
