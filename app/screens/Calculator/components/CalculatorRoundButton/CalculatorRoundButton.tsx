import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  StyledCalculatorRoundButtonContainer,
  StyledCalculatorRoundButtonText,
} from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton.styled';

interface CalculatorRoundButtonI {
  text: string;
  backgroundColor?: string;
  color?: string;
  isLong?: boolean;
  onPress: Dispatch<SetStateAction<string>>;
  currentValue?: string;
  testID?: string;
}
interface CheckIsClickedI {
  text: string;
}
const checkSigns = ({ text }: CheckIsClickedI) => {
  let isRightSign = false;
  switch (true) {
    case text === '/': {
      return (isRightSign = true);
    }
    case text === 'X': {
      return (isRightSign = true);
    }
    case text === '-': {
      return (isRightSign = true);
    }
    case text === '+': {
      return (isRightSign = true);
    }
  }
  return isRightSign;
};
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
      onPress={() =>
        onPress((prevState) => {
          if (prevState !== text) {
            return text;
          } else {
            return '';
          }
        })
      }
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
