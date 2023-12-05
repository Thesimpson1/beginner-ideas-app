import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { colors, MainColorName } from 'app/constants/color';
import { RightDoneButton } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton';
import {
  StyledCreateNoteScreenContainer,
  StyledInputWrapper,
} from 'app/screens/Notes/screens/CreateNote/CreateNote.styled';

interface CreateNoteScreenPropsI {}

export function CreateNoteScreen({}: CreateNoteScreenPropsI) {
  const [text, setText] = useState('');
  const navigation = useNavigation<StackNavigationProp<MainNotesParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => RightDoneButton({}),
    });
  }, [navigation]);
  return (
    <StyledCreateNoteScreenContainer>
      <StyledInputWrapper
        autoCorrect={false}
        value={text}
        onChangeText={setText}
        autoCapitalize={'none'}
        autoFocus={true}
        multiline={true}
        selectionColor={colors[MainColorName.ORANGE]}
      />
    </StyledCreateNoteScreenContainer>
  );
}
