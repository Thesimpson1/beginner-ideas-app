import React from 'react';

import { RightArrowWhiteIcon, WhiteCheckMarkIcon } from 'app/assets/icon';
import { StyledRotatedArrowWrapper } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';
import { MenuDataTypes } from 'app/screens/Notes/types';

interface SetLeftIconI {
  mode: string;
  title: string;
}
interface UseGetItemInfoI {
  index: number;
  type?: MenuDataTypes;
  menuOnPress: () => void;
  title: string;
  mode: string;
  changeMode: () => void;
}
export const setLeftIcon = ({ mode, title }: SetLeftIconI) => {
  if (mode === title) {
    return () => <WhiteCheckMarkIcon testID={'WhiteCheckMarkIconTestID'} />;
  }
};
//getItemInfo helper
export const RotatedArrow = () => (
  <StyledRotatedArrowWrapper>
    <RightArrowWhiteIcon testID={'RightArrowWhiteIconTestID'} />
  </StyledRotatedArrowWrapper>
);
//get items info
export const getItemInfo = ({
  index,
  type,
  menuOnPress,
  title,
  mode,
  changeMode,
}: UseGetItemInfoI) => {
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
      action = changeMode;
      if (index === 0) {
        leftIcon = RotatedArrow;
      } else {
        leftIcon = setLeftIcon({ mode, title });
      }

      break;
    }
    case MenuDataTypes.SORT_ITEM_DATA === type: {
      action = changeMode;
      if (index === 0) {
        leftIcon = RotatedArrow;
      } else {
        leftIcon = setLeftIcon({ mode, title });
      }

      break;
    }
    default: {
      leftIcon = undefined;
    }
  }

  return { action, leftIcon };
};
