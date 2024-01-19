import React from 'react';
import { GestureResponderEvent } from 'react-native';

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
    <StyledMenuItemsWrapper
      isLastItem={index === 2}
      onPress={onPress}
      testID={'StyledMenuItemsWrapperTestID'}
    >
      <StyledArrowWrapper testID={'StyledArrowWrapperTestID'}>
        {LeftIcon && <LeftIcon />}
      </StyledArrowWrapper>

      <StyledIconAndTextWrapper testID={'StyledIconAndTextWrapperTestID'}>
        <StyledRightMenuText testID={'StyledRightMenuTextTestID'}>
          {title}
        </StyledRightMenuText>
        {RightIcon && <RightIcon />}
      </StyledIconAndTextWrapper>
    </StyledMenuItemsWrapper>
  );
}
