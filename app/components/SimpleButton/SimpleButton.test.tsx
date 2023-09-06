import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { calcFontSize } from 'app/utils/scaling-system';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors } from 'app/constants/color';

describe('Simple Button', () => {
  const testTitle = 'Test title';
  const mockOnPress = jest.fn();
  const size = 25;
  const color = colors.RED;
  const isDisabled = true;
  it('Should render component', () => {
    const { getByTestId } = render(
      <SimpleButton title={testTitle} onPress={mockOnPress} />
    );

    const StyledSimpleButtonWrapperTest = getByTestId(
      'StyledSimpleButtonWrapperTest'
    );
    const StyledSimpleButtonTitleTest = getByTestId(
      'StyledSimpleButtonTitleTest'
    ).props;

    fireEvent.press(StyledSimpleButtonWrapperTest);

    expect(StyledSimpleButtonTitleTest.children).toBe(testTitle);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it('All correct works with all props ', () => {
    const { getByTestId } = render(
      <SimpleButton
        title={testTitle}
        onPress={mockOnPress}
        size={size}
        color={color}
        isDisabled={isDisabled}
      />
    );
    const StyledSimpleButtonWrapperTest = getByTestId(
      'StyledSimpleButtonWrapperTest'
    ).props;
    const StyledSimpleButtonTitleTest = getByTestId(
      'StyledSimpleButtonTitleTest'
    ).props;

    expect(StyledSimpleButtonWrapperTest.accessibilityState.disabled).toBe(
      isDisabled
    );
    expect(StyledSimpleButtonTitleTest.children).toBe(testTitle);
    expect(StyledSimpleButtonTitleTest.style.fontSize).toBe(calcFontSize(size));
    expect(StyledSimpleButtonTitleTest.style.color).toBe(color);
  });
});
