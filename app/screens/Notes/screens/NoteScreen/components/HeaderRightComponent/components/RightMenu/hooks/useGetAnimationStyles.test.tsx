import { SharedValue } from 'react-native-reanimated';
import { renderHook } from '@testing-library/react-native';

import {
  MENU_HEIGHT,
  MENU_WIDTH,
  useGetAnimationStyles,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/hooks/useGetAnimationStyles';

describe('Test useGetAnimationStyles', () => {
  const isShowAnimationMock = { value: false } as SharedValue<boolean>;
  const isShowDropdownMock = { value: false } as SharedValue<boolean>;
  const rightMenuWrapperAnimatedStyleMock = {
    height: 0,
    opacity: 0,
    transform: [{ scale: 1 }],
    width: 0,
  };
  const dropdownAnimatedStyleMock = {
    height: 0,
    opacity: 0,
  };
  it('should works correct with all false', () => {
    const { result } = renderHook(() =>
      useGetAnimationStyles({
        isShowAnimation: isShowAnimationMock,
        isShowDropdown: isShowDropdownMock,
      })
    );
    const useGetAnimationStyles0 = result.current;

    expect(
      // @ts-ignore
      useGetAnimationStyles0.rightMenuWrapperAnimatedStyle.initial.value
    ).toStrictEqual(rightMenuWrapperAnimatedStyleMock);
    expect(
      // @ts-ignore
      useGetAnimationStyles0.dropdownAnimatedStyle.initial.value
    ).toStrictEqual(dropdownAnimatedStyleMock);
  });
  it('should works correct with all true', () => {
    isShowAnimationMock.value = true;
    isShowDropdownMock.value = true;
    rightMenuWrapperAnimatedStyleMock.height = MENU_HEIGHT;
    rightMenuWrapperAnimatedStyleMock.width = MENU_WIDTH;
    rightMenuWrapperAnimatedStyleMock.opacity = 0.6;
    rightMenuWrapperAnimatedStyleMock.transform[0].scale = 0.95;
    dropdownAnimatedStyleMock.height = MENU_HEIGHT;
    dropdownAnimatedStyleMock.opacity = 1;
    const { result } = renderHook(() =>
      useGetAnimationStyles({
        isShowAnimation: isShowAnimationMock,
        isShowDropdown: isShowDropdownMock,
      })
    );
    const useGetAnimationStyles0 = result.current;

    expect(
      // @ts-ignore
      useGetAnimationStyles0.rightMenuWrapperAnimatedStyle.initial.value
    ).toStrictEqual(rightMenuWrapperAnimatedStyleMock);
    expect(
      // @ts-ignore
      useGetAnimationStyles0.dropdownAnimatedStyle.initial.value
    ).toStrictEqual(dropdownAnimatedStyleMock);
    isShowAnimationMock.value = false;
    isShowDropdownMock.value = false;
    rightMenuWrapperAnimatedStyleMock.height = 0;
    rightMenuWrapperAnimatedStyleMock.width = 0;
    rightMenuWrapperAnimatedStyleMock.opacity = 0;
    rightMenuWrapperAnimatedStyleMock.transform[0].scale = 1;
    dropdownAnimatedStyleMock.height = 0;
    dropdownAnimatedStyleMock.opacity = 0;
  });
});
