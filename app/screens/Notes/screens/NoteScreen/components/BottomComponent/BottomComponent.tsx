import React from 'react';
import { TouchableOpacity } from 'react-native';

import { CreateNoteIcon } from 'app/assets/icon';

import {
  StyledBottomBodyWrapper,
  StyledBottomComponentContainer,
  StyledBottomComponentText,
  StyledEmptyWrapper,
} from './BottomComponent.styled';

interface BottomComponentPropsI {
  amountOfNotes: number;
  createNote: () => void;
}
const Icon = () => <CreateNoteIcon testID={'CreateNoteIconTestID'} />;
export function BottomComponent({
  amountOfNotes,
  createNote,
}: BottomComponentPropsI) {
  return (
    <StyledBottomComponentContainer>
      <StyledEmptyWrapper />
      <StyledBottomBodyWrapper>
        <StyledBottomComponentText>{`${amountOfNotes} notes`}</StyledBottomComponentText>
        <TouchableOpacity onPress={createNote}>
          <Icon />
        </TouchableOpacity>
      </StyledBottomBodyWrapper>
    </StyledBottomComponentContainer>
  );
}
