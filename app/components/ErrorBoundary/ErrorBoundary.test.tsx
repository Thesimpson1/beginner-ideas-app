import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { fireEvent, render } from '@testing-library/react-native';

import { ErrorBoundary } from 'app/components/ErrorBoundary/ErrorBoundary';

jest.mock('react-native-restart', () => {
  return {
    Restart: jest.fn(),
  };
});

const MOCK_ERROR = new Error('ThrowingComponent Error');
function ThrowingComponent() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw MOCK_ERROR;
  }
  const onPress = () => setHasError(true);
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>Show Error</Text>
      </TouchableOpacity>
    </View>
  );
}

describe('ErrorBoundary', () => {
  it("Should render children if an error didn't occur", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(getByText('Show Error')).toBeTruthy();
  });

  it('Should an error page if an error occurred', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    fireEvent.press(getByText('Show Error'));

    expect(getByText('Something went wrong!!!')).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('Should allow recovering from an error', () => {
    const restartSpy = jest.fn();
    jest.spyOn(RNRestart, 'Restart').mockImplementation(restartSpy);

    const { getByText } = render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    fireEvent.press(getByText('Show Error'));

    fireEvent.press(getByText('Try again'));

    expect(getByText('Show Error')).toBeTruthy();
    expect(restartSpy).toHaveBeenCalledTimes(1);
  });
});
