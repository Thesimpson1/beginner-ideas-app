import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { SoundsItem } from 'app/redux/timer/slice';
import moment from 'moment/moment';

import { colors, MainColorName } from 'app/constants/color';

interface GetIndexI {
  notificationSounds: Array<SoundsItem> | null;
  currentSound: SoundsItem | null;
}
interface HandlePlayingSoundsI {
  notificationSounds: Array<SoundsItem>;
  currentSound: SoundsItem | null;
  current: number;
  isPlayCurrentSound: boolean;
  setIsPlayCurrentSound: (value: boolean) => void;
}
interface GetRightButtonInfoI {
  isShowTimePicker: boolean;
  isRunTimer: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
}
//get current sounds index
export const getIndex = ({ currentSound, notificationSounds }: GetIndexI) => {
  let currentIndex = 0;
  if (currentSound && notificationSounds) {
    notificationSounds.forEach((item, index) => {
      if (item.title === currentSound.title) {
        currentIndex = index;
      }
    });
  }
  return currentIndex;
};
//handle sounds playing
export const handlePlayingSounds = ({
  notificationSounds,
  current,
  currentSound,
  isPlayCurrentSound,
  setIsPlayCurrentSound,
}: HandlePlayingSoundsI) => {
  if (currentSound !== notificationSounds[current] || isPlayCurrentSound) {
    setIsPlayCurrentSound(true);
    stopSampleSound();
    setTimeout(() => playSampleSound(notificationSounds[current]), 100);
  }
};
//get Right Button Info in timer screen
export const getRightButtonInfo = ({
  isShowTimePicker,
  isRunTimer,
  startTimer,
  pauseTimer,
}: GetRightButtonInfoI) => {
  switch (true) {
    case isShowTimePicker: {
      return {
        rightButtonNameColor: colors[MainColorName.GREEN],
        rightButtonName: 'Start',
        rightButtonOnPress: startTimer,
      };
    }
    case !isShowTimePicker && isRunTimer: {
      return {
        rightButtonNameColor: colors[MainColorName.ORANGE],
        rightButtonName: 'Pause',
        rightButtonOnPress: pauseTimer,
      };
    }
    case !isShowTimePicker && !isRunTimer: {
      return {
        rightButtonNameColor: colors[MainColorName.ORANGE],
        rightButtonName: 'Continue',
        rightButtonOnPress: startTimer,
      };
    }
    default: {
      return {
        rightButtonNameColor: colors[MainColorName.GREEN],
        rightButtonName: 'Start',
        rightButtonOnPress: startTimer,
      };
    }
  }
};
//get current date for timer
export const getCurrentDate = ({ date }: { date: Date }) => {
  const minutesFromPicker = moment(date).get('minutes');
  const hoursFromPicker = moment(date).get('hours');
  let currentDate = 0;
  if (hoursFromPicker > 0) {
    currentDate = hoursFromPicker * 3600000;
  }
  if (minutesFromPicker > 0) {
    currentDate = currentDate + minutesFromPicker * 60000;
  }
  return { currentDate };
};

// export const runMainTimerLogic =
//   ({ setIsRunSound, setIsRunTimer, setAnimationTime }) =>
//   (prevState: number) => {
//     const newReturnValue = prevState - 1000;
//     if (newReturnValue === 0) {
//       setIsRunSound(true);
//       setIsRunTimer(false);
//       setAnimationTime(0);
//     }
//     return newReturnValue;
//   };
// export const runSound = ({
//   setIsRunSound,
//   setIsShowTimePicker,
//   currentSound,
//   isAndroid,
//   setAndroidPicker,
// }) => {
//   setIsShowTimePicker(true);
//   currentSound && playSampleSound(currentSound);
//   setIsRunSound(false);
//   ////logic for android
//   if (isAndroid) {
//     setTimeout(() => stopSampleSound(), 5000);
//     setAndroidPicker();
//   }
// };
