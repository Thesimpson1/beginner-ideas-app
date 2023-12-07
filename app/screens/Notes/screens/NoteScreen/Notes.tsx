import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from 'app/redux/hooks';
import { NotesStackScreenName } from 'app/types';

import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { BottomComponent } from 'app/screens/Notes/components/BottomComponent/BottomComponent';
import { HeaderRightComponent } from 'app/screens/Notes/components/HeaderRightComponent/HeaderRightComponent';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import { Search } from 'app/screens/Notes/components/Search/Search';
import { useGetAnimationData } from 'app/screens/Notes/hooks/useGetAnimationData';
import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
import {
  StyledCardWithTitleWrapper,
  StyledLabel,
  StyledTimerScreenContainer,
} from 'app/screens/Notes/screens/NoteScreen/Notes.styled';
import { CardItemI, RenderItemI } from 'app/screens/Notes/types';

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

export function NotesScreen() {
  // const onTextLayout = (e) => {
  //   console.log('1111', e.nativeEvent.lines)
  // };
  //
  const [dataAfterSearch, setDataAfterSearch] = useState<Array<CardItemI>>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isCloseRightMenu, setIsCloseRightMenu] = useState(false);
  const [text, setText] = useState('');
  const sortMode = useAppSelector((state) => state.notes.sortMode);
  const dateSortMode = useAppSelector((state) => state.notes.dataSortMode);
  const user = useAppSelector((state) => state.auth.user);
  const [screenSize, setScreenSize] = useState(0);
  const { newData, amountOfCards } = useGetChangedData({ data: oldData });
  const { isRunSearchAnimation } = useGetAnimationData({
    amountOfCards,
    screenSize,
  });
  const isSortByNames = sortMode === 'By names' || dateSortMode === 'Off';
  const screenOffset = useSharedValue(0);
  const navigation = useNavigation<StackNavigationProp<MainNotesParamList>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        HeaderRightComponent({ isCloseRightMenu, setIsCloseRightMenu }),
    });
  }, [isCloseRightMenu, navigation]);
  useEffect(() => {
    dispatch(getNotes({ user }));
    // dispatch(updateNote({ user, note: 'heyka12', key: '-Nl4LmP4DBVqu9GhljRm' }));
    // dispatch(deleteNote({ user, key: '-Nl4LmP4DBVqu9GhljRm' }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const navigateToCreateNote = () =>
    navigation.navigate(NotesStackScreenName.CREATE_NOTE);
  const renderItem = ({ item, index }: RenderItemI) => {
    return (
      <StyledCardWithTitleWrapper
        isLastIndex={index === newData.length - 1}
        key={item.title}
      >
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

      {isFocus || isSortByNames ? (
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
      {!isFocus && !isSortByNames && (
        <BottomComponent
          amountOfNotes={oldData.length}
          createNote={navigateToCreateNote}
        />
      )}

      {/*/!*<Text onTextLayout={onTextLayout}>{text}</Text>*!/*/}
    </StyledTimerScreenContainer>
  );
}