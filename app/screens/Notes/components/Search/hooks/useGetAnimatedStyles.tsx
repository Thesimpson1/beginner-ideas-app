import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface useGetAnimatedStylesI {
  offset: SharedValue<number>;
  searchWidth: SharedValue<string>;
  cancelButtonWidth: SharedValue<number>;
  cancelButtonHeight: SharedValue<number>;
  cancelButtonOpacity: SharedValue<number>;
  isBlur: SharedValue<boolean>;
}
export const useGetAnimatedStyles = ({
  offset,
  cancelButtonOpacity,
  cancelButtonHeight,
  isBlur,
  cancelButtonWidth,
  searchWidth,
}: useGetAnimatedStylesI) => {
  const textAnimatedStyle = useAnimatedStyle(() => {
    const animatedOpacity = interpolate(offset.value, [0, 50], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return { opacity: animatedOpacity };
  });
  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    const animatedHeight = interpolate(
      offset.value,
      [-50, 0, 50],
      [50, 50, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    const animatedPadding = interpolate(
      offset.value,
      [-50, 0, 50],
      [15, 15, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      maxHeight: animatedHeight,
      padding: animatedPadding,
      width: '100%',
    };
  });
  // @ts-ignore
  const searchWidthAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(searchWidth.value, { duration: 500 }),
    };
  });
  const cancelButtonWidthAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(cancelButtonWidth.value, {
        duration: 500,
      }),
      maxHeight: withTiming(cancelButtonHeight.value, {
        duration: 500,
      }),
      opacity: withTiming(cancelButtonOpacity.value, {
        duration: isBlur.value ? 100 : 2000,
      }),
    };
  });
  return {
    textAnimatedStyle,
    wrapperAnimatedStyle,
    searchWidthAnimatedStyle,
    cancelButtonWidthAnimatedStyle,
  };
};
