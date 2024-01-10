import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { RightDoneButton } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton';

describe('Right Done Button', () => {
  const onClickButtonMock = jest.fn();

  it('Should render correct ', () => {
    const { getByTestId } = render(
      <RightDoneButton onClickButton={onClickButtonMock} isDisabled={false} />
    );

    const StyledRightDoneButtonWrapperTestID = getByTestId(
      'StyledRightDoneButtonWrapperTestID'
    ).props;

    const StyledSimpleButtonWrapperTest = getByTestId(
      'StyledSimpleButtonWrapperTest'
    );

    expect(StyledRightDoneButtonWrapperTestID.children).toBeTruthy();
    expect(StyledSimpleButtonWrapperTest.props.children).toBeTruthy();

    expect(
      StyledSimpleButtonWrapperTest.props.accessibilityState.disabled
    ).toBe(false);

    fireEvent.press(StyledSimpleButtonWrapperTest);

    expect(onClickButtonMock).toHaveBeenCalledTimes(1);
  });
  it('Should render correct with disabled true', () => {
    const { getByTestId } = render(
      <RightDoneButton onClickButton={onClickButtonMock} isDisabled={true} />
    );

    const StyledRightDoneButtonWrapperTestID = getByTestId(
      'StyledRightDoneButtonWrapperTestID'
    ).props;

    const StyledSimpleButtonWrapperTest = getByTestId(
      'StyledSimpleButtonWrapperTest'
    );

    expect(StyledRightDoneButtonWrapperTestID.children).toBeTruthy();
    expect(StyledSimpleButtonWrapperTest.props.children).toBeTruthy();

    expect(
      StyledSimpleButtonWrapperTest.props.accessibilityState.disabled
    ).toBe(true);

    fireEvent.press(StyledSimpleButtonWrapperTest);

    expect(onClickButtonMock).toHaveBeenCalledTimes(1);
  });
});
