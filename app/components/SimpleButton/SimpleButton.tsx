import React from 'react';

import {
  StyledSimpleButtonTitle,
  StyledSimpleButtonWrapper,
} from 'app/components/SimpleButton/SimpleButton.styled';

interface SimpleButtonPropsI {
  onPress?: () => void;
  title: string;
  size?: number;
  color?: string;
  isDisabled?: boolean;
  onPressTestID?: string;
}
export function SimpleButton({
  onPress,
  title,
  size,
  color,
  isDisabled = false,
  onPressTestID = 'StyledSimpleButtonWrapperTest',
}: SimpleButtonPropsI) {
  return (
    <StyledSimpleButtonWrapper
      onPress={onPress}
      disabled={isDisabled || !onPress}
      testID={onPressTestID}
    >
      <StyledSimpleButtonTitle
        fontSize={size}
        color={color}
        testID={'StyledSimpleButtonTitleTest'}
      >
        {title}
      </StyledSimpleButtonTitle>
    </StyledSimpleButtonWrapper>
  );
}
