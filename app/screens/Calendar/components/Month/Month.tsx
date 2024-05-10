import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import {
  calcFontSize,
  calcHeight,
  calcWidth,
  width,
} from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
import { Day } from 'app/screens/Calendar/components/Day/Day';
import {
  StyledMonthTitle,
  StyledMonthWrapper,
} from 'app/screens/Calendar/components/Month/Month.styled';
import { MonthI } from 'app/screens/Calendar/types';

interface RenderItemMonthProps {
  item: number;
}
interface MonthProps {
  monthData: Array<MonthI>;
}

export const Month = React.memo(function Month({ monthData }: MonthProps) {
  const renderItem = useCallback(
    ({ item }: RenderItemMonthProps) => (
      <View key={Math.random().toString()}>
        <Day value={item} />
      </View>
    ),
    []
  );

  return (
    <StyledMonthWrapper width={width - calcWidth(10)} height={calcHeight(300)}>
      <StyledMonthTitle
        size={calcFontSize(20)}
        color={colors[MainColorName.WHITE]}
        key={Math.random().toString()}
      >
        {monthData[0].title}
      </StyledMonthTitle>
      <FlatList
        data={monthData[0].data}
        renderItem={renderItem}
        numColumns={7}
        windowSize={100}
        showsHorizontalScrollIndicator={false}
        keyExtractor={() => {
          return Math.random().toString();
        }}
      />
    </StyledMonthWrapper>
  );
});
