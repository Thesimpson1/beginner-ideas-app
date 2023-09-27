import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { mockInitialState } from 'app/mocks';
import { HomeStackScreenName } from 'app/types';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { HomeScreen } from 'app/screens/Home/Home';

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
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});

describe('Home screen', () => {
  it("Should render correct when user doesn't logged in", () => {
    mockInitialState.user = 'Guest';
    const screen = renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    const StyledHomeScreenContainerTestID = screen.getByTestId(
      'StyledHomeScreenContainerTestID'
    );
    const StyledUserTextTestID = screen.getByTestId('StyledUserTextTestID');
    const HomeRightButtonTestID = screen.getByTestId('HomeRightButtonTestID');
    const CalculatorIconTestID = screen.getByTestId('CalculatorIconTestID');
    const CalendarIconTestID = screen.getByTestId('CalendarIconTestID');
    const NotesIconTestID = screen.getByTestId('NoteIconTestID');
    const StyledSimpleButtonTitleTest = screen.getByTestId(
      'StyledSimpleButtonTitleTest'
    );

    expect(StyledHomeScreenContainerTestID.props.children).toBeTruthy();
    expect(StyledUserTextTestID.props.children).toBe('Guest');
    expect(StyledSimpleButtonTitleTest.props.children).toBe('Sign in');
    // @ts-ignore
    expect(CalculatorIconTestID._fiber.type).toBe('CalculatorIcon.svg');
    // @ts-ignore
    expect(CalendarIconTestID._fiber.type).toBe('CalendarIcon.svg');
    // @ts-ignore
    expect(NotesIconTestID._fiber.type).toBe('NoteIcon.svg');

    fireEvent.press(HomeRightButtonTestID);
    const StyledLoadingWrapperTestID = screen.getByTestId(
      'StyledLoadingWrapperTestID'
    );
    expect(StyledLoadingWrapperTestID.props).toBeTruthy();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'auth/getUserInfo',
    });
    mockInitialState.user = '';
  });
  it('Should render correct when user logged in', () => {
    mockInitialState.user = 'testEmail';
    const screen = renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    const StyledHomeScreenContainerTestID = screen.getByTestId(
      'StyledHomeScreenContainerTestID'
    );
    const StyledUserTextTestID = screen.getByTestId('StyledUserTextTestID');
    const HomeRightButtonTestID = screen.getByTestId('HomeRightButtonTestID');
    const StyledSimpleButtonTitleTest = screen.getByTestId(
      'StyledSimpleButtonTitleTest'
    );
    expect(StyledSimpleButtonTitleTest.props.children).toBe('Sign out');
    expect(StyledHomeScreenContainerTestID.props.children).toBeTruthy();
    expect(StyledUserTextTestID.props.children).toBe('testEmail');

    fireEvent.press(HomeRightButtonTestID);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'auth/logout',
    });
    mockInitialState.user = '';
  });
  it('Should render correct when isLogOut', () => {
    mockInitialState.isLogout = true;
    const screen = renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    const StyledLoadingWrapperTestID = screen.getByTestId(
      'StyledLoadingWrapperTestID'
    );

    expect(StyledLoadingWrapperTestID.props.children).toBeTruthy();

    mockInitialState.isLogout = false;
  });
  it('Should redirect to login', () => {
    mockInitialState.user = null;
    renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(
      HomeStackScreenName.LOGIN_FROM_HOME
    );
  });
  it('Should log out', () => {
    mockedCanGoBack.mockImplementation(() => true);
    mockInitialState.user = '';
    renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    expect(mockedCanGoBack).toHaveBeenCalledTimes(2);
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
  it('Should render correct when CanGoBack = false', () => {
    mockedCanGoBack.mockImplementation(() => false);
    mockInitialState.user = '';
    renderWithProviders(<HomeScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    expect(mockedCanGoBack).toHaveBeenCalledTimes(3);
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
  it('Should redirect to calculator ', () => {
    const screen = renderWithProviders(<HomeScreen />);
    const CardFromHomeTestID = screen.getAllByTestId('CardFromHomeTestID')[0];
    fireEvent.press(CardFromHomeTestID);
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledWith(HomeStackScreenName.CALCULATOR);
  });
});
