import React, { ReactNode, useEffect } from 'react';
import {
  SharedValue,
  useSharedValue,
  withDelay,
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
import { useGetAnimatedStyle } from 'app/components/CircleProgressBar/hooks/getAnimatedStyle';
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
  const { styleLeft, styleRight } = useGetAnimatedStyle({ progress });

  useEffect(() => {
    if (isShowTimePicker && animationDuration === 0) {
      progress.value = withDelay(100, withTiming(360));
    }
  }, [isShowTimePicker, animationDuration]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <StyledCircleProgressBarWrapper
      testID={'StyledCircleProgressBarWrapperTestID'}
    >
      <StyledCircleProgressBarContainer>
        <StyledTopCircleProgressBarWrapper>
          <HalfCircleWrapper color={circleColor} />
          <StyledAnimatedPart
            style={styleRight}
            testID={'StyledAnimatedRightPartTestID'}
          >
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledTopCircleProgressBarWrapper>
        <StyledBottomCircleProgressBarWrapper>
          <HalfCircleWrapper color={circleColor} />
          <StyledAnimatedPart
            style={styleLeft}
            testID={'StyledAnimatedLeftPartTestID'}
          >
            <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
          </StyledAnimatedPart>
        </StyledBottomCircleProgressBarWrapper>
      </StyledCircleProgressBarContainer>
      <StyledBottomCircleTextWrapper
        isShowTimePicker={isShowTimePicker}
        testID={'StyledBottomCircleTextWrapperTestID'}
      >
        {children}
      </StyledBottomCircleTextWrapper>
    </StyledCircleProgressBarWrapper>
  );
}
