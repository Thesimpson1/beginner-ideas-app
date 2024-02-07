import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { setAnimationOpacity } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/utils/utils';
interface UseGetAnimationStylesI {
  isShowAnimation: SharedValue<boolean>;
  isShowDropdown: SharedValue<boolean>;
}
export const MENU_HEIGHT = calcHeight(50) * 3;
export const MENU_WIDTH = calcWidth(200);
export const useGetAnimationStyles = ({
  isShowAnimation,
  isShowDropdown,
}: UseGetAnimationStylesI) => {
  const rightMenuWrapperAnimatedStyle = useAnimatedStyle(() => {
    if (!isShowAnimation.value) {
      isShowDropdown.value = false;
    }
    return {
      height: withTiming(isShowAnimation.value ? MENU_HEIGHT : 0, {
        duration: 200,
      }),
      width: withTiming(isShowAnimation.value ? MENU_WIDTH : 0, {
        duration: 200,
      }),
      opacity: withTiming(
        setAnimationOpacity({
          isShowAnimation: isShowAnimation.value,
          isShowDropdown: isShowDropdown.value,
        }),
        { duration: 200 }
      ),
      transform: [
        {
          scale: withTiming(isShowDropdown.value ? 0.95 : 1, {
            duration: 200,
          }),
        },
      ],
    };
  });
  const dropdownAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isShowDropdown.value ? MENU_HEIGHT : 0, {
        duration: 500,
      }),
      opacity: withTiming(isShowDropdown.value ? 1 : 0, { duration: 500 }),
    };
  });

  return { rightMenuWrapperAnimatedStyle, dropdownAnimatedStyle };
};
