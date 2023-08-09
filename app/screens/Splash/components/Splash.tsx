import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export function Splash() {
  return (
    <View style={styles.container} testID={'SplashWrapperTestID'}>
      <LottieView
        source={require('app/assets/lottie-animated-image/splash-screen.json')}
        autoPlay
        style={styles.lottieStyle}
        loop={false}
        testID={'LottieViewTestID'}
        resizeMode={'cover'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    width: 300,
    height: 300,
  },
});
