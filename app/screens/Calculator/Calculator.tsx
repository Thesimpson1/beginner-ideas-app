import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import {
  StyledCalculatorContentContainer,
  StyledCalculatorRoundButtonText,
  StyledCalculatorScreenContainer,
  StyledVisibleNumberContainer,
} from 'app/screens/Calculator/Calculator.styled';
import { CalculatorRoundButton } from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton';
import { getBackgroundColor } from 'app/screens/Calculator/utils/utils';

export interface RenderPropsI {
  item: string;
  index: number;
}

const calculatorData = [
  ['C', '+/-', '%', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '='],
];
interface SetDisplayedValueI {
  value: string;
  setCurrentDisplayedValue: Dispatch<SetStateAction<string>>;
  currentDisplayedValue: string;
  setPrevDisplayedValue: Dispatch<SetStateAction<string>>;
  prevDisplayedValue: string;
  existSign: string;
  setExistSign: Dispatch<SetStateAction<string>>;
  existPrevSign: string;
  setExistPrevSign: Dispatch<SetStateAction<string>>;
}
interface SetCalculatedValueI {
  sign: string;
  prevValue: string;
  currentValue: string;
}
const setCalculatedValue = ({
  sign,
  prevValue,
  currentValue,
}: SetCalculatedValueI): string => {
  let calculatedValue = 0;
  switch (true) {
    case sign === '-': {
      calculatedValue = +prevValue - +currentValue;
      break;
    }
    case sign === '+': {
      calculatedValue = +prevValue + +currentValue;
      break;
    }
  }
  return calculatedValue + '';
};
const setDisplayedValue = ({
  value,
  setCurrentDisplayedValue,
  setPrevDisplayedValue,
  prevDisplayedValue,
  currentDisplayedValue,
  setExistSign,
  existSign,
  setExistPrevSign,
  existPrevSign,
}: SetDisplayedValueI) => {
  if (isFinite(+value)) {
    setCurrentDisplayedValue(value);
  } else {
    if (!existSign) {
      setExistSign(value);
      setPrevDisplayedValue(currentDisplayedValue);
    } else {
      const calculatedValue = setCalculatedValue({
        sign: existSign,
        prevValue: prevDisplayedValue,
        currentValue: currentDisplayedValue,
      });
      if (value === '=') {
        setExistSign('');
      } else {
        setExistSign(value);
      }
      setPrevDisplayedValue(calculatedValue);
      setCurrentDisplayedValue(calculatedValue);
    }

    // if (value !== '') {
    //
    // }
    // setCurrentDisplayedValue('');
  }
};
export function CalculatorScreen() {
  const [currentValue, setCurrentValue] = useState('0');
  const [currentDisplayedValue, setCurrentDisplayedValue] = useState('0');
  const [prevDisplayedValue, setPrevDisplayedValue] = useState('');
  const [existSign, setExistSign] = useState('');
  const [existPrevSign, setExistPrevSign] = useState('');
  useEffect(() => {
    setDisplayedValue({
      value: currentValue,
      setCurrentDisplayedValue,
      setPrevDisplayedValue,
      prevDisplayedValue,
      currentDisplayedValue,
      setExistSign,
      existSign,
      setExistPrevSign,
      existPrevSign,
    });
  }, [currentValue]);
  console.log('111', prevDisplayedValue);
  const renderItem = ({ item, index }: RenderPropsI) => {
    const backgroundColor = getBackgroundColor({ item, index });
    const onPress = () => {
      // setOpacity({ setIsClicked, text: item });
    };
    return (
      <CalculatorRoundButton
        text={item}
        currentValue={currentValue}
        backgroundColor={backgroundColor}
        isLong={item === '0'}
        onPress={setCurrentValue}
        key={item.toString()}
      />
    );
  };
  const renderItemWrapper = ({ item }: { item: Array<string> }) => {
    return (
      <FlatList
        data={item}
        renderItem={renderItem}
        horizontal={true}
        scrollEnabled={false}
        key={item.toString()}
      />
    );
  };
  return (
    <StyledCalculatorScreenContainer>
      <StyledCalculatorContentContainer>
        <StyledVisibleNumberContainer>
          <StyledCalculatorRoundButtonText>
            {currentDisplayedValue}
          </StyledCalculatorRoundButtonText>
        </StyledVisibleNumberContainer>
        <FlatList
          data={calculatorData}
          renderItem={renderItemWrapper}
          scrollEnabled={false}
        />
      </StyledCalculatorContentContainer>
    </StyledCalculatorScreenContainer>
  );
}
