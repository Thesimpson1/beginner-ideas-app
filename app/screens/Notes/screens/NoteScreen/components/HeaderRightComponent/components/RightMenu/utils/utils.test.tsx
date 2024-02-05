import React from 'react';
import { render } from '@testing-library/react-native';

import {
  getItemInfo,
  RotatedArrow,
  setAnimationOpacity,
  setLeftIcon,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/utils/utils';
import { MenuDataTypes } from 'app/screens/Notes/types';

jest.mock(
  'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/utils/utils',
  () => {
    const originalModule = jest.requireActual(
      'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/utils/utils'
    );

    return {
      __esModule: true,
      ...originalModule,
    };
  }
);

describe('RightMenu utils', () => {
  const mockIndex = 0;
  const mockType = MenuDataTypes.MAIN_MENU_DATA;
  const mockMenuOnPress = jest.fn();
  const mockTitle = 'MockTitle';
  const mockMode = 'MockMode';
  const mockChangeMode = jest.fn();
  it('getItemInfo should work correct first case', () => {
    const functionResult0 = getItemInfo({
      index: mockIndex,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
    });
    expect(functionResult0.leftIcon).toBeUndefined();

    const functionResult1 = getItemInfo({
      index: mockIndex,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: mockType,
    });
    expect(functionResult1.leftIcon).toBeUndefined();
    functionResult1.action();
    expect(mockMenuOnPress).toHaveBeenCalledTimes(1);

    const functionResult2 = getItemInfo({
      index: 1,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: mockType,
    });

    expect(functionResult2.leftIcon).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(functionResult2.leftIcon());
    const RightArrowWhiteIconTestID = getByTestId('RightArrowWhiteIconTestID');
    expect(RightArrowWhiteIconTestID).toBeTruthy();
    functionResult2.action();
    expect(mockMenuOnPress).toHaveBeenCalledTimes(2);
  });
  it('getItemInfo should work correct second case', () => {
    const functionResult3 = getItemInfo({
      index: mockIndex,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: MenuDataTypes.DATE_SORT_ITEM_DATA,
    });
    expect(functionResult3.leftIcon).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(functionResult3.leftIcon());
    const RightArrowWhiteIconTestID3 = getByTestId('RightArrowWhiteIconTestID');
    expect(RightArrowWhiteIconTestID3).toBeTruthy();
    functionResult3.action();
    expect(mockChangeMode).toHaveBeenCalledTimes(1);

    const functionResult4 = getItemInfo({
      index: 1,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: MenuDataTypes.DATE_SORT_ITEM_DATA,
    });
    expect(functionResult4.leftIcon).toBeUndefined();
    functionResult4.action();
    expect(mockChangeMode).toHaveBeenCalledTimes(2);
  });
  it('getItemInfo should work correct third case', () => {
    const functionResult5 = getItemInfo({
      index: mockIndex,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: MenuDataTypes.SORT_ITEM_DATA,
    });
    expect(functionResult5.leftIcon).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(functionResult5.leftIcon());
    const RightArrowWhiteIconTestID5 = getByTestId('RightArrowWhiteIconTestID');
    expect(RightArrowWhiteIconTestID5).toBeTruthy();
    functionResult5.action();
    expect(mockChangeMode).toHaveBeenCalledTimes(3);

    const functionResult6 = getItemInfo({
      index: 1,
      mode: mockMode,
      title: mockTitle,
      changeMode: mockChangeMode,
      menuOnPress: mockMenuOnPress,
      type: MenuDataTypes.SORT_ITEM_DATA,
    });
    expect(functionResult6.leftIcon).toBeUndefined();
    functionResult6.action();
    expect(mockChangeMode).toHaveBeenCalledTimes(4);
  });
  it('setLeftIcon should work correct', () => {
    const functionResult0 = setLeftIcon({
      mode: 'mode',
      title: 'title',
    });
    expect(functionResult0).toBeUndefined();

    const FunctionResult1 = setLeftIcon({
      mode: 'mode',
      title: 'mode',
    });
    expect(FunctionResult1).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(<FunctionResult1 />);
    const WhiteCheckMarkIconTestID = getByTestId('WhiteCheckMarkIconTestID');
    expect(WhiteCheckMarkIconTestID).toBeTruthy();
  });

  it('RotatedArrow should work correct third case', () => {
    const { getByTestId } = render(<RotatedArrow />);
    const RightArrowWhiteIconTestID5 = getByTestId('RightArrowWhiteIconTestID');
    expect(RightArrowWhiteIconTestID5).toBeTruthy();
  });

  it('setAnimationOpacity should work correct', () => {
    // case when all are false
    const functionResult0 = setAnimationOpacity({
      isShowAnimation: false,
      isShowDropdown: false,
    });
    expect(functionResult0).toBe(0);
    // case when isShowAnimation = true and  isShowDropdown = false
    const functionResult1 = setAnimationOpacity({
      isShowAnimation: true,
      isShowDropdown: false,
    });
    expect(functionResult1).toBe(1);
    // case when isShowAnimation = true and  isShowDropdown = true
    const functionResult2 = setAnimationOpacity({
      isShowAnimation: true,
      isShowDropdown: true,
    });
    expect(functionResult2).toBe(0.6);
  });
});
