/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react-native';
import { persistor, store } from 'app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from 'app/components/ErrorBoundary/ErrorBoundary';
import { RootNavigator } from 'app/navigation/RootNavigator.navigator';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(App);
