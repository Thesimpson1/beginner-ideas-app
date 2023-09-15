import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { calcWidth } from 'app/utils/scaling-system';
import { RoundButton } from 'app/components/RoundButton/RoundButton';
import { colors, MainColorName } from 'app/constants/color';

describe('Simple Button', () => {
  const testTitle = 'Test title';
  const mockOnPress = jest.fn();
  const width = 25;
  const color = colors.RED;
  const backgroundColor = colors[MainColorName.GREEN];
  const isDisabled = true;
  it('Should render component with required props', () => {
    const { getByTestId } = render(
      <RoundButton title={testTitle} onPress={mockOnPress} />
    );

    const StyledRoundButtonWrapperTest = getByTestId(
      'StyledRoundButtonWrapperTest'
    );
    const StyledRoundButtonTitleTest = getByTestId(
      'StyledRoundButtonTitleTest'
    ).props;

    fireEvent.press(StyledRoundButtonWrapperTest);

    expect(StyledRoundButtonWrapperTest.props.style.width).toBe(calcWidth(250));
    expect(StyledRoundButtonWrapperTest.props.style.backgroundColor).toBe(
      colors[MainColorName.BLUE]
    );
    expect(StyledRoundButtonWrapperTest.props.accessibilityState.disabled).toBe(
      false
    );

    expect(StyledRoundButtonTitleTest.children).toBe(testTitle);
    expect(StyledRoundButtonTitleTest.style.color).toBe(colors.WHITE);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it('All correct works with all props ', () => {
    const { getByTestId } = render(
      <RoundButton
        title={testTitle}
        onPress={mockOnPress}
        color={color}
        width={width}
        backgroundColor={backgroundColor}
        isDisabled={isDisabled}
      />
    );
    const StyledRoundButtonWrapperTest = getByTestId(
      'StyledRoundButtonWrapperTest'
    ).props;
    const StyledRoundButtonTitleTest = getByTestId(
      'StyledRoundButtonTitleTest'
    ).props;

    expect(StyledRoundButtonWrapperTest.style.width).toBe(calcWidth(25));
    expect(StyledRoundButtonWrapperTest.style.backgroundColor).toBe(
      backgroundColor
    );
    expect(StyledRoundButtonWrapperTest.accessibilityState.disabled).toBe(
      isDisabled
    );

    expect(StyledRoundButtonTitleTest.children).toBe(testTitle);
    expect(StyledRoundButtonTitleTest.style.color).toBe(color);
  });
  it('Should display loading state', () => {
    const { getByTestId } = render(
      <RoundButton title={testTitle} onPress={mockOnPress} isLoading={true} />
    );

    const StyledActivityIndicatorWrapperTest = getByTestId(
      'StyledActivityIndicatorWrapperTest'
    ).props;
    const ActivityIndicatorTest = getByTestId('ActivityIndicatorTest').props;

    expect(StyledActivityIndicatorWrapperTest.children).toBeTruthy();
    expect(ActivityIndicatorTest.color).toBe(colors[MainColorName.WHITE]);
    expect(ActivityIndicatorTest.size).toBe('large');
  });
});
