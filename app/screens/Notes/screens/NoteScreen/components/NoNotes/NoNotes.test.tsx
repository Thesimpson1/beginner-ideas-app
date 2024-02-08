import React from 'react';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { NoNotes } from 'app/screens/Notes/screens/NoteScreen/components/NoNotes/NoNotes';

describe('No Notes', () => {
  it('Should render correct when isNoNotes = true', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <NoNotes isNoNotes={true} />
    );

    const StyledNoNotesWrapperTestID = getByTestId(
      'StyledNoNotesWrapperTestID'
    ).props;
    const StyledNoNotesTextTest = getByText('There is no notes yet');

    expect(StyledNoNotesWrapperTestID.children).toBeTruthy();
    expect(StyledNoNotesTextTest.children).toBeTruthy();
    expect(StyledNoNotesWrapperTestID.isNoNotes).toBe(true);
    expect(StyledNoNotesWrapperTestID.style.display).toBe('');
  });
  it('Should render correct when isNoNotes = false', () => {
    const { getByText } = renderWithProviders(<NoNotes isNoNotes={false} />);

    expect(() => getByText('There is no notes yet')).toThrow(
      'Unable to find an element'
    );
  });
});
