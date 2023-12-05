import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotesStackScreenName } from 'app/types';

import { colors, MainColorName } from 'app/constants/color';
import { CreateNoteScreen } from 'app/screens/Notes/screens/CreateNote/CreateNoteScreen';
import { NotesScreen } from 'app/screens/Notes/screens/NoteScreen/Notes';

export type MainNotesParamList = {
  [NotesStackScreenName.CREATE_NOTE]: undefined;
  [NotesStackScreenName.NOTES]: undefined;
};
const Stack = createStackNavigator<MainNotesParamList>();
export const NotesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NotesStackScreenName.NOTES}
      screenOptions={{
        headerStyle: { backgroundColor: colors[MainColorName.GRAY_BLUE] },
      }}
    >
      <Stack.Screen name={NotesStackScreenName.NOTES} component={NotesScreen} />
      <Stack.Screen
        name={NotesStackScreenName.CREATE_NOTE}
        component={CreateNoteScreen}
      />
    </Stack.Navigator>
  );
};
