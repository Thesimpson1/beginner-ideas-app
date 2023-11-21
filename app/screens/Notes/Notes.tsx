import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { BottomComponent } from 'app/screens/Notes/components/BottomComponent/BottomComponent';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import { Search } from 'app/screens/Notes/components/Search/Search';
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
  { date: '2023-11-10', title: 'noteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-10', title: 'qwqwqwqwq', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  // { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  // { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  // { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  // { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  // { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
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
  const [dataAfterSearch, setDataAfterSearch] = useState<Array<CardItemI>>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState('');
  const { newData } = useGetChangedData({ data: oldData });
  const screenOffset = useSharedValue(0);

  const renderItem = ({ item, index }: RenderItemI) => {
    return (
      <StyledCardWithTitleWrapper isLastIndex={index === newData.length - 1}>
        <StyledLabel>{item.title}</StyledLabel>
        <NoteCard data={item.filteredData} isSearch={isFocus} />
      </StyledCardWithTitleWrapper>
    );
  };
  return (
    <StyledTimerScreenContainer>
      <Search
        offset={screenOffset}
        setIsFocus={setIsFocus}
        setText={setText}
        text={text}
        data={oldData}
        setDataAfterSearch={setDataAfterSearch}
      />

      {isFocus ? (
        <StyledCardWithTitleWrapper isLastIndex>
          <NoteCard
            data={dataAfterSearch}
            isSearch={isFocus}
            searchText={text}
          />
        </StyledCardWithTitleWrapper>
      ) : (
        <FlatList
          data={newData}
          onScroll={({ nativeEvent }) => {
            screenOffset.value = nativeEvent.contentOffset.y;
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
      {!isFocus && (
        <BottomComponent amountOfNotes={oldData.length} createNote={() => {}} />
      )}

      {/*/!*<Text onTextLayout={onTextLayout}>{text}</Text>*!/*/}
    </StyledTimerScreenContainer>
  );
}
