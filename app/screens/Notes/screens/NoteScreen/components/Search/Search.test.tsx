import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { fireEvent } from '@testing-library/react-native';
import { MockCardItem } from 'app/mocks';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { Search } from 'app/screens/Notes/screens/NoteScreen/components/Search/Search';

describe('Right Menu Component', () => {
  const offsetMock = { value: 0 } as SharedValue<number>;
  const setIsFocusMock = jest.fn();
  const setTextMock = jest.fn();
  const mockData = [MockCardItem];
  const mockText = 'MockText';
  const mockText2 = 'MockText2';
  const setDataAfterSearchMock = jest.fn();

  it('Should render correct with required props', () => {
    const { getByTestId } = renderWithProviders(
      <Search
        setDataAfterSearch={setDataAfterSearchMock}
        data={mockData}
        text={mockText}
        isEmptyScreen={false}
        setText={setTextMock}
        offset={offsetMock}
        isRunSearchAnimation={false}
        setIsFocus={setIsFocusMock}
      />
    );

    const StyledSearchWrapperTestID = getByTestId(
      'StyledSearchWrapperTestID'
    ).props;
    const StyledSearchContainerTestID = getByTestId(
      'StyledSearchContainerTestID'
    ).props;
    const AnimatedIconTestID = getByTestId('AnimatedIconTestID').props;
    const AnimatedEmptyWrapper = getByTestId('AnimatedEmptyWrapper').props;
    const StyledEmptyWrapperInputID = getByTestId('StyledEmptyWrapperID');
    const StyledCancelWrapperTestID = getByTestId(
      'StyledCancelWrapperTestID'
    ).props;

    expect(StyledSearchWrapperTestID.children).toBeTruthy();
    expect(StyledSearchWrapperTestID.style.display).toBe('');

    expect(StyledSearchContainerTestID.animatedStyle.value.width).toBe('100%');

    expect(AnimatedIconTestID.animatedStyle.value).toStrictEqual({});
    expect(AnimatedEmptyWrapper.animatedStyle.value).toStrictEqual({});

    expect(StyledEmptyWrapperInputID.props).toBeTruthy();

    expect(StyledCancelWrapperTestID.animatedStyle.value).toStrictEqual({
      maxHeight: 0,
      opacity: 0,
      width: 0,
    });
  });
  it('Should render correct with animation true', () => {
    const { getByTestId } = renderWithProviders(
      <Search
        setDataAfterSearch={setDataAfterSearchMock}
        data={mockData}
        text={mockText}
        isEmptyScreen={false}
        setText={setTextMock}
        offset={offsetMock}
        isRunSearchAnimation={true}
        setIsFocus={setIsFocusMock}
      />
    );

    const StyledSearchContainerTestID = getByTestId(
      'StyledSearchContainerTestID'
    ).props;
    const AnimatedIconTestID = getByTestId('AnimatedIconTestID').props;
    const AnimatedEmptyWrapper = getByTestId('AnimatedEmptyWrapper').props;
    const StyledEmptyWrapperInputID = getByTestId('StyledEmptyWrapperID');
    const StyledCancelWrapperTestID = getByTestId(
      'StyledCancelWrapperTestID'
    ).props;
    const StyledSimpleButtonWrapperTest = getByTestId(
      'StyledSimpleButtonWrapperTest'
    );

    expect(StyledSearchContainerTestID.animatedStyle.value).toStrictEqual({
      maxHeight: 50,
      padding: 15,
      width: '100%',
    });

    expect(AnimatedIconTestID.animatedStyle.value.opacity).toBe(1);
    expect(AnimatedEmptyWrapper.animatedStyle.value.opacity).toBe(1);

    expect(StyledEmptyWrapperInputID.props).toBeTruthy();
    expect(StyledEmptyWrapperInputID.props.value).toBe(mockText);
    fireEvent.changeText(StyledEmptyWrapperInputID, mockText2);
    expect(setTextMock).toHaveBeenCalledWith(mockText2);

    expect(StyledCancelWrapperTestID.animatedStyle.value).toStrictEqual({
      maxHeight: 0,
      opacity: 0,
      width: 0,
    });
    //check onFocus
    fireEvent(StyledEmptyWrapperInputID, 'focus');
    expect(setIsFocusMock).toHaveBeenCalledWith(true);
    expect(AnimatedIconTestID.animatedStyle.value.opacity).toBe(1);
    expect(AnimatedEmptyWrapper.animatedStyle.value.opacity).toBe(1);
    expect(StyledSearchContainerTestID.animatedStyle.value).toStrictEqual({
      maxHeight: 50,
      padding: 15,
      width: '100%',
    });
    expect(StyledCancelWrapperTestID.animatedStyle.value).toStrictEqual({
      maxHeight: 0,
      opacity: 0,
      width: 0,
    });
    //check onBlur
    fireEvent(StyledEmptyWrapperInputID, 'blur');
    expect(setIsFocusMock).toHaveBeenLastCalledWith(false);
    expect(setTextMock).toHaveBeenLastCalledWith('');
    fireEvent.press(StyledSimpleButtonWrapperTest);
    expect(setIsFocusMock).toHaveBeenCalledTimes(2);
    expect(setTextMock).toHaveBeenCalledTimes(2);
  });
});
