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
import { OnCardPressPropsI } from 'app/screens/Notes/screens/NoteScreen/Notes';
import { CardItemI } from 'app/screens/Notes/types';

interface RenderItemPropsI {
  item: CardItemI;
  index: number;
}

interface NoteCardPropsI {
  data: Array<CardItemI>;
  isSearch: boolean;
  searchText?: string;
  onCardPress: ({ note, key }: OnCardPressPropsI) => void;
}

export function NoteCard({
  data,
  isSearch,
  searchText = '',
  onCardPress,
}: NoteCardPropsI) {
  const renderItem = ({ item, index }: RenderItemPropsI) => {
    const { date, title, subTitle, note, key } = item;
    return (
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
    );
  };
  return (
    <StyledCardContainer>
      <FlatList data={data} renderItem={renderItem} />
    </StyledCardContainer>
  );
}
