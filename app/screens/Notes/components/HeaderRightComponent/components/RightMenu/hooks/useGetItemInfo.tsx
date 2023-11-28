import React from 'react';
import { useAppSelector } from 'app/redux/hooks';

import { RightArrowWhiteIcon } from 'app/assets/icon';
import { StyledRotatedArrowWrapper } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';
import { setLeftIcon } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/utils/utils';
import { MenuDataTypes } from 'app/screens/Notes/types';
interface UseGetItemInfoI {
  index: number;
  type?: MenuDataTypes;
  menuOnPress: () => void;
  title: string;
}

const RotatedArrow = () => (
  <StyledRotatedArrowWrapper>
    <RightArrowWhiteIcon testID={'RightArrowWhiteIconTestID'} />
  </StyledRotatedArrowWrapper>
);
export const useGetItemInfo = ({
  index,
  type = MenuDataTypes.MAIN_MENU_DATA,
  menuOnPress,
  title,
}: UseGetItemInfoI) => {
  const sortMode = useAppSelector((state) => state.notes.sortMode);
  const dateSortMode = useAppSelector((state) => state.notes.dataSortMode);
  let action = () => {};
  let leftIcon;

  switch (true) {
    case MenuDataTypes.MAIN_MENU_DATA === type: {
      action = menuOnPress;
      leftIcon =
        index !== 0
          ? () => <RightArrowWhiteIcon testID={'RightArrowWhiteIconTestID'} />
          : undefined;
      break;
    }
    case MenuDataTypes.DATE_SORT_ITEM_DATA === type: {
      if (index === 0) {
        leftIcon = RotatedArrow;
      } else {
        leftIcon = setLeftIcon({ mode: dateSortMode, title });
      }
      break;
    }
    case MenuDataTypes.SORT_ITEM_DATA === type: {
      if (index === 0) {
        leftIcon = RotatedArrow;
      } else {
        leftIcon = setLeftIcon({ mode: sortMode, title });
      }
      break;
    }
  }

  return { action, leftIcon };
};
