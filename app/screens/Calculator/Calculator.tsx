import React, { Dispatch, SetStateAction, useState } from 'react';
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

export function CalculatorScreen() {
  const [currentValue, setCurrentValue] = useState('0');

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
            {currentValue}
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
