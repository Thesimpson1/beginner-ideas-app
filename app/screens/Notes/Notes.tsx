import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import { BottomComponent } from 'app/screens/Notes/components/BottomComponent/BottomComponent';

import { HeaderRightComponent } from 'app/screens/Notes/components/HeaderRightComponent/HeaderRightComponent';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import { Search } from 'app/screens/Notes/components/Search/Search';
import { useGetAnimationData } from 'app/screens/Notes/hooks/useGetAnimationData';
import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
import {
  StyledCardWithTitleWrapper,
  StyledLabel,
  StyledMenuIcon,
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
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
  { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
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
  const [screenSize, setScreenSize] = useState(0);
  const { newData, amountOfCards } = useGetChangedData({ data: oldData });
  const { isRunSearchAnimation } = useGetAnimationData({
    amountOfCards,
    screenSize,
  });
  const screenOffset = useSharedValue(0);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);
  const renderItem = ({ item, index }: RenderItemI) => {
    return (
      <StyledCardWithTitleWrapper isLastIndex={index === newData.length - 1}>
        <StyledLabel>{item.title}</StyledLabel>
        <NoteCard data={item.filteredData} isSearch={isFocus} />
      </StyledCardWithTitleWrapper>
    );
  };
  return (
    <StyledTimerScreenContainer
      onLayout={({ nativeEvent }) => setScreenSize(nativeEvent.layout.height)}
    >
      <Search
        offset={screenOffset}
        setIsFocus={setIsFocus}
        setText={setText}
        text={text}
        data={oldData}
        isRunSearchAnimation={isRunSearchAnimation}
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
