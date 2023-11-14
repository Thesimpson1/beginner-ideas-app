import React, { useCallback, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { calcHeight, height } from 'app/utils/scaling-system';
import { PI } from 'app/components/CircleProgressBar/constants';
import { BottomComponent } from 'app/screens/Notes/components/BottomComponent/BottomComponent';
import { NoteCard } from 'app/screens/Notes/components/NoteCard/NoteCard';
import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
import {
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
];

export interface ChangedDataItemI {
  filteredData: Array<CardItemI>;
  title: string;
}
interface RenderItemI {
  item: ChangedDataItemI;
}
interface UseGetBottomAnimationInfoI {
  cardsAmount: Array<number>;
  screenHeight: number;
}
// const saveSizes =
//   ({ nativeEvent }: LayoutChangeEvent) =>
//   (prevState: Array<number>) => {
//     const arrayOfCardHeight: Array<number> = [...prevState];
//     arrayOfCardHeight.push(nativeEvent.layout.height);
//     return arrayOfCardHeight;
//   };

const useGetBottomAnimationInfo = ({
  screenHeight,
  cardsAmount,
}: UseGetBottomAnimationInfoI) => {
  oneCardHeight;
  const arrayOfNumbersForAnimation: Array<number> = [];
  const arrayOfOutputNumbersForAnimation: Array<number> = [];
  const noteTitleHeight = calcHeight(41.5);
  const oneCardHeight = calcHeight(51.6);
  const cardWithTitleHeight = cardsAmount.map(
    (item) => item * oneCardHeight + noteTitleHeight
  );
  const entireHeight = cardWithTitleHeight.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const maxOffset = entireHeight - screenHeight;
  let sumOfHeight = 0;
  let finishIndex = 0;
  //if there is some offset , we start to calculate
  if (maxOffset > 0) {
    cardWithTitleHeight.forEach((item, index) => {
      if (screenHeight > sumOfHeight) {
        sumOfHeight += item;
        finishIndex = index;
      }
    });
    const rest = sumOfHeight - screenHeight;
    const visiblePartHeight = cardWithTitleHeight[finishIndex] - rest;
    const partWithoutTitle = visiblePartHeight - noteTitleHeight;
    let firstElementFinish = 0;

    if (partWithoutTitle > 0) {
      firstElementFinish =
        cardWithTitleHeight[finishIndex] - partWithoutTitle - noteTitleHeight;
      arrayOfNumbersForAnimation.push(0);
      arrayOfNumbersForAnimation.push(firstElementFinish);
      arrayOfOutputNumbersForAnimation.push(90);
      arrayOfOutputNumbersForAnimation.push(0);
      cardWithTitleHeight.splice(0, finishIndex + 1);
    }
    for (let i of cardWithTitleHeight) {
      const start = firstElementFinish + noteTitleHeight;
      firstElementFinish += i - noteTitleHeight;
      arrayOfNumbersForAnimation.push(start, firstElementFinish);
      arrayOfOutputNumbersForAnimation.push(0);
      arrayOfOutputNumbersForAnimation.push(90);
      arrayOfOutputNumbersForAnimation.push(0);
    }
    console.log('1111', maxOffset);
  }

  return { arrayOfNumbersForAnimation, arrayOfOutputNumbersForAnimation };
};
export function NotesScreen() {
  // const onTextLayout = (e) => {
  //   console.log('1111', e.nativeEvent.lines)
  // };
  //
  const { newData, amountOfCards } = useGetChangedData({ data: oldData });
  const [notesScreenHeight, setNotesScreenHeight] = useState(0);
  const [partOfNotesWithTitleHeight, setPartOfNotesWithTitleHeight] = useState<
    Array<number>
  >([]);
  const [partOfNotesWithHeight, setPartOfNotesWithHeight] = useState(0);

  const offset = useSharedValue(0);
  useGetBottomAnimationInfo({
    screenHeight: notesScreenHeight,
    cardsAmount: amountOfCards,
  });

  const animatedStyles = useAnimatedStyle(() => {
    const animatedHeight = interpolate(
      offset.value,
      [0, 131, 188, 272, 330],
      [90, 0, 0, 90, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    return { height: animatedHeight };
  });

  const renderItem = ({ item }: RenderItemI) => {
    return (
      <View
      // onLayout={(event) => setPartOfNotesWithTitleHeight(saveSizes(event))}
      // onLayout={({ nativeEvent }) =>
      //   console.log('2222', nativeEvent.layout.height)
      // }
      >
        <StyledLabel>{item.title}</StyledLabel>
        <NoteCard
          data={item.filteredData}
          setPartOfNotesWidthHeight={setPartOfNotesWithHeight}
        />
      </View>
    );
  };
  return (
    <StyledTimerScreenContainer
      onLayout={({ nativeEvent }) => {
        const mainNotesScreenHeight =
          nativeEvent.layout.height - calcHeight(60);

        setNotesScreenHeight(mainNotesScreenHeight);
        // console.log('1111', nativeEvent.layout);
      }}
    >
      <FlatList
        data={newData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          offset.value = nativeEvent.contentOffset.y;
          console.log('1111', nativeEvent.contentOffset.y);
        }}
      />

      <BottomComponent
        amountOfNotes={oldData.length}
        createNote={() => {}}
        animatedStyles={animatedStyles}
      />
      {/*<Text onTextLayout={onTextLayout}>{text}</Text>*/}
    </StyledTimerScreenContainer>
  );
}
