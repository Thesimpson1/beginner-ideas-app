import React from 'react';
import { FlatList } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {
  ChooseIcon,
  NotesCalendarIcon,
  RightArrowWhiteIcon,
  SortVerticalIcon,
} from 'app/assets/icon';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import {
  StyledArrowWrapper,
  StyledIconAndTextWrapper,
  StyledMenusItemsWrapper,
  StyledRightMenuText,
  StyledRightMenuWrapper,
} from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/RightMenu.styled';

interface RightMenuPropsI {
  isShowAnimation: SharedValue<boolean>;
}

const MENU_DATA = [
  {
    title: 'Choose note',
    Icon: () => <ChooseIcon testID={'ChooseIconTestID'} />,
  },
  {
    title: 'Sort',
    Icon: () => <SortVerticalIcon testID={'SortVerticalIconTestID'} />,
  },
  {
    title: 'Date sort',
    Icon: () => <NotesCalendarIcon testID={'NotesCalendarIconTestID'} />,
  },
];
interface RenderItemProps {
  index: number;
  item: (typeof MENU_DATA)[0];
}
export function RightMenu({ isShowAnimation }: RightMenuPropsI) {
  const menusHeight = calcHeight(50) * 3;
  const menusWidth = calcWidth(200);
  const rightMenuWrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isShowAnimation.value ? menusHeight : 0, {
        duration: 200,
      }),
      width: withTiming(isShowAnimation.value ? menusWidth : 0, {
        duration: 200,
      }),
      opacity: withTiming(isShowAnimation.value ? 1 : 0, { duration: 200 }),
    };
  });
  const renderItem = ({ item, index }: RenderItemProps) => {
    const { title, Icon } = item;
    return (
      <StyledMenusItemsWrapper isLastItem={index === 2}>
        <StyledArrowWrapper>
          {index > 0 && <RightArrowWhiteIcon />}
        </StyledArrowWrapper>

        <StyledIconAndTextWrapper>
          <StyledRightMenuText>{title}</StyledRightMenuText>
          <Icon />
        </StyledIconAndTextWrapper>
      </StyledMenusItemsWrapper>
    );
  };
  return (
    <StyledRightMenuWrapper style={rightMenuWrapperAnimatedStyle}>
      <FlatList data={MENU_DATA} renderItem={renderItem} />
    </StyledRightMenuWrapper>
  );
}
