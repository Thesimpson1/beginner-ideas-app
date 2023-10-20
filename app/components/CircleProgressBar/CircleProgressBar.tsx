import React, { ReactNode, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { withPause } from 'react-native-redash';

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
  isShowTimePicker: boolean;
  animationDuration: number;
  pause: SharedValue<boolean>;
}
export function CircleProgressBar({
  children,
  isShowTimePicker,
  animationDuration,
  pause,
}: CircleProgressBarI) {
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
        { translateX: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateX: -RADIUS / 2 },
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
        { translateX: RADIUS / 2 },
        { rotate: `${rotate}deg` },
        { translateX: -RADIUS / 2 },
      ],
    };
  });
  useEffect(() => {
    if (isShowTimePicker) {
      progress.value = 360;
    }
  }, [isShowTimePicker]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (animationDuration) {
      progress.value = withPause(
        withTiming(0, { duration: animationDuration }),
        pause
      );
    }
  }, [animationDuration, pause]); // eslint-disable-line react-hooks/exhaustive-deps
  const circleColor = isShowTimePicker
    ? colors[MainColorName.GRAY_BLUE]
    : colors[MainColorName.ORANGE];

  return (
    <StyledCircleProgressBarWrapper>
      <StyledCircleProgressBarContainer>
        <StyledTopCircleProgressBarWrapper>
          <HalfCircleWrapper color={circleColor} />
          <StyledAnimatedPart style={styleBottom}>
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledTopCircleProgressBarWrapper>
        <StyledBottomCircleProgressBarWrapper>
          <HalfCircleWrapper color={circleColor} />
          <StyledAnimatedPart style={styleTop}>
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledBottomCircleProgressBarWrapper>
      </StyledCircleProgressBarContainer>
      <StyledBottomCircleTextWrapper isShowTimePicker={isShowTimePicker}>
        {children}
      </StyledBottomCircleTextWrapper>
    </StyledCircleProgressBarWrapper>
  );
}
