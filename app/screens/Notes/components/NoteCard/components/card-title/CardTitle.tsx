import React from 'react';
import { FlatList } from 'react-native';

import {
  StyledFlatListTitleContainer,
  StyledTitle,
} from 'app/screens/Notes/components/NoteCard/components/card-title/CardTitle.styled';
import { CardItemI } from 'app/screens/Notes/Notes';
interface RenderItemPropsI {
  item: string;
  index: number;
}
interface CardTitleI {
  title: string;
  isDisabled?: boolean;
  searchText: string;
}
interface OnChangeTitleI {
  text: string;
  item: string;
  index: number;
}
export function CardTitle({
  title,
  isDisabled = false,
  searchText = '',
}: CardTitleI) {
  const onChangeTitle = ({ text, item, index }: OnChangeTitleI) => {
    switch (true) {
      case index > text.length - 1: {
        return false;
      }
      case text.length === 1: {
        return item.toLowerCase() === text.toLowerCase();
      }
      case text.length > 1: {
        return text.toLowerCase().includes(item.toLowerCase());
      }
      default: {
        return false;
      }
    }
  };

  const renderItem = ({ item, index }: RenderItemPropsI) => {
    const changedTitle = onChangeTitle({
      text: searchText,
      item,
      index,
    });
    return <StyledTitle isHighlight={changedTitle}>{item}</StyledTitle>;
  };
  const newData = title.split('');
  return (
    <StyledFlatListTitleContainer isDisabled={isDisabled}>
      <FlatList data={newData} renderItem={renderItem} horizontal />
    </StyledFlatListTitleContainer>
  );
}
