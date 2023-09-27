import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { mockInitialState } from 'app/mocks';
import * as formik from 'formik';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { MainStackScreenName } from 'app/navigation/app/MainStack.navigator';
import { LoginScreen } from 'app/screens/Authentication';

const mockedNavigate = jest.fn();
const mockedAddListener = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      addListener: mockedAddListener,
    }),
  };
});
describe('Login screen', () => {
  const mockError = 'mock error';
  const mockResetForm = jest.fn();
  const mockErrorObject = {
    email: mockError,
    password: mockError,
  };
  const mockTouched = {
    email: true,
    password: true,
  };
  const mockValues = {
    email: '',
    password: '',
  };
  it('Check on skip and change current', () => {
    const screen = renderWithProviders(<LoginScreen />);
    const LoginWrapperTestID = screen.getByTestId('LoginWrapperTestID');
    const OnSkipStepTestID = screen.getByTestId('OnSkipStepTestID');
    const TabsSimpleButton = screen.getAllByTestId('TabsSimpleButton')[1];
    const StyledErrorTextTest1 = screen.getAllByTestId(
      'StyledErrorTextTest'
    )[0];
    const StyledErrorTextTest2 = screen.getAllByTestId(
      'StyledErrorTextTest'
    )[1];
    const StyledLoginScreenCenterTitle = screen.getByTestId(
      'StyledLoginScreenCenterTitle'
    );
    expect(mockedAddListener).toHaveBeenCalledTimes(2);
    expect(StyledErrorTextTest1.props.children).toBeUndefined();
    expect(StyledErrorTextTest2.props.children).toBeUndefined();

    expect(LoginWrapperTestID.props.children).toBeTruthy();
    expect(StyledLoginScreenCenterTitle.props.children).toBe(
      'Create An Account'
    );

    fireEvent.press(TabsSimpleButton);

    expect(StyledLoginScreenCenterTitle.props.children).toBe('Welcome Back');
    fireEvent.press(OnSkipStepTestID);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(MainStackScreenName.Home);
    expect(mockedAddListener).toHaveBeenCalledTimes(5);
  });
  it('Check screen with exist user', async () => {
    mockInitialState.user = 'mock user';
    renderWithProviders(<LoginScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(3);
    expect(mockedNavigate).toHaveBeenCalledWith(MainStackScreenName.Home);
    mockInitialState.user = '';
  });
  it('Check reset form', async () => {
    jest.spyOn(formik, 'useFormik').mockImplementation(
      () =>
        ({
          resetForm: mockResetForm,
          handleChange: () => {},
          errors: undefined,
          values: mockValues,
          handleBlur: () => {},
          handleSubmit: () => {},
          touched: false,
        }) as never
    );
    mockInitialState.createUserError = 'error';
    mockInitialState.loginError = 'error';
    renderWithProviders(<LoginScreen />, {
      preloadedState: {
        auth: mockInitialState,
      },
    });

    expect(mockResetForm).toHaveBeenCalledTimes(2);
    mockInitialState.createUserError = '';
    mockInitialState.loginError = '';
  });
  it('Check component when error in the field', async () => {
    jest.spyOn(formik, 'useFormik').mockImplementation(
      () =>
        ({
          resetForm: mockResetForm,
          handleChange: () => {},
          errors: mockErrorObject,
          values: mockValues,
          handleBlur: () => {},
          handleSubmit: () => {},
          touched: mockTouched,
        }) as never
    );
    const screen = renderWithProviders(<LoginScreen />);
    const StyledErrorTextTest1 = screen.getAllByTestId(
      'StyledErrorTextTest'
    )[0];
    const StyledErrorTextTest2 = screen.getAllByTestId(
      'StyledErrorTextTest'
    )[1];
    expect(StyledErrorTextTest1.props.children).toBe(mockError);
    expect(StyledErrorTextTest2.props.children).toBe(mockError);
  });
});
