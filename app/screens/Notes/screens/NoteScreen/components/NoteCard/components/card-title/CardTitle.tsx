import React from 'react';
import { FlatList } from 'react-native';

import {
  StyledFlatListTitleContainer,
  StyledTitle,
} from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-title/CardTitle.styled';
import { setIsChangeTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/utils/utils';

interface RenderItemPropsI {
  item: string;
  index: number;
}
interface CardTitleI {
  title: string;
  searchText?: string;
}

export function CardTitle({ title, searchText = '' }: CardTitleI) {
  const renderItem = ({ item, index }: RenderItemPropsI) => {
    const changedTitle = setIsChangeTitle({
      text: searchText,
      item,
      index,
    });
    return (
      <StyledTitle
        isHighlight={changedTitle}
        key={`${item}${Math.random()}`}
        testID={'StyledTitleTestID'}
      >
        {item}
      </StyledTitle>
    );
  };
  const newData = title.split('');
  return (
    <StyledFlatListTitleContainer testID={'StyledFlatListTitleContainerTestID'}>
      <FlatList
        data={newData}
        renderItem={renderItem}
        horizontal
        testID={'FlatListTestID'}
      />
    </StyledFlatListTitleContainer>
  );
}
