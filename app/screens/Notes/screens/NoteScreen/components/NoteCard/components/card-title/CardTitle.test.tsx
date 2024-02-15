import React from 'react';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { CardTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-title/CardTitle';

describe('Card Title', () => {
  const mockTitle = 'MockTitle';
  it('Should render correct only with title', () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <CardTitle title={mockTitle} />
    );

    const StyledFlatListTitleContainerTestID = getByTestId(
      'StyledFlatListTitleContainerTestID'
    ).props;
    const FlatListTestID = getByTestId('FlatListTestID').props;
    const StyledTitleTestID = getAllByTestId('StyledTitleTestID')[0].props;

    expect(StyledFlatListTitleContainerTestID.children).toBeTruthy();
    expect(FlatListTestID.data).toStrictEqual([
      'M',
      'o',
      'c',
      'k',
      'T',
      'i',
      't',
      'l',
      'e',
    ]);
    expect(StyledTitleTestID.isHighlight).toBe(false);
    expect(StyledTitleTestID.style.color).toBe('#FFFFFF');
  });
  it('Should render correct', () => {
    const { getAllByTestId } = renderWithProviders(
      <CardTitle title={mockTitle} searchText={'M'} />
    );

    const StyledTitleTestID = getAllByTestId('StyledTitleTestID')[0].props;

    expect(StyledTitleTestID.isHighlight).toBe(true);
    expect(StyledTitleTestID.style.color).toBe('#FF9900');
  });
});
