import { useMemo } from 'react';

import { calcHeight } from 'app/utils/scaling-system';
interface useGetAnimationDataI {
  amountOfCards: Array<number>;
  screenSize: number;
}
export const SEARCH_HEIGHT = calcHeight(30) + 50;
export const BOTTOM_HEIGHT = calcHeight(60);
export const NOTE_TITLE = calcHeight(35);
export const NOTE_CART = calcHeight(52);
export const useGetAnimationData = ({
  amountOfCards,
  screenSize,
}: useGetAnimationDataI) => {
  const isRunSearchAnimation = useMemo(() => {
    const sizeOfBody =
      amountOfCards.reduce((accumulator, current) => accumulator + current, 0) *
        NOTE_CART +
      amountOfCards.length * NOTE_TITLE;
    const availableSize = screenSize - SEARCH_HEIGHT - BOTTOM_HEIGHT;
    return availableSize < sizeOfBody;
  }, [amountOfCards, screenSize]);
  return { isRunSearchAnimation };
};
