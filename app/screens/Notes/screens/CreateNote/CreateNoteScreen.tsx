import React from 'react';
import { Text } from 'react-native';

import { StyledCreateNoteScreenContainer } from 'app/screens/Notes/screens/CreateNote/CreateNote.styled';

interface CreateNoteScreenPropsI {}

export function CreateNoteScreen({}: CreateNoteScreenPropsI) {
  return (
    <StyledCreateNoteScreenContainer>
      <Text> StyledCreateNoteScreenContainer</Text>
    </StyledCreateNoteScreenContainer>
  );
}
