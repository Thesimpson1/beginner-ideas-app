import React from 'react';

import { calcWidth } from 'app/utils/scaling-system';
import {
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
  onPressTestID?: string;
}
export function RoundButton({
  onPress,
  title,
  width = 250,
  color,
  backgroundColor = colors[MainColorName.BLUE],
  isDisabled = false,
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
        testID={'StyledRoundButtonTitleTest'}
      >
        {title}
      </StyledRoundButtonTitle>
    </StyledRoundButtonWrapper>
  );
}
