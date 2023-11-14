import React from 'react';
import { TouchableOpacity } from 'react-native';

import { CreateNoteIcon } from 'app/assets/icon';
import {
  StyledBottomBodyWrapper,
  StyledBottomComponentContainer,
  StyledBottomComponentText,
  StyledEmptyWrapper,
  StyledOverBottomComponent,
} from 'app/screens/Notes/components/BottomComponent/BottomComponent.styled';

interface BottomComponentPropsI {
  amountOfNotes: number;
  createNote: () => void;
  animatedStyles: { backgroundColor: string };
}
const Icon = () => <CreateNoteIcon testID={'CreateNoteIconTestID'} />;
export function BottomComponent({
  amountOfNotes,
  createNote,
  animatedStyles,
}: BottomComponentPropsI) {
  return (
    <StyledBottomComponentContainer>
      <StyledOverBottomComponent style={animatedStyles} />
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
