import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { getNotes, setIsOpenDeleteComponent } from 'app/redux/notes/slice';
import { NotesStackScreenName } from 'app/types';

import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { useGetAnimationData } from 'app/screens/Notes/hooks/useGetAnimationData';
import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
import { BottomComponent } from 'app/screens/Notes/screens/NoteScreen/components/BottomComponent/BottomComponent';
import {
  HeaderRightComponent,
  HeaderRightComponentPropsI,
} from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/HeaderRightComponent';
import { NoNotes } from 'app/screens/Notes/screens/NoteScreen/components/NoNotes/NoNotes';
import { NoteCard } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/NoteCard';
import { Search } from 'app/screens/Notes/screens/NoteScreen/components/Search/Search';
import {
  StyledCardWithTitleWrapper,
  StyledLabel,
  StyledTimerScreenContainer,
} from 'app/screens/Notes/screens/NoteScreen/Notes.styled';
import { CardItemI, RenderItemI } from 'app/screens/Notes/types';

export interface OnCardPressPropsI {
  note: string;
  key: string;
}

//was created because of ruls of hooks
const RightHeader = ({
  isCloseRightMenu,
  setIsCloseRightMenu,
}: HeaderRightComponentPropsI) => (
  <HeaderRightComponent
    isCloseRightMenu={isCloseRightMenu}
    setIsCloseRightMenu={setIsCloseRightMenu}
  />
);
export function NotesScreen() {
  const [dataAfterSearch, setDataAfterSearch] = useState<Array<CardItemI>>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isCloseRightMenu, setIsCloseRightMenu] = useState(false);
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.auth.user);
  const { notes, sortMode, dataSortMode, isOpenDeleteComponent } =
    useAppSelector((state) => state.notes);

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

  const isNoNotes = notes === null || notes?.length === 0;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => RightHeader({ isCloseRightMenu, setIsCloseRightMenu }),
    });
  }, [isCloseRightMenu, navigation]);
  useEffect(() => {
    dispatch(getNotes({ user }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const navigateToCreateNote = () =>
    navigation.navigate(NotesStackScreenName.CREATE_NOTE);

  const onCardPress = ({ note, key }: OnCardPressPropsI) => {
    if (!isOpenDeleteComponent) {
      navigation.navigate(NotesStackScreenName.CREATE_NOTE, { note, key });
    } else {
      dispatch(setIsOpenDeleteComponent(false));
    }
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
        isEmptyScreen={isNoNotes}
        setIsFocus={setIsFocus}
        setText={setText}
        text={text}
        data={notes ? notes : []}
        isRunSearchAnimation={isRunSearchAnimation}
        setDataAfterSearch={setDataAfterSearch}
      />
      <NoNotes isNoNotes={isNoNotes} />
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
    </StyledTimerScreenContainer>
  );
}
