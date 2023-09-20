import * as React from 'react';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';

import { LoginScreen } from 'app/screens/Authentication';
import { HomeScreen } from 'app/screens/Home/Home';

export enum MainStackScreenName {
  Home = 'Home',
  Login = 'Login',
}
export type MainStackParamList = {
  [MainStackScreenName.Home]: undefined;
  [MainStackScreenName.Login]: undefined;
};
const Stack = createStackNavigator<MainStackParamList>();
export const MainStack = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const initScreen = user
    ? MainStackScreenName.Home
    : MainStackScreenName.Login;
  return (
    <Stack.Navigator initialRouteName={initScreen}>
      <Stack.Screen
        name={MainStackScreenName.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MainStackScreenName.Home}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
