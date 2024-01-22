import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { NotesStackScreenName } from 'app/types';

import { StackScreenHeader } from 'app/navigation/navigation-headers/StackScreenHeader/StackScreenHeader';

const mockedNavigate = jest.fn();
const mockedCanGoBack = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      canGoBack: mockedCanGoBack,
      goBack: mockedGoBack,
    }),
  };
});
describe('Stack Screen Header', () => {
  const mockHeaderTitle = NotesStackScreenName.NOTES;
  const MockHeaderRight = <View testID={'MockHeaderRightTestID'} />;
  const MockHeaderLeft = <View testID={'MockHeaderLeftTestID'} />;

  it('Should render component with required props', () => {
    mockedCanGoBack.mockImplementation(() => false);
    const { getByTestId } = render(
      <StackScreenHeader options={{ headerTitle: mockHeaderTitle }} />
    );

    const StyledLeftHeaderDefaultWrapperTestID = getByTestId(
      'StyledLeftHeaderDefaultWrapperTestID'
    );
    const StyledStackScreenHeaderWrapperTestID = getByTestId(
      'StyledStackScreenHeaderWrapperTestID'
    ).props;
    const StyledLeftHeaderWrapperTestID = getByTestId(
      'StyledLeftHeaderWrapperTestID'
    ).props;
    const StyledTitleHeaderTextTestID = getByTestId(
      'StyledTitleHeaderTextTestID'
    ).props;
    const StyledRightHeaderWrapperTestID = getByTestId(
      'StyledRightHeaderWrapperTestID'
    ).props;

    fireEvent.press(StyledLeftHeaderDefaultWrapperTestID);

    expect(StyledLeftHeaderDefaultWrapperTestID.props).toBeTruthy();
    expect(StyledStackScreenHeaderWrapperTestID).toBeTruthy();
    expect(StyledLeftHeaderWrapperTestID).toBeTruthy();
    expect(StyledTitleHeaderTextTestID).toBeTruthy();
    expect(StyledTitleHeaderTextTestID.children).toBe(mockHeaderTitle);
    expect(StyledRightHeaderWrapperTestID.children).toBeNull();

    //
    expect(mockedCanGoBack).toHaveBeenCalledTimes(1);
    expect(mockedGoBack).toHaveBeenCalledTimes(0);
  });
  it('Should render component correct', () => {
    mockedCanGoBack.mockImplementation(() => true);
    const { getByTestId } = render(
      <StackScreenHeader options={{ headerTitle: mockHeaderTitle }} />
    );

    const StyledLeftHeaderDefaultWrapperTestID = getByTestId(
      'StyledLeftHeaderDefaultWrapperTestID'
    );

    fireEvent.press(StyledLeftHeaderDefaultWrapperTestID);

    expect(StyledLeftHeaderDefaultWrapperTestID.props).toBeTruthy();

    expect(mockedCanGoBack).toHaveBeenCalledTimes(2);
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
  it('Should render component with changed props', () => {
    const { getByTestId } = render(
      <StackScreenHeader
        options={{
          headerTitle: mockHeaderTitle,
          headerRight: MockHeaderRight,
          headerLeft: MockHeaderLeft,
        }}
      />
    );

    const StyledLeftHeaderWrapperTestID = getByTestId(
      'StyledLeftHeaderWrapperTestID'
    ).props;
    const StyledRightHeaderWrapperTestID = getByTestId(
      'StyledRightHeaderWrapperTestID'
    ).props;
    const MockHeaderRightTestID = getByTestId('MockHeaderRightTestID').props;
    const MockHeaderLeftTestID = getByTestId('MockHeaderLeftTestID').props;

    expect(StyledLeftHeaderWrapperTestID).toBeTruthy();
    expect(MockHeaderRightTestID).toBeTruthy();
    expect(StyledRightHeaderWrapperTestID.children).toBeTruthy();
    expect(MockHeaderLeftTestID).toBeTruthy();
  });
});
