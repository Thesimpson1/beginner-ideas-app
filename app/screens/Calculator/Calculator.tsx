import React, { useState } from 'react';
import { FlatList } from 'react-native';

import {
  StyledCalculatorContentContainer,
  StyledCalculatorRoundButtonText,
  StyledCalculatorScreenContainer,
  StyledVisibleNumberContainer,
} from 'app/screens/Calculator/Calculator.styled';
import { CalculatorRoundButton } from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton';
import { useGetDisplayedValue } from 'app/screens/Calculator/hooks/useGetDisplayValue';
import {
  getBackgroundColor,
  setCurrentValueInnerLogic,
} from 'app/screens/Calculator/utils/utils';

export interface RenderPropsI {
  item: string;
  index: number;
}

const calculatorData = [
  ['C', '+/-', '%', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export function CalculatorScreen() {
  const [currentValue, setCurrentValue] = useState('0');
  const { currentDisplayedValue } = useGetDisplayedValue({
    value: currentValue,
  });
  const renderItem = ({ item, index }: RenderPropsI) => {
    const backgroundColor = getBackgroundColor({ item, index });
    return (
      <CalculatorRoundButton
        text={item}
        currentValue={currentValue}
        backgroundColor={backgroundColor}
        isLong={item === '0'}
        onPress={() =>
          setCurrentValue((prevState) =>
            setCurrentValueInnerLogic({ prevState, item })
          )
        }
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
