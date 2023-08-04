import React from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MainErrorIcon } from 'app/assets/icon';

type FallbackPropsType = {
  onPress: () => void;
};

export function Fallback({ onPress }: FallbackPropsType) {
  return (
    <Modal visible={true}>
      <SafeAreaView style={styles.sectionContainer}>
        <MainErrorIcon width={100} height={100} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Something went wrong!!!</Text>
          <Text style={styles.text}>Please try again later</Text>
        </View>

        <Button title={'Try again'} onPress={onPress} />
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    marginVertical: 50,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
