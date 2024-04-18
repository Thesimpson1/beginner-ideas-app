import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/redux/hooks';
import { NotesStackScreenName } from 'app/types';

import { StyledMainWrapper } from 'app/utils/common-styled-components';
import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { StackScreenHeader } from 'app/navigation/navigation-headers/StackScreenHeader/StackScreenHeader';
import { colors, MainColorName } from 'app/constants/color';
import { RightDoneButton } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton';
import {
  StyledInputWrapper,
} from 'app/screens/Notes/screens/CreateNote/CreateNote.styled';
import { useGetNoteLogicAndInfo } from 'app/screens/Notes/screens/CreateNote/hooks/useGetNoteLogicAndInfo';

export function CreateNoteScreen() {
  const [text, setText] = useState('');

  const { isPushNewNote, isUpdateNote } = useAppSelector(
    (state) => state.notes
  );
  const route =
    useRoute<RouteProp<MainNotesParamList, NotesStackScreenName.CREATE_NOTE>>();

  const user = useAppSelector((state) => state.auth.user);
  const { onPress, dataForSend } = useGetNoteLogicAndInfo({
    route,
    setText,
    user,
    text,
  });

  return (
    <>
      <StackScreenHeader
        options={{
          headerTitle: NotesStackScreenName.NOTES,
          headerRight: RightDoneButton({
            onClickButton: onPress,
            isDisabled:
              dataForSend.title === '' || isPushNewNote || isUpdateNote,
          }),
        }}
      />
      <StyledMainWrapper testID={'StyledCreateNoteScreenContainerTestID'}>
        <StyledInputWrapper
          autoCorrect={false}
          value={text}
          testID={'StyledInputWrapperTestID'}
          onChangeText={setText}
          autoCapitalize={'none'}
          autoFocus={true}
          multiline={true}
          selectionColor={colors[MainColorName.ORANGE]}
        />
      </StyledMainWrapper>
    </>
  );
}
