import React, { useEffect, useRef, useState } from 'react';
import {
  Animated as JSTreatAnimated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SwipeableComponent from 'react-native-gesture-handler/Swipeable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
import { deleteNote } from 'app/redux/notes/slice';

import { TrashIcon } from 'app/assets/icon';
import { calcWidth } from 'app/utils/scaling-system';

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
  const user = useAppSelector((state) => state.auth.user);

  const { date, title, subTitle, note, key } = item;

  const deleteNoteAction = () => {
    dispatch(deleteNote({ user, key }));
  };
  const renderDeleteComponent = (
    progressAnimatedValue: AnimatedInterpolation<string | number>,
    dragAnimatedValue: AnimatedInterpolation<string | number>
  ) => {
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

  return (
    <SwipeableComponent renderRightActions={renderDeleteComponent}>
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
