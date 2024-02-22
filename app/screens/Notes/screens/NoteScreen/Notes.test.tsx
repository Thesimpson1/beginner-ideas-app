import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  MockCardItem,
  mockInitialNotesState,
  mockInitialState,
} from 'app/mocks';

import { calcHeight } from 'app/utils/scaling-system';
import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { NotesScreen } from 'app/screens/Notes/screens/NoteScreen/Notes';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});

describe('Notes Screen', () => {
  const MockCardItem1 = { ...MockCardItem };
  MockCardItem1.key = 'MockKey1';
  MockCardItem1.date = '2024-03-12';
  it('Case with data should render correct ', () => {
    mockInitialNotesState.notes = [MockCardItem, MockCardItem1];
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <NotesScreen />,
      {
        preloadedState: {
          notes: mockInitialNotesState,
          auth: mockInitialState,
        },
      }
    );

    const StyledLeftHeaderDefaultWrapperTestID = getByTestId(
      'StyledLeftHeaderDefaultWrapperTestID'
    ).props;
    const StyledHeaderRightComponentWrapperTestID = getByTestId(
      'StyledHeaderRightComponentWrapperTestID'
    ).props;
    const StyledTimerScreenContainerTestID = getByTestId(
      'StyledTimerScreenContainerTestID'
    );
    const AnimatedIconTestID = getByTestId('AnimatedIconTestID');
    const StyledCardWithTitleWrapperTestID = getAllByTestId(
      'StyledCardWithTitleWrapperTestID'
    );
    const StyledRenderItemWrapperTestID = getAllByTestId(
      'StyledRenderItemWrapperTestID'
    )[0];
    const StyledBottomComponentTextTestID = getByTestId(
      'StyledBottomComponentTextTestID'
    );
    const TouchableOpacityTestID = getByTestId('TouchableOpacityTestID');

    expect(StyledLeftHeaderDefaultWrapperTestID).toBeTruthy();
    expect(StyledHeaderRightComponentWrapperTestID).toBeTruthy();

    expect(StyledTimerScreenContainerTestID.props).toBeTruthy();
    expect(AnimatedIconTestID.props.animatedStyle.value.opacity).toBe(1);
    fireEvent(StyledTimerScreenContainerTestID, 'layout', {
      nativeEvent: { layout: { height: 1000 } },
    });
    expect(AnimatedIconTestID.props.animatedStyle.value.opacity).toBe(1);

    expect(StyledCardWithTitleWrapperTestID[0].props.style.marginBottom).toBe(
      0
    );
    expect(StyledCardWithTitleWrapperTestID[1].props.style.marginBottom).toBe(
      calcHeight(80)
    );
    fireEvent.press(StyledRenderItemWrapperTestID);
    expect(mockedNavigate).toHaveBeenCalledWith('Create Note', {
      key: 'MockKey',
      note: 'MockNote',
    });

    expect(StyledBottomComponentTextTestID.props.children).toBe(`2 notes`);
    fireEvent.press(TouchableOpacityTestID);
    expect(mockedNavigate).toHaveBeenLastCalledWith('Create Note');

    mockInitialNotesState.notes = null;
  });
  it('Case without notes should render correct ', () => {
    const { getByTestId } = renderWithProviders(<NotesScreen />, {
      preloadedState: {
        notes: mockInitialNotesState,
        auth: mockInitialState,
      },
    });

    const StyledBottomComponentTextTestID = getByTestId(
      'StyledBottomComponentTextTestID'
    );
    const StyledNoNotesWrapperTestID = getByTestId(
      'StyledNoNotesWrapperTestID'
    );

    expect(StyledBottomComponentTextTestID.props.children).toBe(`0 notes`);

    expect(StyledNoNotesWrapperTestID.props).toBeTruthy();

    mockInitialNotesState.notes = null;
  });
  it('Case without opened the delete component should render correct ', () => {
    mockInitialNotesState.notes = [MockCardItem, MockCardItem1];
    mockInitialNotesState.isOpenDeleteComponent = true;
    const { getAllByTestId } = renderWithProviders(<NotesScreen />, {
      preloadedState: {
        notes: mockInitialNotesState,
        auth: mockInitialState,
      },
    });

    const StyledRenderItemWrapperTestID = getAllByTestId(
      'StyledRenderItemWrapperTestID'
    )[0];

    fireEvent.press(StyledRenderItemWrapperTestID);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: false,
      type: 'notes/setIsOpenDeleteComponent',
    });

    mockInitialNotesState.notes = null;
    mockInitialNotesState.isOpenDeleteComponent = false;
  });
  it('Case when mode = "By names" should render correct ', () => {
    mockInitialNotesState.notes = [MockCardItem, MockCardItem1];
    mockInitialNotesState.sortMode = 'By names';
    const { getAllByTestId, getByTestId } = renderWithProviders(
      <NotesScreen />,
      {
        preloadedState: {
          notes: mockInitialNotesState,
          auth: mockInitialState,
        },
      }
    );

    const StyledRenderItemWrapperTestID = getAllByTestId(
      'StyledRenderItemWrapperTestID'
    )[0];
    const StyledCardWithTitleWrapperTestID = getByTestId(
      'StyledCardWithTitleWrapperTestID'
    );

    fireEvent.press(StyledRenderItemWrapperTestID);
    expect(mockedNavigate).toHaveBeenCalledWith('Create Note', {
      key: 'MockKey',
      note: 'MockNote',
    });

    expect(StyledCardWithTitleWrapperTestID.props.style.marginBottom).toBe(
      calcHeight(80)
    );

    mockInitialNotesState.notes = null;
    mockInitialNotesState.sortMode = 'By creating date';
  });
});
