import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { BottomComponent } from 'app/screens/Notes/screens/NoteScreen/components/BottomComponent/BottomComponent';

describe('Bottom Component', () => {
  const onCreateNoteMock = jest.fn();

  it('Should render correct ', () => {
    const { getByTestId } = render(
      <BottomComponent createNote={onCreateNoteMock} amountOfNotes={5} />
    );

    const StyledBottomComponentContainerTestID = getByTestId(
      'StyledBottomComponentContainerTestID'
    ).props;
    const StyledBottomComponentTextTestID = getByTestId(
      'StyledBottomComponentTextTestID'
    );
    const TouchableOpacityTestID = getByTestId('TouchableOpacityTestID');

    expect(StyledBottomComponentContainerTestID.children).toBeTruthy();
    expect(StyledBottomComponentTextTestID.props.children).toBe('5 notes');
    expect(TouchableOpacityTestID.props.children).toBeTruthy();

    fireEvent.press(TouchableOpacityTestID);

    expect(onCreateNoteMock).toHaveBeenCalledTimes(1);
  });
  it('Should render correct with another amount of notes', () => {
    const { getByTestId } = render(
      <BottomComponent createNote={onCreateNoteMock} amountOfNotes={0} />
    );

    const StyledBottomComponentTextTestID = getByTestId(
      'StyledBottomComponentTextTestID'
    );

    expect(StyledBottomComponentTextTestID.props.children).toBe('0 notes');
  });
});
