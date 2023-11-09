import React, { useCallback } from 'react';
import { FlatList, Text, TextInput } from 'react-native';
import moment from 'moment';

import { StyledAnimatedWrapper } from 'app/utils/common-styled-components';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import {
  StyledLabel,
  StyledTimerScreenContainer,
} from 'app/screens/Notes/Notes.styled';
export const data = [
  { date: '10.20.2021', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '10.20.2021', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
];
const dateTitles = ['Today', 'Yesterday', 'Last 30 Days'];
export function NotesScreen() {
  // const onTextLayout = (e) => {
  //   console.log('1111', e.nativeEvent.lines)
  // };
  // console.log('111', moment().format('DD.MM.YYYY'));

  const renderItem = ({ item }: { item: string }) => {
    return (
      <>
        <StyledLabel>{item}</StyledLabel>
        <NoteCard data={data} />
      </>
    );
  };
  return (
    <StyledTimerScreenContainer>
      <FlatList data={dateTitles} renderItem={renderItem} />

      {/*<Text onTextLayout={onTextLayout}>{text}</Text>*/}
    </StyledTimerScreenContainer>
  );
}
