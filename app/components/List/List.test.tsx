import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SoundsItem } from 'app/redux/timer/slice';

import { List } from 'app/components/List/List';

describe('List component', () => {
  const mockSetCurrent = jest.fn();
  const mockData = [{ title: 'Test1' }, { title: 'Test2' }] as SoundsItem[];
  it('Should render correct without data', () => {
    const { getByTestId } = render(
      <List current={1} setCurrent={mockSetCurrent} />
    );

    const StyledListWrapperTestID = getByTestId(
      'StyledListWrapperTestID'
    ).props;
    const FlatListTestID = getByTestId('FlatListTestID');

    expect(StyledListWrapperTestID).toBeTruthy();
    expect(FlatListTestID.props).toBeTruthy();
  });
  it('Should render correct with data', () => {
    const { getByTestId, getAllByTestId } = render(
      <List current={1} setCurrent={mockSetCurrent} data={mockData} />
    );

    const StyledListWrapperTestID = getByTestId(
      'StyledListWrapperTestID'
    ).props;
    const StyledListItemWrapperTestID = getAllByTestId(
      'StyledListItemWrapperTestID'
    )[0];
    const StyledListItemIconTestID = getAllByTestId(
      'StyledListItemIconTestID'
    )[0];
    const StyledListItemIconTestID1 = getAllByTestId(
      'StyledListItemIconTestID'
    )[1];
    const TouchableOpacityTextTestID = getAllByTestId(
      'TouchableOpacityTextTestID'
    )[0];
    const StyledNotLastListItemTextWrapperTestID = getAllByTestId(
      'StyledListItemTextWrapperTestID'
    )[0];
    const StyledLastListItemTextWrapperTestID = getAllByTestId(
      'StyledListItemTextWrapperTestID'
    )[1];
    const StyledListItemTextTestID = getAllByTestId(
      'StyledListItemTextTestID'
    )[0];
    const CheckMarkIconTestID = getByTestId('CheckMarkIconTestID');

    fireEvent.press(StyledListItemIconTestID);
    expect(mockSetCurrent).toHaveBeenCalledTimes(1);
    expect(mockSetCurrent).toHaveBeenCalledWith(0);

    fireEvent.press(TouchableOpacityTextTestID);
    expect(mockSetCurrent).toHaveBeenCalledTimes(2);
    expect(mockSetCurrent).toHaveBeenCalledWith(0);

    expect(StyledListWrapperTestID).toBeTruthy();
    expect(StyledListItemWrapperTestID.props).toBeTruthy();

    expect(StyledListItemIconTestID.props.children[0]).toBe(false);
    expect(StyledListItemIconTestID1.props.children[0]).toBeTruthy();
    expect(StyledNotLastListItemTextWrapperTestID.props.isLastIndex).toBe(
      false
    );
    expect(
      StyledNotLastListItemTextWrapperTestID.props.style.borderBottomWidth
    ).toBe(1);

    expect(StyledLastListItemTextWrapperTestID.props.isLastIndex).toBe(true);
    expect(
      StyledLastListItemTextWrapperTestID.props.style.borderBottomWidth
    ).toBe(0);

    expect(StyledListItemTextTestID.props.children).toBe(mockData[0].title);
    // @ts-ignore
    expect(CheckMarkIconTestID._fiber.type).toBe('CheckMarkIcon.svg');
  });
});
