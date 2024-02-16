import React from 'react';
import { MockCardItem } from 'app/mocks';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { NoteCard } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/NoteCard';

describe('Note Card', () => {
  const mockData = [MockCardItem];
  const mockOnCardPress = jest.fn();

  it('Should render correct with required props', () => {
    const { getByTestId } = renderWithProviders(
      <NoteCard
        data={mockData}
        isSearch={false}
        onCardPress={mockOnCardPress}
      />
    );

    const StyledCardContainerTestID = getByTestId(
      'StyledCardContainerTestID'
    ).props;
    const FlatListTestID = getByTestId('FlatListTestID').props;

    expect(StyledCardContainerTestID.children).toBeTruthy();
    expect(FlatListTestID.data).toBe(mockData);
  });
});
