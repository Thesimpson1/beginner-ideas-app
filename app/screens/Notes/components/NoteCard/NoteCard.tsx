import React, { useCallback } from 'react';
import { FlatList, Text, TextInput } from 'react-native';

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
}
export function NoteCard({ data }: NoteCardPropsI) {
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
    <StyledCardContainer>
      <FlatList data={data} renderItem={renderItem} />
    </StyledCardContainer>
  );
}
