import React from 'react';

import {
  StyledCalculatorRoundButtonContainer,
  StyledCalculatorRoundButtonText,
} from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton.styled';
import { checkSigns } from 'app/screens/Calculator/utils/utils';

interface CalculatorRoundButtonI {
  text: string;
  backgroundColor?: string;
  color?: string;
  isLong?: boolean;
  onPress: () => void;
  currentValue?: string;
  testID?: string;
}

export function CalculatorRoundButton({
  text,
  backgroundColor,
  color,
  isLong = false,
  onPress,
  currentValue,
  testID = 'StyledCalculatorRoundButtonContainerTestID',
}: CalculatorRoundButtonI) {
  return (
    <StyledCalculatorRoundButtonContainer
      backgroundColor={backgroundColor}
      isLong={isLong}
      onPress={onPress}
      isClicked={currentValue === text && checkSigns({ text })}
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
