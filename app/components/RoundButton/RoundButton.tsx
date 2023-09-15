import React from 'react';
import { ActivityIndicator } from 'react-native';

import {
  StyledActivityIndicatorWrapper,
  StyledRoundButtonTitle,
  StyledRoundButtonWrapper,
} from 'app/components/RoundButton/RoundButton.styled';
import { colors, MainColorName } from 'app/constants/color';

interface SimpleButtonPropsI {
  onPress: () => void;
  title: string;
  width?: number;
  color?: string;
  backgroundColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPressTestID?: string;
}
export function RoundButton({
  onPress,
  title,
  width = 250,
  color,
  backgroundColor = colors[MainColorName.BLUE],
  isDisabled = false,
  isLoading = false,
  onPressTestID = 'StyledRoundButtonWrapperTest',
}: SimpleButtonPropsI) {
  return (
    <StyledRoundButtonWrapper
      onPress={onPress}
      width={width}
      backgroundColor={backgroundColor}
      disabled={isDisabled}
      testID={onPressTestID}
    >
      <StyledRoundButtonTitle
        color={color}
        isLoading={isLoading}
        testID={'StyledRoundButtonTitleTest'}
      >
        {title}
      </StyledRoundButtonTitle>
      <StyledActivityIndicatorWrapper
        isLoading={isLoading}
        testID={'StyledActivityIndicatorWrapperTest'}
      >
        <ActivityIndicator
          color={colors[MainColorName.WHITE]}
          size={'large'}
          testID={'ActivityIndicatorTest'}
        />
      </StyledActivityIndicatorWrapper>
    </StyledRoundButtonWrapper>
  );
}
