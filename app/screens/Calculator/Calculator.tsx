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
interface SetOpacityI {
  text: string;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}
const setOpacity = ({ text, setIsClicked }: SetOpacityI) => {
  switch (true) {
    case text === '/': {
      return setIsClicked((prevState) => !prevState);
    }
    case text === 'X': {
      return setIsClicked((prevState) => !prevState);
    }
    case text === '-': {
      return setIsClicked((prevState) => !prevState);
    }
    case text === '+': {
      return setIsClicked((prevState) => !prevState);
    }
  }
};
export function CalculatorScreen() {
  const [isClicked, setIsClicked] = useState(false);

  const renderItem = ({ item, index }: RenderPropsI) => {
    const backgroundColor = getBackgroundColor({ item, index });
    const onPress = () => {
      setOpacity({ setIsClicked, text: item });
    };
    return (
      <CalculatorRoundButton
        text={item}
        isClicked={isClicked}
        backgroundColor={backgroundColor}
        isLong={item === '0'}
        onPress={onPress}
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
          <StyledCalculatorRoundButtonText>101</StyledCalculatorRoundButtonText>
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
