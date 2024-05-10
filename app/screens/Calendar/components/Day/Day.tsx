import React from 'react';

import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import {
  StyledDayText,
  StyledDayWrapper,
} from 'app/screens/Calendar/components/Day/Day.styled';
interface DayProps {
  value: number;
}
export const Day = React.memo(function Day({ value }: DayProps) {
  return (
    <StyledDayWrapper
      width={calcWidth(47)}
      height={calcHeight(50)}
      isBackgroundVisibly={false}
    >
      <StyledDayText size={calcFontSize(18)}>{value}</StyledDayText>
    </StyledDayWrapper>
  );
});
