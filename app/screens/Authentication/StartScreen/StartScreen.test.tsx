import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { StartScreen } from 'app/screens/Authentication';

describe('Start screen', () => {
  const testText = 'Hello test';
  it('Check action from component', async () => {
    const screen = renderWithProviders(<StartScreen />);

    fireEvent.press(screen.getByTestId('ButtonTestId'));
    const userFetchStatus = await screen.getByTestId('userFetchStatus');
    expect(userFetchStatus.props.children).toBe('true');
  });
  it('Check component when redux has no data', async () => {
    const initial = {
      isFetchUserInfo: false,
      user: [],
      fetchUserInfoError: '',
    };
    const screen = renderWithProviders(<StartScreen />, {
      preloadedState: {
        auth: initial,
      },
    });

    const UserData = await screen.getByTestId('UserDataTestID');
    expect(UserData.props.children).toBe('[]');
  });
  it('Check component when redux has data', async () => {
    const initial = {
      isFetchUserInfo: false,
      user: [testText],
      fetchUserInfoError: '',
    };
    const screen = renderWithProviders(<StartScreen />, {
      preloadedState: {
        auth: initial,
      },
    });

    const UserData = await screen.getByTestId('UserDataTestID');
    expect(UserData.props.children).toBe(`["${testText}"]`);
  });
});
