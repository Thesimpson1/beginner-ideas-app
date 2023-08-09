import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SplashContainer } from 'app/screens/Splash/SplashContainer';

describe('SplashContainer', () => {
  it('Should render splash', () => {
    const { getByTestId } = render(
      <SplashContainer isReady={false}>
        <View>
          <Text>Hello tests</Text>
        </View>
      </SplashContainer>
    );

    expect(getByTestId('LottieViewTestID').type).toBe('LottieAnimationView');

    expect(getByTestId('SplashWrapperTestID')).toBeTruthy();

    expect(getByTestId('SplashContainerTestID')).toBeTruthy();
  });
  it('Should render children', () => {
    const { getByTestId, getByText } = render(
      <SplashContainer isReady={true}>
        <View>
          <Text>Hello tests</Text>
        </View>
      </SplashContainer>
    );

    expect(getByText('Hello tests')).toBeTruthy();

    expect(getByTestId('SplashContainerTestID')).toBeTruthy();
  });
});
