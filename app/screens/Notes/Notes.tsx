import React from 'react';
import { FlatList, View } from 'react-native';

import { BottomComponent } from 'app/screens/Notes/components/BottomComponent/BottomComponent';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
import {
  StyledCardWithTitleWrapper,
  StyledLabel,
  StyledTimerScreenContainer,
} from 'app/screens/Notes/Notes.styled';
export interface CardItemI {
  date: string;
  title: string;
  subTitle: string;
}
export const oldData = [
  { date: '2023-11-10', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-10', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-09-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-09-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2021-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2021-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2020-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2020-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
];

export interface ChangedDataItemI {
  filteredData: Array<CardItemI>;
  title: string;
}
interface RenderItemI {
  item: ChangedDataItemI;
  index: number;
}

export function NotesScreen() {
  // const onTextLayout = (e) => {
  //   console.log('1111', e.nativeEvent.lines)
  // };
  //
  const { newData } = useGetChangedData({ data: oldData });

  const renderItem = ({ item, index }: RenderItemI) => {
    return (
      <StyledCardWithTitleWrapper isLastIndex={index === newData.length - 1}>
        <StyledLabel>{item.title}</StyledLabel>
        <NoteCard data={item.filteredData} />
      </StyledCardWithTitleWrapper>
    );
  };
  return (
    <StyledTimerScreenContainer>
      <FlatList
        data={newData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <BottomComponent amountOfNotes={oldData.length} createNote={() => {}} />
      {/*<Text onTextLayout={onTextLayout}>{text}</Text>*/}
    </StyledTimerScreenContainer>
  );
}
