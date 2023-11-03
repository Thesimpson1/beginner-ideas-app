import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { PI, RADIUS } from 'app/components/CircleProgressBar/constants';

interface SetDisplayedValueI {
  progress: SharedValue<number>;
}

export const useGetAnimatedStyle = ({ progress }: SetDisplayedValueI) => {
  const styleLeft = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, PI], [0, PI], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const opacity = interpolate(
      progress.value,
      [0, PI - 1, PI, 2 * PI],
      [1, 1, 0, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [
        { translateX: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateX: -RADIUS / 2 },
      ],
      opacity,
    };
  });

  const styleRight = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, PI, PI * 2], [0, 0, PI], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [
        { translateX: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateX: -RADIUS / 2 },
      ],
    };
  });

  return { styleLeft, styleRight };
};
