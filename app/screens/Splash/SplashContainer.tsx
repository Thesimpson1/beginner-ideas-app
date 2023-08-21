import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Splash } from 'app/screens/Splash/components/Splash';

type SplashContainerPropsType = {
  children: ReactNode;
  isReady: boolean;
};

export function SplashContainer({
  children,
  isReady,
}: SplashContainerPropsType) {
  return (
    <View testID={'SplashContainerTestID'} style={styles.container}>
      {isReady ? <View>{children}</View> : <Splash />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
