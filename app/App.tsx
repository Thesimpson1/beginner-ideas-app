/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import { ErrorBoundary } from 'app/components/ErrorBoundary/ErrorBoundary';
import { StartScreen } from 'app/screens/Authentication';
import { SplashContainer } from 'app/screens/Splash/SplashContainer';

function App(): JSX.Element {
  const [isReady, setIsReady] = useState<boolean>(false);

  const onReady = () => {
    return setTimeout(() => setIsReady(true), 3000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationContainer onReady={onReady}>
        <SplashContainer isReady={isReady}>
          <Animated.View entering={FadeIn.duration(1000)}>
            <ErrorBoundary>
              <StartScreen />
            </ErrorBoundary>
          </Animated.View>
        </SplashContainer>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Sentry.wrap(App);
