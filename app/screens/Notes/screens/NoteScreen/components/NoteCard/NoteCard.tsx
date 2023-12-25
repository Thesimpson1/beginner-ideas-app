import React, { useEffect, useState } from 'react';
import {
  Animated as JSTreatAnimated,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CardItem } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-item/CardItem';
import { CardTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/components/card-title/CardTitle';
import { StyledCardContainer } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/NoteCard.styled';
import { OnCardPressPropsI } from 'app/screens/Notes/screens/NoteScreen/Notes';
import { CardItemI } from 'app/screens/Notes/types';

export interface NoteCardPropsI {
  data: Array<CardItemI>;
  isSearch: boolean;
  searchText?: string;
  onCardPress: ({ note, key }: OnCardPressPropsI) => void;
}

export function NoteCard({
  data,
  isSearch,
  searchText,
  onCardPress,
}: NoteCardPropsI) {
  return (
    <StyledCardContainer>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CardItem
            item={item}
            index={index}
            isSearch={isSearch}
            searchText={searchText}
            onCardPress={onCardPress}
            data={data}
          />
        )}
      />
    </StyledCardContainer>
  );
}
