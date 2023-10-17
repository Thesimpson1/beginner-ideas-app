import React, { ReactNode } from 'react';
import { Button, Text, View } from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { width } from 'app/utils/scaling-system';
import {
  StyledAnimatedPart,
  StyledBottomCircleProgressBarWrapper,
  StyledBottomCircleTextWrapper,
  StyledCircleProgressBarContainer,
  StyledCircleProgressBarWrapper,
  StyledTopCircleProgressBarWrapper,
} from 'app/components/CircleProgressBar/CircleProgressBar.styled';
import { HalfCircleWrapper } from 'app/components/CircleProgressBar/componets/HalfCircle/HalfCircle';
import { PI, RADIUS } from 'app/components/CircleProgressBar/constants';
import { colors, MainColorName } from 'app/constants/color';

interface CircleProgressBarI {
  children: ReactNode;
}
export function CircleProgressBar({ children }: CircleProgressBarI) {
  const progress = useSharedValue(360);

  const styleTop = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, PI], [0, 180], {
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
  const styleBottom = useAnimatedStyle(() => {
    console.log('111', progress.value);
    const rotate = interpolate(progress.value, [0, PI, PI * 2], [0, 0, 180], {
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
  const onHandle = () => {
    progress.value = withSequence(
      withTiming(0, { duration: 10000 }),
      withTiming(360, { duration: 0 })
    );
  };

  return (
    <StyledCircleProgressBarWrapper>
      <StyledCircleProgressBarContainer>
        <StyledTopCircleProgressBarWrapper>
          <HalfCircleWrapper color={colors[MainColorName.ORANGE]} />
          <StyledAnimatedPart style={styleBottom}>
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledTopCircleProgressBarWrapper>
        <StyledBottomCircleProgressBarWrapper>
          <HalfCircleWrapper color={colors[MainColorName.ORANGE]} />
          <StyledAnimatedPart style={styleTop}>
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledBottomCircleProgressBarWrapper>
      </StyledCircleProgressBarContainer>

      {/*<Button title="shake" onPress={onHandle} />*/}
      <StyledBottomCircleTextWrapper>{children}</StyledBottomCircleTextWrapper>
    </StyledCircleProgressBarWrapper>
  );
}
