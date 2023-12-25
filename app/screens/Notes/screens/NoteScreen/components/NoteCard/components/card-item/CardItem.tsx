import React, { useEffect } from 'react';
import { Animated as JSTreatAnimated, TouchableOpacity } from 'react-native';
import SwipeableComponent from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';

import {
  StyledDeleteComponentWrapper,
  StyledRenderItemWrapper,
  StyledSubTitle,
  StyledSubTitleWrapper,
  StyledTitle,
} from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-item/CardItem.styled';
import { CardTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-title/CardTitle';
import { NoteCardPropsI } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/NoteCard';
import { CardItemI } from 'app/screens/Notes/types';
import AnimatedInterpolation = JSTreatAnimated.AnimatedInterpolation;

import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { deleteNote, setIsOpenDeleteComponent } from 'app/redux/notes/slice';

import { TrashIcon } from 'app/assets/icon';
import { calcWidth } from 'app/utils/scaling-system';

interface RenderItemPropsI extends NoteCardPropsI {
  item: CardItemI;
  index: number;
}
interface DeleteComponentI {
  dragAnimatedValue: AnimatedInterpolation<string | number>;
  Swipeable: SwipeableComponent;
  userKey: string;
}
const DeleteComponent = ({
  dragAnimatedValue,
  Swipeable,
  userKey,
}: DeleteComponentI) => {
  const dispatch = useAppDispatch();
  const { isOpenDeleteComponent } = useAppSelector((state) => state.notes);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isOpenDeleteComponent) {
      Swipeable.close();
    }
  }, [isOpenDeleteComponent]); // eslint-disable-line react-hooks/exhaustive-deps
  const deleteNoteAction = () => {
    dispatch(deleteNote({ user, key: userKey }));
  };
  const opacity = dragAnimatedValue.interpolate({
    inputRange: [calcWidth(-60), 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateX = dragAnimatedValue.interpolate({
    inputRange: [calcWidth(-60), 0],
    outputRange: [0, calcWidth(60)],
  });

  return (
    <StyledDeleteComponentWrapper
      style={[{ transform: [{ translateX }], opacity }]}
    >
      <TouchableOpacity hitSlop={30} onPress={deleteNoteAction}>
        <TrashIcon />
      </TouchableOpacity>
    </StyledDeleteComponentWrapper>
  );
};
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
        <DeleteComponent
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
