import { SharedValue } from 'react-native-reanimated';
import { renderHook } from '@testing-library/react-native';

import { useGetAnimatedStyles } from 'app/screens/Notes/screens/NoteScreen/components/Search/hooks/useGetAnimatedStyles';

interface mockInitial {
  initial: {
    value: {
      opacity?: number;
      maxHeight?: number;
      padding?: number;
      width?: number;
    };
  };
}
const mockWithTiming = jest.fn().mockImplementation((value) => value);
jest.mock('react-native-reanimated', () => {
  const actualNav = jest.requireActual('react-native-reanimated');
  return {
    ...actualNav,
    withTiming: (value: number, duration: { duration: number }) =>
      mockWithTiming(value, duration),
  };
});
describe('Test useGetAnimationStyles', () => {
  const offsetMock = { value: 0 } as SharedValue<number>;
  const searchWidthMock = { value: 'MockSearchWidth' } as SharedValue<string>;
  const cancelButtonWidthMock = { value: 100 } as SharedValue<number>;
  const cancelButtonHeightMock = { value: 100 } as SharedValue<number>;
  const cancelButtonOpacity = { value: 1 } as SharedValue<number>;
  const isBlurMock = { value: false } as SharedValue<boolean>;

  it('should works correct', () => {
    const { result } = renderHook(() =>
      useGetAnimatedStyles({
        offset: offsetMock,
        isBlur: isBlurMock,
        searchWidth: searchWidthMock,
        cancelButtonWidth: cancelButtonWidthMock,
        cancelButtonOpacity: cancelButtonOpacity,
        cancelButtonHeight: cancelButtonHeightMock,
      })
    );
    // @ts-ignore
    const useGetAnimationStyles0: {
      textAnimatedStyle: mockInitial;
      wrapperAnimatedStyle: mockInitial;
      searchWidthAnimatedStyle: mockInitial;
      cancelButtonWidthAnimatedStyle: mockInitial;
    } = result.current;

    expect(useGetAnimationStyles0.textAnimatedStyle.initial.value.opacity).toBe(
      1
    );

    expect(
      useGetAnimationStyles0.wrapperAnimatedStyle.initial.value.maxHeight
    ).toBe(50);
    expect(
      useGetAnimationStyles0.wrapperAnimatedStyle.initial.value.padding
    ).toBe(15);
    expect(
      useGetAnimationStyles0.wrapperAnimatedStyle.initial.value.width
    ).toBe('100%');

    expect(
      useGetAnimationStyles0.searchWidthAnimatedStyle.initial.value.width
    ).toBe('MockSearchWidth');
    expect(
      useGetAnimationStyles0.cancelButtonWidthAnimatedStyle.initial.value
        .maxHeight
    ).toStrictEqual(100);
    expect(
      useGetAnimationStyles0.cancelButtonWidthAnimatedStyle.initial.value
        .opacity
    ).toStrictEqual(1);
    expect(
      useGetAnimationStyles0.cancelButtonWidthAnimatedStyle.initial.value.width
    ).toStrictEqual(100);
    expect(mockWithTiming).toHaveBeenLastCalledWith(1, { duration: 2000 });
  });
  it('should works correct with isBlur = true', () => {
    isBlurMock.value = true;
    renderHook(() =>
      useGetAnimatedStyles({
        offset: offsetMock,
        isBlur: isBlurMock,
        searchWidth: searchWidthMock,
        cancelButtonWidth: cancelButtonWidthMock,
        cancelButtonOpacity: cancelButtonOpacity,
        cancelButtonHeight: cancelButtonHeightMock,
      })
    );
    expect(mockWithTiming).toHaveBeenLastCalledWith(1, { duration: 100 });
  });
});
