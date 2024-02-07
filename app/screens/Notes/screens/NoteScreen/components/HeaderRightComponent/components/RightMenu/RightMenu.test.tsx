import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { fireEvent } from '@testing-library/react-native';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { RightMenu } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/RightMenu';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});

describe('Right Menu Component', () => {
  const isShowAnimationMock = { value: false } as SharedValue<boolean>;
  it('Should render correct with required props', () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <RightMenu isShowAnimation={isShowAnimationMock} />
    );

    const StyledRightMenuWrapperTestID = getByTestId(
      'StyledRightMenuWrapperTestID'
    ).props;

    const StyledMenuItemsWrapperTestID = getAllByTestId(
      'StyledMenuItemsWrapperTestID'
    )[2];
    const StyledRightMenuDropdownWrapperTestID = getByTestId(
      'StyledRightMenuDropdownWrapperTestID'
    ).props;

    expect(StyledRightMenuWrapperTestID.children).toBeTruthy();
    expect(StyledRightMenuDropdownWrapperTestID.children).toBeTruthy();
    expect(StyledMenuItemsWrapperTestID.props.children).toBeTruthy();
    expect(StyledRightMenuDropdownWrapperTestID.top).toBe(-1);
    //the inner dropdown is opened
    fireEvent.press(StyledMenuItemsWrapperTestID);
    expect(StyledRightMenuDropdownWrapperTestID.top).toBe(-1);
    const StyledMenuItemsWrapperTestID1 = getAllByTestId(
      'StyledMenuItemsWrapperTestID'
    )[4];
    expect(StyledMenuItemsWrapperTestID1.children).toBeTruthy();
    //chose another mode
    fireEvent.press(StyledMenuItemsWrapperTestID1);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: 'On',
      type: 'notes/setDataSortMode',
    });
  });
  it('menuOnPress should works correct', () => {
    const { getAllByTestId } = renderWithProviders(
      <RightMenu isShowAnimation={isShowAnimationMock} />
    );

    const StyledMenuItemsWrapperTestID1 = getAllByTestId(
      'StyledMenuItemsWrapperTestID'
    )[1];
    expect(StyledMenuItemsWrapperTestID1.props.children).toBeTruthy();
    //the inner dropdown is opened
    fireEvent.press(StyledMenuItemsWrapperTestID1);

    const StyledMenuItemsWrapperTestID = getAllByTestId(
      'StyledMenuItemsWrapperTestID'
    )[0];
    const StyledMenuItemsWrapperTestID3 = getAllByTestId(
      'StyledMenuItemsWrapperTestID'
    )[3];
    expect(StyledMenuItemsWrapperTestID3.props.children).toBeTruthy();
    //the inner dropdown is closed
    fireEvent.press(StyledMenuItemsWrapperTestID);
  });
});
