import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import database, { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import {
  deleteNote,
  getNotes,
  pushNote,
  updateNote,
} from 'app/redux/notes/slice';
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

// export const oldData = [
//   { date: '2023-11-10', title: 'noteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-11-10', title: 'qwqwqwqwq', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-11-09', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   // { date: '2023-11-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
//   { date: '2023-10-07', title: 'NoteCardTitle', subTitle: 'NoteCardSubtitle' },
// ];
export interface OnCardPressPropsI {
  note: string;
  key: string;
}
export function NotesScreen() {
  // const onTextLayout = (e) => {
  //   console.log('1111', e.nativeEvent.lines)
  // };
  //
  const [dataAfterSearch, setDataAfterSearch] = useState<Array<CardItemI>>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isCloseRightMenu, setIsCloseRightMenu] = useState(false);
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.auth.user);
  const { notesKeys, notes, sortMode, dataSortMode } = useAppSelector(
    (state) => state.notes
  );

  const { newData, amountOfCards } = useGetChangedData({
    data: notes ? notes : [],
  });
  const [screenSize, setScreenSize] = useState(0);

  const { isRunSearchAnimation } = useGetAnimationData({
    amountOfCards,
    screenSize,
  });

  const isSortByNames = sortMode === 'By names' || dataSortMode === 'Off';
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

  const onCardPress = ({ note, key }: OnCardPressPropsI) => {
    navigation.navigate(NotesStackScreenName.CREATE_NOTE, { note, key });
  };
  const renderItem = ({ item, index }: RenderItemI) => {
    return (
      <StyledCardWithTitleWrapper
        isLastIndex={index === newData.length - 1}
        key={item.title}
      >
        <StyledLabel>{item.title}</StyledLabel>
        <NoteCard
          data={item.filteredData}
          isSearch={isFocus}
          onCardPress={onCardPress}
        />
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
        data={notes ? notes : []}
        isRunSearchAnimation={isRunSearchAnimation}
        setDataAfterSearch={setDataAfterSearch}
      />

      {isFocus || isSortByNames ? (
        <StyledCardWithTitleWrapper isLastIndex>
          <NoteCard
            data={dataAfterSearch}
            isSearch={isFocus}
            searchText={text}
            onCardPress={onCardPress}
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
          amountOfNotes={notes ? notes.length : 0}
          createNote={navigateToCreateNote}
        />
      )}

      {/*/!*<Text onTextLayout={onTextLayout}>{text}</Text>*!/*/}
    </StyledTimerScreenContainer>
  );
}
