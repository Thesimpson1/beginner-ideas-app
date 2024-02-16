import React from 'react';
import SwipeableComponent from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';

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
  const { date, title, subTitle, note, key } = item;

  return (
    <SwipeableComponent
      testID={'SwipeableComponentTestID'}
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
    >
      <Animated.View>
        <StyledRenderItemWrapper
          isDisplayBottomBorder={index !== data.length - 1}
          onPress={() => onCardPress({ note, key })}
          testID={'StyledRenderItemWrapperTestID'}
        >
          {isSearch && <CardTitle title={title} searchText={searchText} />}

          <StyledTitle isSearch={isSearch} testID={'StyledTitleTestID'}>
            {title}
          </StyledTitle>

          <StyledSubTitleWrapper>
            <StyledSubTitle isAdditionalSpaceAfter>{date}</StyledSubTitle>
            <StyledSubTitle>{subTitle}</StyledSubTitle>
          </StyledSubTitleWrapper>
        </StyledRenderItemWrapper>
      </Animated.View>
    </SwipeableComponent>
  );
};
