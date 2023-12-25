import React from 'react';
import SwipeableComponent from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { useAppDispatch } from 'app/redux/hooks';
import { setIsOpenDeleteComponent } from 'app/redux/notes/slice';

import {
  StyledRenderItemWrapper,
  StyledSubTitle,
  StyledSubTitleWrapper,
  StyledTitle,
} from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-item/CardItem.styled';
import { CardTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-title/CardTitle';
import { DeleteItem } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/delete-item/DeleteItem';
import { NoteCardPropsI } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/NoteCard';
import { CardItemI } from 'app/screens/Notes/types';

interface RenderItemPropsI extends NoteCardPropsI {
  item: CardItemI;
  index: number;
}

export const CardItem = ({
  item,
  index,
  data,
  onCardPress,
  searchText = '',
  isSearch,
}: RenderItemPropsI) => {
  const dispatch = useAppDispatch();
  const { date, title, subTitle, note, key } = item;

  return (
    <SwipeableComponent
      renderRightActions={(
        progressAnimatedValue,
        dragAnimatedValue,
        Swipeable
      ) => (
        <DeleteItem
          dragAnimatedValue={dragAnimatedValue}
          Swipeable={Swipeable}
          userKey={key}
        />
      )}
      onSwipeableOpen={() => dispatch(setIsOpenDeleteComponent(true))}
    >
      <Animated.View>
        <StyledRenderItemWrapper
          isDisplayBottomBorder={index !== data.length - 1}
          onPress={() => onCardPress({ note, key })}
        >
          {isSearch && <CardTitle title={title} searchText={searchText} />}

          <StyledTitle isSearch={isSearch}>{title}</StyledTitle>

          <StyledSubTitleWrapper>
            <StyledSubTitle isAdditionalSpaceAfter>{date}</StyledSubTitle>
            <StyledSubTitle>{subTitle}</StyledSubTitle>
          </StyledSubTitleWrapper>
        </StyledRenderItemWrapper>
      </Animated.View>
    </SwipeableComponent>
  );
};
