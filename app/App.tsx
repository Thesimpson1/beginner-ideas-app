/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { StyledSplashContainer } from 'app/App.styled';
import { persistor, store } from 'app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from 'app/components/ErrorBoundary/ErrorBoundary';
import { LoginScreen } from 'app/screens/Authentication';
import { SplashContainer } from 'app/screens/Splash/SplashContainer';

function App(): JSX.Element {
  const [isReady, setIsReady] = useState<boolean>(false);

  const onReady = () => {
    return setTimeout(() => setIsReady(true), 3000);
  };

  return (
    <StyledSplashContainer>
      <ErrorBoundary>
        <NavigationContainer onReady={onReady}>
          <SplashContainer isReady={isReady}>
            <Animated.View entering={FadeIn.duration(1000)}>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <LoginScreen />
                </PersistGate>
              </Provider>
            </Animated.View>
          </SplashContainer>
        </NavigationContainer>
      </ErrorBoundary>
    </StyledSplashContainer>
  );
}

export default Sentry.wrap(App);
