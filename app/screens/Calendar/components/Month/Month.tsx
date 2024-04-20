import React from 'react';
import { FlatList, SectionList, View } from 'react-native';

import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
import { Day } from 'app/screens/Calendar/components/Day/Day';
import {
  StyledMonthTitle,
  StyledMonthWrapper,
} from 'app/screens/Calendar/components/Month/Month.styled';
interface RenderSectionTitleMonthHeaderProps {
  section: { title: string; data: Array<number> };
}
interface RenderItemMonthProps {
  item: number;
}
const MockMonth = [
  {
    title: 'April',
    data: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
];
export function Month() {
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
    <StyledMonthWrapper width={calcWidth(117)} height={calcHeight(120)}>
      <SectionList
        sections={MockMonth}
        renderSectionHeader={renderSectionHeader}
        renderItem={() => null}
      />
    </StyledMonthWrapper>
  );
}
