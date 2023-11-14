import React, { useCallback } from 'react';
import { FlatList, Text, TextInput } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import {
  StyledCardContainer,
  StyledRenderItemWrapper,
  StyledSubTitle,
  StyledSubTitleWrapper,
  StyledTitle,
} from 'app/screens/Notes/components/NoteCard/NoteCard.styled';
import { CardItemI } from 'app/screens/Notes/Notes';

interface RenderItemPropsI {
  item: CardItemI;
  index: number;
}
interface NoteCardPropsI {
  data: Array<CardItemI>;
  setPartOfNotesWidthHeight: (value: number) => void;
}
export function NoteCard({ data, setPartOfNotesWidthHeight }: NoteCardPropsI) {
  const renderItem = ({ item, index }: RenderItemPropsI) => {
    const { date, title, subTitle } = item;
    return (
      <StyledRenderItemWrapper
        isDisplayBottomBorder={index !== data.length - 1}
      >
        <StyledTitle>{title}</StyledTitle>
        <StyledSubTitleWrapper>
          <StyledSubTitle isAdditionalSpaceAfter>{date}</StyledSubTitle>
          <StyledSubTitle>{subTitle}</StyledSubTitle>
        </StyledSubTitleWrapper>
      </StyledRenderItemWrapper>
    );
  };
  return (
    <StyledCardContainer
      onLayout={({ nativeEvent }) => {
        console.log('88', nativeEvent.layout.height);
        setPartOfNotesWidthHeight(nativeEvent.layout.height);
      }}
    >
      <FlatList data={data} renderItem={renderItem} />
    </StyledCardContainer>
  );
}
