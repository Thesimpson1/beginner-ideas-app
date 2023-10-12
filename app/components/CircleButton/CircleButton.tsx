import React from 'react';

import {
  StyledCircleButtonTitle,
  StyledCircleButtonWrapper,
  StyledSecondCircleButtonWrapper,
} from 'app/components/CircleButton/CircleButton.styled';
import { colors, MainColorName } from 'app/constants/color';

interface CircleButtonPropsI {
  onPress: () => void;
  title: string;
  color?: string;
  backgroundColor?: string;
  isDisabled?: boolean;
  onPressTestID?: string;
}
export function CircleButton({
  onPress,
  title,
  color,
  backgroundColor = colors[MainColorName.LIGHT_BLUE],
  isDisabled = false,
  onPressTestID = 'StyledCircleButtonWrapperTest',
}: CircleButtonPropsI) {
  return (
    <StyledCircleButtonWrapper
      onPress={onPress}
      backgroundColor={backgroundColor}
      disabled={isDisabled}
      testID={onPressTestID}
    >
      <StyledSecondCircleButtonWrapper>
        <StyledCircleButtonTitle
          color={color}
          testID={'StyledCircleButtonTitleTest'}
        >
          {title}
        </StyledCircleButtonTitle>
      </StyledSecondCircleButtonWrapper>
    </StyledCircleButtonWrapper>
  );
}
