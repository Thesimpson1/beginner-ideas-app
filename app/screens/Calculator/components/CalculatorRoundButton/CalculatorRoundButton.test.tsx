import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
import { CalculatorRoundButton } from 'app/screens/Calculator/components/CalculatorRoundButton/CalculatorRoundButton';

describe('Calculator Round Button', () => {
  const testText = '10';
  const mockOnPress = jest.fn();
  const color = colors[MainColorName.RED];
  const backgroundColor = colors[MainColorName.GREEN];
  it('Should render component only with required props', () => {
    const { getByTestId } = render(
      <CalculatorRoundButton text={testText} onPress={mockOnPress} />
    );

    const StyledCalculatorRoundButtonContainerTestID = getByTestId(
      'StyledCalculatorRoundButtonContainerTestID'
    );
    const StyledCalculatorRoundButtonTextTestID = getByTestId(
      'StyledCalculatorRoundButtonTextTestID'
    ).props;

    fireEvent.press(StyledCalculatorRoundButtonContainerTestID);

    expect(StyledCalculatorRoundButtonContainerTestID.props.style.width).toBe(
      calcWidth(70)
    );
    expect(
      StyledCalculatorRoundButtonContainerTestID.props.style.backgroundColor
    ).toBe(colors[MainColorName.WHITE]);

    expect(StyledCalculatorRoundButtonTextTestID.children).toBe(testText);
    expect(StyledCalculatorRoundButtonTextTestID.style.color).toBe(
      colors[MainColorName.BLACK]
    );

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it('Should render component with props', () => {
    const { getByTestId } = render(
      <CalculatorRoundButton
        text={testText}
        onPress={mockOnPress}
        color={color}
        backgroundColor={backgroundColor}
        isLong={true}
      />
    );

    const StyledCalculatorRoundButtonTextTestID = getByTestId(
      'StyledCalculatorRoundButtonTextTestID'
    ).props;

    const StyledCalculatorRoundButtonContainerTestID = getByTestId(
      'StyledCalculatorRoundButtonContainerTestID'
    );

    fireEvent.press(StyledCalculatorRoundButtonContainerTestID);

    expect(StyledCalculatorRoundButtonContainerTestID.props.style.width).toBe(
      calcWidth(150)
    );
    expect(
      StyledCalculatorRoundButtonContainerTestID.props.style.backgroundColor
    ).toBe(backgroundColor);

    expect(StyledCalculatorRoundButtonTextTestID.children).toBe(testText);
    expect(StyledCalculatorRoundButtonTextTestID.style.color).toBe(color);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
