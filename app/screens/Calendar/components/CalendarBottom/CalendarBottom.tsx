import React from 'react';

import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { CalendarsBottomButtonNames } from 'app/screens/Calendar/types';

import {
  StyledCalendarBottomContainer,
  StyledFlatListContainer,
} from './CalendarBottom.styled';

const CalendarsBottomButton: Array<CalendarsBottomButtonNames> = [
  CalendarsBottomButtonNames.Today,
  CalendarsBottomButtonNames.Calendars,
  CalendarsBottomButtonNames.Incoming,
];
interface RenderBottomItemProps {
  item: CalendarsBottomButtonNames;
}
export function CalendarBottom() {
  const renderItem = ({ item }: RenderBottomItemProps) => (
    <SimpleButton title={item} size={18} />
  );
  return (
    <StyledCalendarBottomContainer>
      <StyledFlatListContainer
        data={CalendarsBottomButton}
        renderItem={renderItem}
      />
    </StyledCalendarBottomContainer>
  );
}
