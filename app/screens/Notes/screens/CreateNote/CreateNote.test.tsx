import React from 'react';
import { mockInitialNotesState, mockInitialState } from 'app/mocks';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { CreateNoteScreen } from 'app/screens/Notes/screens/CreateNote/CreateNoteScreen';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: { note: 'MockNote', key: '' },
    }),
  };
});

describe('Create note screen', () => {
  mockInitialState.user = 'Mock User';
  mockInitialNotesState.notes = [
    { date: 'sd', title: 'TestsTitle', subTitle: 'sd', note: 'sds', key: 'sd' },
  ];

  it('Should render correct with default props', async () => {
    const screen = renderWithProviders(<CreateNoteScreen />, {
      preloadedState: {
        notes: mockInitialNotesState,
        auth: mockInitialState,
      },
    });
    // jest.useFakeTimers();
    const StyledCreateNoteScreenContainerTestID = screen.getByTestId(
      'StyledCreateNoteScreenContainerTestID'
    );
    const StyledInputWrapperTestID = screen.getByTestId(
      'StyledInputWrapperTestID'
    );
    const StyledStackScreenHeaderWrapperTestID = screen.getByTestId(
      'StyledStackScreenHeaderWrapperTestID'
    );
    const StyledRightDoneButtonWrapperTestID = screen.getByTestId(
      'StyledRightDoneButtonWrapperTestID'
    );
    const StyledSimpleButtonWrapperTest = screen.getAllByTestId(
      'StyledSimpleButtonWrapperTest'
    );

    expect(StyledCreateNoteScreenContainerTestID.props.children).toBeTruthy();
    expect(StyledInputWrapperTestID.props).toBeTruthy();
    expect(StyledStackScreenHeaderWrapperTestID.props).toBeTruthy();
    expect(StyledRightDoneButtonWrapperTestID.props).toBeTruthy();
    expect(StyledSimpleButtonWrapperTest[0].props).toBeTruthy();

    expect(
      StyledSimpleButtonWrapperTest[0].props.accessibilityState.disabled
    ).toBe(true);
  });
  it('Should render correct with isPushNewNote = true', async () => {
    mockInitialNotesState.isPushNewNote = true;
    const screen = renderWithProviders(<CreateNoteScreen />, {
      preloadedState: {
        notes: mockInitialNotesState,
        auth: mockInitialState,
      },
    });
    const StyledSimpleButtonWrapperTest = screen.getAllByTestId(
      'StyledSimpleButtonWrapperTest'
    );
    expect(StyledSimpleButtonWrapperTest[0].props).toBeTruthy();
    expect(
      StyledSimpleButtonWrapperTest[0].props.accessibilityState.disabled
    ).toBe(true);
    mockInitialNotesState.isPushNewNote = false;
  });
  it('Should render correct with isUpdateNote = true', async () => {
    mockInitialNotesState.isUpdateNote = true;
    const screen = renderWithProviders(<CreateNoteScreen />, {
      preloadedState: {
        notes: mockInitialNotesState,
        auth: mockInitialState,
      },
    });
    const StyledSimpleButtonWrapperTest = screen.getAllByTestId(
      'StyledSimpleButtonWrapperTest'
    );

    expect(
      StyledSimpleButtonWrapperTest[0].props.accessibilityState.disabled
    ).toBe(true);
    expect(StyledSimpleButtonWrapperTest[0].props).toBeTruthy();
    mockInitialNotesState.isPushNewNote = false;
  });
});
