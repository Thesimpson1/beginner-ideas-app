import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { updateNote } from 'app/redux/notes/slice';
import { NotesStackScreenName } from 'app/types';

import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { colors, MainColorName } from 'app/constants/color';
import { RightDoneButton } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton';
import {
  StyledCreateNoteScreenContainer,
  StyledInputWrapper,
} from 'app/screens/Notes/screens/CreateNote/CreateNote.styled';
import { usePrepareObjectForSendToServer } from 'app/screens/Notes/screens/CreateNote/hooks/usePrepareObjectForSendToServer';

interface CreateNoteScreenPropsI {}

export function CreateNoteScreen({}: CreateNoteScreenPropsI) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const { isPushNewNote, isUpdateNote } = useAppSelector(
    (state) => state.notes
  );
  const route =
    useRoute<RouteProp<MainNotesParamList, NotesStackScreenName.CREATE_NOTE>>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<MainNotesParamList>>();
  const dataForSend = usePrepareObjectForSendToServer({ note: text, key });
  const user = useAppSelector((state) => state.auth.user);

  const onPress = () => {
    dispatch(
      updateNote({
        ...dataForSend,
        user: user ? user : '',
      })
    );
    setKey(dataForSend.key);
  };
  useEffect(() => {
    if (route?.params) {
      setText(route?.params.note);
      setKey(route?.params.key);
    }
  }, [route?.params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        RightDoneButton({
          onClickButton: onPress,
          isDisabled: dataForSend.title === '' || isPushNewNote || isUpdateNote,
        }),
    });
  }, [navigation, dataForSend]); // eslint-disable-line react-hooks/exhaustive-deps

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
