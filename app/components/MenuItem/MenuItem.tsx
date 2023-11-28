import React, {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from 'react';
import { GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  StyledArrowWrapper,
  StyledIconAndTextWrapper,
  StyledMenuItemsWrapper,
  StyledRightMenuText,
} from 'app/components/MenuItem/MenuItem.styled';

interface MenuItemPropsI {
  index: number;
  title: string;
  LeftIcon?: () => React.JSX.Element;
  RightIcon?: () => React.JSX.Element;
  onPress: (event: GestureResponderEvent) => void;
}

export function MenuItem({
  index,
  title,
  RightIcon,
  LeftIcon,
  onPress,
}: MenuItemPropsI) {
  return (
    <StyledMenuItemsWrapper isLastItem={index === 2} onPress={onPress}>
      <StyledArrowWrapper>{LeftIcon && <LeftIcon />}</StyledArrowWrapper>

      <StyledIconAndTextWrapper>
        <StyledRightMenuText>{title}</StyledRightMenuText>
        {RightIcon && <RightIcon />}
      </StyledIconAndTextWrapper>
    </StyledMenuItemsWrapper>
  );
}
