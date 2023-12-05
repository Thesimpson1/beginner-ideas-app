import React from 'react';
import { FlatList } from 'react-native';

import { CardTitle } from 'app/screens/Notes/components/NoteCard/components/card-title/CardTitle';
import {
  StyledCardContainer,
  StyledRenderItemWrapper,
  StyledSubTitle,
  StyledSubTitleWrapper,
  StyledTitle,
} from 'app/screens/Notes/components/NoteCard/NoteCard.styled';
import { CardItemI } from 'app/screens/Notes/types';

interface RenderItemPropsI {
  item: CardItemI;
  index: number;
}
interface NoteCardPropsI {
  data: Array<CardItemI>;
  isSearch: boolean;
  searchText?: string;
}

export function NoteCard({ data, isSearch, searchText = '' }: NoteCardPropsI) {
  const renderItem = ({ item, index }: RenderItemPropsI) => {
    const { date, title, subTitle } = item;
    return (
      <StyledRenderItemWrapper
        isDisplayBottomBorder={index !== data.length - 1}
      >
        {isSearch && <CardTitle title={title} searchText={searchText} />}

        <StyledTitle isSearch={isSearch}>{title}</StyledTitle>
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
