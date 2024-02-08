import React from 'react';

import {
  StyledNoNotesText,
  StyledNoNotesWrapper,
} from 'app/screens/Notes/screens/NoteScreen/components/NoNotes/NoNotes.styled';

interface NoNotesPropsI {
  isNoNotes: boolean;
}

export function NoNotes({ isNoNotes }: NoNotesPropsI) {
  return (
    <StyledNoNotesWrapper
      isNoNotes={isNoNotes}
      testID={'StyledNoNotesWrapperTestID'}
    >
      <StyledNoNotesText>There is no notes yet</StyledNoNotesText>
    </StyledNoNotesWrapper>
  );
}
