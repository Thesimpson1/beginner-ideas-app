import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface useGetAnimatedStylesI {
  offset: SharedValue<number>;
}
export const useGetAnimatedStyles = ({ offset }: useGetAnimatedStylesI) => {
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
    return { maxHeight: animatedHeight, padding: animatedPadding };
  });
  return { textAnimatedStyle, wrapperAnimatedStyle };
};
