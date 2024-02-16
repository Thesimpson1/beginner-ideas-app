import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { mockInitialNotesState, mockInitialState } from 'app/mocks';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { CardItem } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-item/CardItem';

describe('Card Item', () => {
  const cardItemMock = {
    date: 'MockAData',
    title: 'MockTitle',
    subTitle: 'MockSubTitle',
    note: 'MockNote',
    key: 'MockKey',
  };
  const onCardPressMock = jest.fn();
  const dataMock = [cardItemMock];

  it('Should render correct with required props', () => {
    const { getByTestId } = renderWithProviders(
      <CardItem
        item={cardItemMock}
        index={0}
        onCardPress={onCardPressMock}
        data={dataMock}
        isSearch={false}
      />,
      {
        preloadedState: {
          notes: mockInitialNotesState,
          auth: mockInitialState,
        },
      }
    );
    const SwipeableComponentTestID = getByTestId('SwipeableComponentTestID');
    const StyledRenderItemWrapperTestID = getByTestId(
      'StyledRenderItemWrapperTestID'
    );
    const StyledTitleTestID = getByTestId('StyledTitleTestID');

    expect(SwipeableComponentTestID.children).toBeTruthy();
    expect(StyledRenderItemWrapperTestID.props.children).toBeTruthy();
    expect(StyledRenderItemWrapperTestID.props.style.borderBottomWidth).toBe(0);
    fireEvent.press(StyledRenderItemWrapperTestID);
    expect(onCardPressMock).toHaveBeenCalledWith({
      key: 'MockKey',
      note: 'MockNote',
    });
    expect(StyledTitleTestID.props.isSearch).toBe(false);
    expect(StyledTitleTestID.props.style.display).toBe('flex');
  });
  it('Should render correct with passed props', () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <CardItem
        item={cardItemMock}
        index={2}
        onCardPress={onCardPressMock}
        data={dataMock}
        isSearch={true}
      />,
      {
        preloadedState: {
          notes: mockInitialNotesState,
          auth: mockInitialState,
        },
      }
    );
    const SwipeableComponentTestID = getByTestId('SwipeableComponentTestID');
    const StyledRenderItemWrapperTestID = getByTestId(
      'StyledRenderItemWrapperTestID'
    );
    const StyledTitleTestID = getAllByTestId('StyledTitleTestID')[0];

    expect(SwipeableComponentTestID.children).toBeTruthy();
    expect(StyledRenderItemWrapperTestID.props.children).toBeTruthy();

    expect(StyledRenderItemWrapperTestID.props.style.borderBottomWidth).toBe(2);
    fireEvent.press(StyledRenderItemWrapperTestID);
    expect(onCardPressMock).toHaveBeenCalledWith({
      key: 'MockKey',
      note: 'MockNote',
    });
    expect(StyledTitleTestID.props.isSearch).toBe(undefined);
    expect(StyledTitleTestID.props.style.display).toBe(undefined);
  });
});
