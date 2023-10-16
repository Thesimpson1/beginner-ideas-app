import React from 'react';
import { Button } from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  StyledAnimatedPart,
  StyledBottomCircleProgressBarWrapper,
  StyledCircleProgressBarWrapper,
  StyledTopCircleProgressBarWrapper,
} from 'app/components/CircleProgressBar/CircleProgressBar.styled';
import { HalfCircleWrapper } from 'app/components/CircleProgressBar/componets/HalfCircle/HalfCircle';
import { PI, RADIUS } from 'app/components/CircleProgressBar/constants';
import { colors, MainColorName } from 'app/constants/color';

interface CircleProgressBarI {}
export function CircleProgressBar({}: CircleProgressBarI) {
  const progress = useSharedValue(0);

  const styleTop = useAnimatedStyle(() => {
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
        { translateY: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateY: -RADIUS / 2 },
      ],
      opacity,
    };
  });
  const styleBottom = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, PI, PI * 2], [0, 0, PI], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [
        { translateY: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateY: -RADIUS / 2 },
      ],
    };
  });
  const onHandle = () => {
    progress.value = withSequence(
      withTiming(PI * 2, { duration: 10000 }),
      withTiming(0, { duration: 0 })
    );
  };

  return (
    <StyledCircleProgressBarWrapper>
      <StyledTopCircleProgressBarWrapper>
        <HalfCircleWrapper backgroundColor={colors[MainColorName.BLACK]} />
        <StyledAnimatedPart style={styleTop}>
          <HalfCircleWrapper backgroundColor={colors[MainColorName.ORANGE]} />
        </StyledAnimatedPart>
      </StyledTopCircleProgressBarWrapper>
      <StyledBottomCircleProgressBarWrapper>
        <HalfCircleWrapper backgroundColor={colors[MainColorName.BLACK]} />

        <StyledAnimatedPart style={styleBottom}>
          <HalfCircleWrapper backgroundColor={colors[MainColorName.ORANGE]} />
        </StyledAnimatedPart>
      </StyledBottomCircleProgressBarWrapper>
      <Button title="shake" onPress={onHandle} />
    </StyledCircleProgressBarWrapper>
  );
}
