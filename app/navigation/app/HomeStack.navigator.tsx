import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackScreenName } from 'app/types';

import {
  MainStack,
} from 'app/navigation/app/MainStack.navigator';
import { CalculatorScreen } from 'app/screens/Calculator/Calculator';
import { CalendarScreen } from 'app/screens/Calendar/Calendar';
import { HomeScreen } from 'app/screens/Home/Home';
import { NotesScreen } from 'app/screens/Notes/Notes';

export type HomeStackParamList = {
  [HomeStackScreenName.CALCULATOR]: undefined;
  [HomeStackScreenName.NOTES]: undefined;
  [HomeStackScreenName.CALENDAR]: undefined;
  [HomeStackScreenName.HOME]: undefined;
  [HomeStackScreenName.LOGIN_FROM_HOME]: undefined;
};
const Stack = createStackNavigator<HomeStackParamList>();
export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={HomeStackScreenName.HOME}>
      <Stack.Screen
        name={HomeStackScreenName.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HomeStackScreenName.LOGIN_FROM_HOME}
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HomeStackScreenName.CALENDAR}
        component={CalendarScreen}
      />
      <Stack.Screen
        name={HomeStackScreenName.CALCULATOR}
        component={CalculatorScreen}
      />
      <Stack.Screen name={HomeStackScreenName.NOTES} component={NotesScreen} />
    </Stack.Navigator>
  );
};
