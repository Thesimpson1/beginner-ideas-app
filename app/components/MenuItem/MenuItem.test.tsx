import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { MenuItem } from 'app/components/MenuItem/MenuItem';

describe('Menu Item', () => {
  const indexMock = 1;
  const mockTitle = 'Mock Title';
  const MockLeftIcon = () => <View testID={'MockLeftIcon'} />;
  const MockRightIcon = () => <View testID={'MockRightIcon'} />;
  const mockOnPress = jest.fn();

  it('Should render component with required props', () => {
    const { getByTestId } = render(
      <MenuItem title={mockTitle} onPress={mockOnPress} index={indexMock} />
    );

    const StyledMenuItemsWrapperTestID = getByTestId(
      'StyledMenuItemsWrapperTestID'
    );
    const StyledArrowWrapperTestID = getByTestId(
      'StyledArrowWrapperTestID'
    ).props;
    const StyledIconAndTextWrapperTestID = getByTestId(
      'StyledIconAndTextWrapperTestID'
    ).props;
    const StyledRightMenuTextTestID = getByTestId(
      'StyledRightMenuTextTestID'
    ).props;

    fireEvent.press(StyledMenuItemsWrapperTestID);

    expect(StyledMenuItemsWrapperTestID.props.style.borderBottomWidth).toBe(1);
    expect(StyledArrowWrapperTestID.children).toBeUndefined();
    expect(StyledIconAndTextWrapperTestID.children[1]).toBeUndefined();
    expect(StyledRightMenuTextTestID.children).toBe(mockTitle);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it('Should render component with changed props', () => {
    const { getByTestId } = render(
      <MenuItem
        title={mockTitle}
        onPress={mockOnPress}
        index={2}
        LeftIcon={MockLeftIcon}
        RightIcon={MockRightIcon}
      />
    );

    const StyledMenuItemsWrapperTestID = getByTestId(
      'StyledMenuItemsWrapperTestID'
    );
    const StyledArrowWrapperTestID = getByTestId(
      'StyledArrowWrapperTestID'
    ).props;
    const StyledIconAndTextWrapperTestID = getByTestId(
      'StyledIconAndTextWrapperTestID'
    ).props;
    const MockLeftIconTestID = getByTestId('MockLeftIcon').props;
    const MockRightIconTestID = getByTestId('MockRightIcon').props;

    expect(StyledMenuItemsWrapperTestID.props.style.borderBottomWidth).toBe(0);
    expect(StyledArrowWrapperTestID.children).toBeTruthy();
    expect(StyledIconAndTextWrapperTestID.children[1]).toBeTruthy();
    expect(MockLeftIconTestID).toBeTruthy();
    expect(MockRightIconTestID).toBeTruthy();
  });
});
