import React from 'react';
import { FlatList, SectionList, View } from 'react-native';

import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
import { Day } from 'app/screens/Calendar/components/Day/Day';
import {
  StyledMonthTitle,
  StyledMonthWrapper,
} from 'app/screens/Calendar/components/Month/Month.styled';
import { MonthI } from 'app/screens/Calendar/types';
interface RenderSectionTitleMonthHeaderProps {
  section: MonthI;
}
interface RenderItemMonthProps {
  item: number;
}
interface MonthProps {
  monthData: Array<MonthI>;
}

export function Month({ monthData }: MonthProps) {
  const renderItem = ({ item }: RenderItemMonthProps) => (
    <View key={Math.random().toString()}>
      <Day value={item} />
    </View>
  );
  const renderSectionHeader = ({
    section: { title, data },
  }: RenderSectionTitleMonthHeaderProps) => (
    <>
      <StyledMonthTitle
        size={calcFontSize(18)}
        color={colors[MainColorName.WHITE]}
        key={Math.random().toString()}
      >
        {title}
      </StyledMonthTitle>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={7}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  return (
    <StyledMonthWrapper width={calcWidth(112)} height={calcHeight(120)}>
      <SectionList
        sections={monthData}
        renderSectionHeader={renderSectionHeader}
        renderItem={() => null}
      />
    </StyledMonthWrapper>
  );
}
