import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackScreenName } from 'app/types';

import { MainStack } from 'app/navigation/app/MainStack.navigator';
import { NotesStack } from 'app/navigation/app/Notes.navigator';
import { colors, MainColorName } from 'app/constants/color';
import { CalculatorScreen } from 'app/screens/Calculator/Calculator';
import { CalendarScreen } from 'app/screens/Calendar/Calendar';
import { HomeScreen } from 'app/screens/Home/Home';
import { TimerScreen } from 'app/screens/Timer/Timer';

export type HomeStackParamList = {
  [HomeStackScreenName.CALCULATOR]: undefined;
  [HomeStackScreenName.NOTES]: undefined;
  [HomeStackScreenName.CALENDAR]: undefined;
  [HomeStackScreenName.HOME]: undefined;
  [HomeStackScreenName.LOGIN_FROM_HOME]: undefined;
  [HomeStackScreenName.TIMER]: undefined;
};
const Stack = createStackNavigator<HomeStackParamList>();
export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={HomeStackScreenName.HOME}
      screenOptions={{
        headerStyle: { backgroundColor: colors[MainColorName.GRAY_BLUE] },
      }}
    >
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
      <Stack.Screen name={HomeStackScreenName.TIMER} component={TimerScreen} />
      <Stack.Screen
        name={HomeStackScreenName.NOTES}
        component={NotesStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
