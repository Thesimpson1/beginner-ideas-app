import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { MockCalendarYear } from 'app/mocks';
import { NotesStackScreenName } from 'app/types';

import { StyledMainWrapperWithAnimation } from 'app/utils/common-styled-components';
import { StackScreenHeader } from 'app/navigation/navigation-headers/StackScreenHeader/StackScreenHeader';
import { StyledYearWrapper } from 'app/screens/Calendar/Calendar.styled';
import { CalendarBottom } from 'app/screens/Calendar/components/CalendarBottom/CalendarBottom';
import { Month } from 'app/screens/Calendar/components/Month/Month';
import { MonthI } from 'app/screens/Calendar/types';
import { RightDoneButton } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton';

interface RenderItemCalendarProps {
  item: MonthI[];
}

export function CalendarScreen() {
  const renderItem = useCallback(({ item }: RenderItemCalendarProps) => {
    return (
      <View key={Math.random().toString()}>
        <Month monthData={item} />
      </View>
    );
  }, []);

  return (
    <StyledMainWrapperWithAnimation>
      <StackScreenHeader
        options={{
          headerTitle: NotesStackScreenName.NOTES,
          headerRight: RightDoneButton({
            onClickButton: () => {},
            isDisabled: false,
          }),
        }}
      />

      <StyledYearWrapper>
        <FlatList
          data={MockCalendarYear[0].data}
          renderItem={renderItem}
          // numColumns={3}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={100}
          keyExtractor={() => {
            return Math.random().toString();
          }}
        />
      </StyledYearWrapper>
      <CalendarBottom />
    </StyledMainWrapperWithAnimation>
  );
}
