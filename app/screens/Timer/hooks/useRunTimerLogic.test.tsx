import { renderHook } from '@testing-library/react-native';
import { SoundsItem } from 'app/redux/timer/slice';
import moment from 'moment';

import {
  useRunTimerLogic,
  UseRunTimerLogicI,
} from 'app/screens/Timer/hooks/useRunTimerLogic';

const setChangedDate = jest.fn();
const setIsRunSound = jest.fn();
const setIsRunTimer = jest.fn();
const setAnimationTime = jest.fn();
const setIsShowTimePicker = jest.fn();
const setAndroidPicker = jest.fn();

const mockPropsUseRunTimeLogic = {
  changedDate: 0,
  isRunSound: false,
  isRunTimer: false,
  isAndroid: false,
  setChangedDate,
  setIsRunSound,
  setIsRunTimer,
  setAnimationTime,
  setIsShowTimePicker,
  setAndroidPicker,
  currentSound: { title: 'Test1' } as SoundsItem,
};
const mockPlaySampleSound = jest.fn();
const mockStopSampleSound = jest.fn();

jest.mock('react-native-notification-sounds', () => ({
  ...jest.requireActual('react-native-notification-sounds'),
  stopSampleSound: () => mockStopSampleSound(),
  playSampleSound: () => mockPlaySampleSound(),
}));
jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');
describe('Test useRunTimerLogic', () => {
  it('useRunTimerLogic has to be correct', async () => {
    const { rerender } = await renderHook(
      (props: UseRunTimerLogicI) => useRunTimerLogic({ ...props }),
      { initialProps: mockPropsUseRunTimeLogic }
    );

    expect(setChangedDate).toHaveBeenCalledTimes(0);
    expect(setIsRunSound).toHaveBeenCalledTimes(0);
    expect(setIsRunTimer).toHaveBeenCalledTimes(0);
    expect(setAnimationTime).toHaveBeenCalledTimes(0);
    expect(setIsShowTimePicker).toHaveBeenCalledTimes(0);
    expect(setAndroidPicker).toHaveBeenCalledTimes(0);
    //check sounds logic
    mockPropsUseRunTimeLogic.isRunSound = true;
    rerender(mockPropsUseRunTimeLogic);

    expect(setIsShowTimePicker).toHaveBeenLastCalledWith(true);
    expect(setIsShowTimePicker).toHaveBeenCalledTimes(1);
    expect(setIsRunSound).toHaveBeenLastCalledWith(false);
    expect(mockPlaySampleSound).toHaveBeenCalledTimes(1);

    mockPropsUseRunTimeLogic.isRunSound = false;
    //check timer logic
    mockPropsUseRunTimeLogic.changedDate = 3000;
    mockPropsUseRunTimeLogic.isRunTimer = true;
    await rerender(mockPropsUseRunTimeLogic);
    jest.runAllTimers();
    expect(setChangedDate).toHaveBeenCalledTimes(1);
    mockPropsUseRunTimeLogic.isRunTimer = false;
  });
  it('useRunTimerLogic has to be correct when android platform', async () => {
    mockPropsUseRunTimeLogic.isAndroid = true;
    mockPropsUseRunTimeLogic.isRunSound = true;

    await renderHook(
      (props: UseRunTimerLogicI) => useRunTimerLogic({ ...props }),
      { initialProps: mockPropsUseRunTimeLogic }
    );
    jest.runAllTimers();

    expect(setAndroidPicker).toHaveBeenCalledTimes(1);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(1);
  });
});
