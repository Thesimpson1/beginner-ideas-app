import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';
import { MainStackScreenName } from 'app/types';

import { HomeStack } from 'app/navigation/app/HomeStack.navigator';
import { LoginScreen } from 'app/screens/Authentication';

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
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
