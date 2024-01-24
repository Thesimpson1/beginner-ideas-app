import { renderHook } from '@testing-library/react-native';

import { useGetAnimatedStyle } from 'app/components/CircleProgressBar/hooks/getAnimatedStyle';
import { useGetAnimationData } from 'app/screens/Notes/hooks/useGetAnimationData';
jest.mock('react-native-reanimated', () => {
  const actualNav = jest.requireActual('react-native-reanimated');
  return {
    ...actualNav,
  };
});

describe('Test useGetAnimatedStyle', () => {
  const mockAmountOfCards = [1, 2, 3];
  const mockScreenSize = 150;
  it('should return true', () => {
    const { result } = renderHook(() =>
      useGetAnimationData({
        amountOfCards: mockAmountOfCards,
        screenSize: mockScreenSize,
      })
    );
    const useGetAnimationData1 = result.current;

    expect(useGetAnimationData1.isRunSearchAnimation).toBe(true);
  });
  it('should return false', () => {
    const { result } = renderHook(() =>
      useGetAnimationData({
        amountOfCards: [],
        screenSize: 400,
      })
    );
    const useGetAnimationData1 = result.current;

    expect(useGetAnimationData1.isRunSearchAnimation).toBe(false);
  });
});
