import React from 'react';
import { Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { DeleteItem } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/delete-item/DeleteItem';
import AnimatedInterpolation = Animated.AnimatedInterpolation;
import { fireEvent } from '@testing-library/react-native';
import { mockInitialNotesState, mockInitialState } from 'app/mocks';

import { calcWidth } from 'app/utils/scaling-system';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});

describe('Delete Item', () => {
  const mockInterpolate = jest.fn().mockImplementation(() => 1);
  const mockClose = jest.fn();
  const mockUserKey = 'MockUserKey';
  // @ts-ignore
  const mockDragAnimatedValue = {
    interpolate: mockInterpolate,
  } as AnimatedInterpolation<string | number>;
  // @ts-ignore
  const mockSwipeable = { close: mockClose } as Swipeable;
  const mockOpacity = {
    inputRange: [calcWidth(-60), 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  };
  const mockTranslateX = {
    inputRange: [calcWidth(-60), 0],
    outputRange: [0, calcWidth(60)],
  };
  it('Should render correct', () => {
    const { getByTestId } = renderWithProviders(
      <DeleteItem
        dragAnimatedValue={mockDragAnimatedValue}
        Swipeable={mockSwipeable}
        userKey={mockUserKey}
      />
    );

    const StyledDeleteComponentWrapperTestID = getByTestId(
      'StyledDeleteComponentWrapperTestID'
    ).props;
    const DeleteElementTestID = getByTestId('DeleteElementTestID');

    expect(StyledDeleteComponentWrapperTestID.children).toBeTruthy();
    expect(StyledDeleteComponentWrapperTestID.style.opacity).toBe(1);
    expect(
      StyledDeleteComponentWrapperTestID.style.transform[0].translateX
    ).toBe(1);
    expect(mockInterpolate).toHaveBeenCalledWith(mockOpacity);
    expect(mockInterpolate).toHaveBeenCalledWith(mockTranslateX);
    expect(mockClose).toHaveBeenCalledTimes(1);

    expect(DeleteElementTestID.props).toBeTruthy();
    fireEvent.press(DeleteElementTestID);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { key: mockUserKey, user: '' },
      type: 'notes/deleteNote',
    });
  });
  it('Should render correct with another props', () => {
    mockInitialNotesState.isOpenDeleteComponent = true;
    const { getByTestId } = renderWithProviders(
      <DeleteItem
        dragAnimatedValue={mockDragAnimatedValue}
        Swipeable={mockSwipeable}
        userKey={mockUserKey}
      />,
      {
        preloadedState: {
          notes: mockInitialNotesState,
          auth: mockInitialState,
        },
      }
    );
    const DeleteElementTestID = getByTestId('DeleteElementTestID');
    const StyledDeleteComponentWrapperTestID = getByTestId(
      'StyledDeleteComponentWrapperTestID'
    ).props;

    expect(StyledDeleteComponentWrapperTestID.style.opacity).toBe(1);
    expect(
      StyledDeleteComponentWrapperTestID.style.transform[0].translateX
    ).toBe(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockInterpolate).toHaveBeenCalledWith(mockOpacity);
    expect(mockInterpolate).toHaveBeenCalledWith(mockTranslateX);

    expect(DeleteElementTestID.props).toBeTruthy();
  });
});
