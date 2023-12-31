import { useEffect } from 'react';
import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { clearTimeout } from '@testing-library/react-native/build/helpers/timers';
import { SoundsItem } from 'app/redux/timer/slice';

import { runMainTimerLogic } from 'app/screens/Timer/utils/utils';

export interface UseRunTimerLogicI {
  changedDate: number;
  isRunTimer: boolean;
  isRunSound: boolean;
  isAndroid: boolean;
  setChangedDate: (prevState: (prevState: number) => number) => void;
  setIsRunSound: (boll: boolean) => void;
  setIsRunTimer: (boll: boolean) => void;
  setAnimationTime: (n: number) => void;
  setIsShowTimePicker: (boll: boolean) => void;
  setAndroidPicker: () => void;
  currentSound: SoundsItem | null;
}

export const useRunTimerLogic = ({
  changedDate,
  isRunSound,
  isRunTimer,
  isAndroid,
  setChangedDate,
  setIsRunSound,
  setIsRunTimer,
  setAnimationTime,
  setIsShowTimePicker,
  setAndroidPicker,
  currentSound,
}: UseRunTimerLogicI) => {
  //run timer
  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;

    if (changedDate !== 0 && isRunTimer) {
      timeOut = setTimeout(() => {
        setChangedDate(
          runMainTimerLogic({ setIsRunTimer, setAnimationTime, setIsRunSound })
        );
      }, 910);
    }
    return () => clearTimeout(timeOut);
  }, [changedDate, isRunTimer, isRunSound]); // eslint-disable-line react-hooks/exhaustive-deps
  //run sounds
  useEffect(() => {
    if (isRunSound) {
      setIsShowTimePicker(true);
      currentSound && playSampleSound(currentSound);
      setIsRunSound(false);
      ////logic for android
      if (isAndroid) {
        setTimeout(() => stopSampleSound(), 5000);
        setAndroidPicker();
      }
    }
  }, [changedDate, isRunTimer, isRunSound]); // eslint-disable-line react-hooks/exhaustive-deps
};
