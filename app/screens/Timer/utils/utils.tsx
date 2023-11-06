import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { SoundsItem } from 'app/redux/timer/slice';

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
