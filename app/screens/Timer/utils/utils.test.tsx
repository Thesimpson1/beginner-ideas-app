import { SoundsItem } from 'app/redux/timer/slice';
import moment from 'moment';

import { colors, MainColorName } from 'app/constants/color';
import {
  getCurrentDate,
  getIndex,
  getRightButtonInfo,
  handlePlayingSounds,
  runMainTimerLogic,
} from 'app/screens/Timer/utils/utils';

jest.mock('app/screens/Timer/utils/utils', () => {
  const originalModule = jest.requireActual('app/screens/Timer/utils/utils');

  return {
    __esModule: true,
    ...originalModule,
  };
});
const mockPlaySampleSound = jest.fn();
const mockStopSampleSound = jest.fn();
jest.mock('react-native-notification-sounds', () => ({
  ...jest.requireActual('react-native-notification-sounds'),
  stopSampleSound: () => mockStopSampleSound(),
  playSampleSound: () => mockPlaySampleSound(),
}));
describe('Timer utils', () => {
  const setIsRunTimer = jest.fn();
  const setIsRunSound = jest.fn();
  const setAnimationTime = jest.fn();
  const isShowTimePicker = true;
  const isRunTimer = true;
  const startTimer = jest.fn();
  const pauseTimer = jest.fn();
  const mockSounds = [{ title: 'Test1' }, { title: 'Test2' }] as SoundsItem[];
  const current = 0;
  const currentSound = mockSounds[1];
  const isPlayCurrentSound = false;
  const setIsPlayCurrentSound = jest.fn();
  it('runMainTimerLogic should work correct', () => {
    const functionResult0 = runMainTimerLogic({
      setIsRunTimer,
      setIsRunSound,
      setAnimationTime,
    });
    const result0 = functionResult0(2000);
    expect(result0).toBe(1000);
    expect(setIsRunTimer).toHaveBeenCalledTimes(0);
    expect(setIsRunSound).toHaveBeenCalledTimes(0);
    expect(setAnimationTime).toHaveBeenCalledTimes(0);

    const functionResult1 = runMainTimerLogic({
      setIsRunTimer,
      setIsRunSound,
      setAnimationTime,
    });
    const result1 = functionResult1(1000);
    expect(result1).toBe(0);
    expect(setIsRunTimer).toHaveBeenCalledTimes(1);
    expect(setIsRunSound).toHaveBeenCalledTimes(1);
    expect(setAnimationTime).toHaveBeenCalledTimes(1);
  });
  it('getRightButtonInfo should work correct', () => {
    const functionResult0 = getRightButtonInfo({
      isShowTimePicker,
      isRunTimer,
      startTimer,
      pauseTimer,
    });
    expect(functionResult0.rightButtonName).toBe('Start');
    expect(functionResult0.rightButtonNameColor).toBe(
      colors[MainColorName.GREEN]
    );
    functionResult0.rightButtonOnPress();
    expect(startTimer).toHaveBeenCalledTimes(1);
  });
  it('handlePlayingSounds should work correct', () => {
    //case 1
    handlePlayingSounds({
      notificationSounds: mockSounds,
      currentSound,
      isPlayCurrentSound,
      setIsPlayCurrentSound,
      current,
    });
    expect(setIsPlayCurrentSound).toHaveBeenCalledTimes(1);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(1);
    //case 2
    handlePlayingSounds({
      notificationSounds: mockSounds,
      currentSound: mockSounds[0],
      isPlayCurrentSound: true,
      setIsPlayCurrentSound,
      current,
    });
    expect(setIsPlayCurrentSound).toHaveBeenCalledTimes(2);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(2);
    //case 3
    handlePlayingSounds({
      notificationSounds: mockSounds,
      currentSound: mockSounds[0],
      isPlayCurrentSound: false,
      setIsPlayCurrentSound,
      current,
    });
    expect(setIsPlayCurrentSound).toHaveBeenCalledTimes(2);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(2);
  });
  it('getCurrentDate should work correct', () => {
    //tests minutes
    const functionResult0 = getCurrentDate({
      date: new Date('2023-11-07T23:40:38.000Z'),
    });
    const mockMinutes =
      moment('2023-11-07T23:40:38.000Z').get('minutes') * 60000;

    expect(functionResult0.currentDate).toBe(mockMinutes);
    //tests hours
    const functionResult1 = getCurrentDate({
      date: new Date('2023-11-08T00:00:38.000Z'),
    });
    const mockHours = moment('2023-11-08T00:00:38.000Z').get('hours') * 3600000;
    expect(functionResult1.currentDate).toBe(mockHours);
    //tests hours and minutes together
    const functionResult2 = getCurrentDate({
      date: new Date('2023-11-08T00:10:38.000Z'),
    });
    const mockHoursAndMinutes =
      moment('2023-11-08T00:10:38.000Z').get('hours') * 3600000 +
      moment('2023-11-08T00:10:38.000Z').get('minutes') * 60000;
    expect(functionResult2.currentDate).toBe(mockHoursAndMinutes);
  });
  it('getIndex should work correct', () => {
    const functionResult0 = getIndex({
      currentSound,
      notificationSounds: mockSounds,
    });
    expect(functionResult0).toBe(1);

    const functionResult1 = getIndex({
      currentSound: null,
      notificationSounds: mockSounds,
    });
    expect(functionResult1).toBe(0);
  });
});
