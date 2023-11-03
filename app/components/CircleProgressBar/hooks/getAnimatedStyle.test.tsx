import { renderHook } from '@testing-library/react-native';

import { useGetAnimatedStyle } from 'app/components/CircleProgressBar/hooks/getAnimatedStyle';
jest.mock('react-native-reanimated', () => {
  const actualNav = jest.requireActual('react-native-reanimated');
  return {
    ...actualNav,
  };
});

describe('Test useGetAnimatedStyle', () => {
  const mockProgress = { value: 0 };
  it('should render correct with shared value = 0', () => {
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('0deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('0deg');
  });
  it('should render correct with shared value = 60', () => {
    mockProgress.value = 60;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('0deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('60deg');
  });
  it('should render correct with shared value = 120', () => {
    mockProgress.value = 120;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('0deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('120deg');
  });
  it('should render correct with shared value = 180', () => {
    mockProgress.value = 180;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('0deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('180deg');
  });
  it('should render correct with shared value = 240', () => {
    mockProgress.value = 240;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('60deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('180deg');
  });
  it('should render correct with shared value = 300', () => {
    mockProgress.value = 300;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('120deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('180deg');
  });
  it('should render correct with shared value = 360', () => {
    mockProgress.value = 360;
    const { result } = renderHook(
      // @ts-ignore
      (progress: unknown) => useGetAnimatedStyle({ progress }),
      { initialProps: mockProgress }
    );
    const useGetAnimatedStyle1 = result.current;

    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleRight.initial.value.transform[1].rotate
    ).toBe('180deg');
    expect(
      // @ts-ignore
      useGetAnimatedStyle1.styleLeft.initial.value.transform[1].rotate
    ).toBe('180deg');
  });
});
