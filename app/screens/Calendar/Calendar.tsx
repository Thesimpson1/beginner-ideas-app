import React from 'react';
import { FlatList, SectionList } from 'react-native';
import { MockCalendarYear } from 'app/mocks';

import { StyledMainWrapperWithAnimation } from 'app/utils/common-styled-components';
import { calcFontSize } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
import {
  StyledLine,
  StyledYearTitle,
  StyledYearWrapper,
} from 'app/screens/Calendar/Calendar.styled';
import { CalendarBottom } from 'app/screens/Calendar/components/CalendarBottom/CalendarBottom';
import { Month } from 'app/screens/Calendar/components/Month/Month';
import { MonthI } from 'app/screens/Calendar/types';
interface RenderSectionCalendarHeader {
  section: {
    title: string;
    data: ArrayLike<MonthI[]>;
  };
}
interface RenderItemCalendarProps {
  item: MonthI[];
}
export function CalendarScreen() {
  const renderItem = ({ item }: RenderItemCalendarProps) => {
    return <Month monthData={item} />;
  };
  const renderSectionHeader = ({
    section: { title, data },
  }: RenderSectionCalendarHeader) => (
    <>
      <StyledYearTitle
        size={calcFontSize(24)}
        color={colors[MainColorName.WHITE]}
        key={Math.random().toString()}
      >
        {title}
      </StyledYearTitle>
      <StyledLine />
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  return (
    <StyledMainWrapperWithAnimation>
      <StyledYearWrapper>
        <SectionList
          sections={MockCalendarYear}
          renderSectionHeader={renderSectionHeader}
          renderItem={() => null}
        />
      </StyledYearWrapper>
      <CalendarBottom />
    </StyledMainWrapperWithAnimation>
  );
}
