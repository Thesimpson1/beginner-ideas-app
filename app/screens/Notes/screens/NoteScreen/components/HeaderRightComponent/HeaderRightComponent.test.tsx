import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { HeaderRightComponent } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/HeaderRightComponent';

describe('Header Right Component', () => {
  const setIsCloseRightMenuMock = jest.fn();
  const rightMenuWrapperAnimatedStyleMock = {
    height: 0,
    opacity: 0,
    transform: [{ scale: 1 }],
    width: 0,
  };
  it('Should render correct with false', () => {
    const { getByTestId } = renderWithProviders(
      <HeaderRightComponent
        isCloseRightMenu={false}
        setIsCloseRightMenu={setIsCloseRightMenuMock}
      />
    );

    const StyledHeaderRightComponentWrapperTestID = getByTestId(
      'StyledHeaderRightComponentWrapperTestID'
    ).props;

    const AnimatedTestID = getByTestId('AnimatedTestID');
    const StyledRightMenuWrapperTestID = getByTestId(
      'StyledRightMenuWrapperTestID'
    ).props;

    expect(StyledHeaderRightComponentWrapperTestID.children).toBeTruthy();
    expect(AnimatedTestID.props.animatedStyle.value.opacity).toBe(1);
    expect(StyledRightMenuWrapperTestID.children).toBeTruthy();
    expect(StyledRightMenuWrapperTestID.animatedStyle.value).toStrictEqual(
      rightMenuWrapperAnimatedStyleMock
    );
  });
  it('On press should works correct ', () => {
    const { getByTestId } = renderWithProviders(
      <HeaderRightComponent
        isCloseRightMenu={false}
        setIsCloseRightMenu={setIsCloseRightMenuMock}
      />
    );

    const StyledMenuIconTestID = getByTestId('StyledMenuIconTestID');
    fireEvent.press(StyledMenuIconTestID);
    expect(setIsCloseRightMenuMock).toHaveBeenCalledWith(false);

    const AnimatedTestID = getByTestId('AnimatedTestID');
    const StyledRightMenuWrapperTestID = getByTestId(
      'StyledRightMenuWrapperTestID'
    ).props;
    const StyledShadowModalWrapperTestID = getByTestId(
      'StyledShadowModalWrapperTestID'
    );
    expect(AnimatedTestID.props.animatedStyle.value.opacity).toBe(1);
    expect(StyledRightMenuWrapperTestID.animatedStyle.value).toStrictEqual(
      rightMenuWrapperAnimatedStyleMock
    );
    expect(StyledShadowModalWrapperTestID.props.children).toBeTruthy();
    expect(StyledShadowModalWrapperTestID.props.isVisible).toBe(true);
    fireEvent.press(StyledShadowModalWrapperTestID);
    const AnimatedTestID1 = getByTestId('AnimatedTestID');
    expect(AnimatedTestID1.props.animatedStyle.value.opacity).toBe(1);
  });
});
