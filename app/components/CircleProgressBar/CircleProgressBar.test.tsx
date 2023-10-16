import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { CircleButton } from 'app/components/CircleButton/CircleButton';
import { colors, MainColorName } from 'app/constants/color';

describe('Circle Button', () => {
  const testTitle = 'Test title';
  const mockOnPress = jest.fn();
  const color = colors.RED;
  const backgroundColor = colors[MainColorName.GREEN];
  const isDisabled = true;
  it('Should render component with required props', () => {
    const { getByTestId } = render(
      <CircleButton title={testTitle} onPress={mockOnPress} />
    );

    const StyledRoundButtonWrapperTest = getByTestId(
      'StyledCircleButtonWrapperTest'
    );
    const StyledRoundButtonTitleTest = getByTestId(
      'StyledCircleButtonTitleTest'
    ).props;

    fireEvent.press(StyledRoundButtonWrapperTest);

    expect(StyledRoundButtonWrapperTest.props.accessibilityState.disabled).toBe(
      false
    );
    expect(StyledRoundButtonWrapperTest.props.style.backgroundColor).toBe(
      colors[MainColorName.LIGHT_BLUE]
    );

    expect(StyledRoundButtonTitleTest.children).toBe(testTitle);
    expect(StyledRoundButtonTitleTest.style.color).toBe(colors.WHITE);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it('All correct works with all props ', () => {
    const { getByTestId } = render(
      <CircleButton
        title={testTitle}
        onPress={mockOnPress}
        color={color}
        backgroundColor={backgroundColor}
        isDisabled={isDisabled}
      />
    );
    const StyledRoundButtonWrapperTest = getByTestId(
      'StyledCircleButtonWrapperTest'
    ).props;
    const StyledRoundButtonTitleTest = getByTestId(
      'StyledCircleButtonTitleTest'
    ).props;

    expect(StyledRoundButtonWrapperTest.style.backgroundColor).toBe(
      backgroundColor
    );
    expect(StyledRoundButtonWrapperTest.accessibilityState.disabled).toBe(
      isDisabled
    );

    expect(StyledRoundButtonTitleTest.children).toBe(testTitle);
    expect(StyledRoundButtonTitleTest.style.color).toBe(color);
  });
});
