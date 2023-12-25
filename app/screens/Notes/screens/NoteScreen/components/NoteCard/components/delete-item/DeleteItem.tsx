import React, { useEffect } from 'react';
import { Animated as JSTreatAnimated, TouchableOpacity } from 'react-native';
import SwipeableComponent from 'react-native-gesture-handler/Swipeable';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { deleteNote } from 'app/redux/notes/slice';

import { TrashIcon } from 'app/assets/icon';
import { calcWidth } from 'app/utils/scaling-system';

import AnimatedInterpolation = JSTreatAnimated.AnimatedInterpolation;
import { StyledDeleteComponentWrapper } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/delete-item/DeleteItem.styled';
interface DeleteItemPropsI {
  dragAnimatedValue: AnimatedInterpolation<string | number>;
  Swipeable: SwipeableComponent;
  userKey: string;
}
export const DeleteItem = ({
  dragAnimatedValue,
  Swipeable,
  userKey,
}: DeleteItemPropsI) => {
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
