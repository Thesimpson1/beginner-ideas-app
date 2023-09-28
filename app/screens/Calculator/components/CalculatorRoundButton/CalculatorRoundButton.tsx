import React from 'react';

import {
  StyledCalculatorRoundButtonContainer,
  StyledCalculatorRoundButtonText,
} from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton.styled';

interface CalculatorRoundButtonI {
  text: string;
  backgroundColor?: string;
  color?: string;
  isLong?: boolean;
  onPress: () => void;
  testID?: string;
}
export function CalculatorRoundButton({
  text,
  backgroundColor,
  color,
  isLong = false,
  onPress,
  testID = 'StyledCalculatorRoundButtonContainerTestID',
}: CalculatorRoundButtonI) {
  return (
    <StyledCalculatorRoundButtonContainer
      backgroundColor={backgroundColor}
      isLong={isLong}
      onPress={onPress}
      testID={testID}
    >
      <StyledCalculatorRoundButtonText
        color={color}
        testID={'StyledCalculatorRoundButtonTextTestID'}
      >
        {text}
      </StyledCalculatorRoundButtonText>
    </StyledCalculatorRoundButtonContainer>
  );
}
