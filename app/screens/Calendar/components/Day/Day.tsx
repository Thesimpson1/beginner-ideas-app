import React from 'react';

import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import {
  StyledDayText,
  StyledDayWrapper,
} from 'app/screens/Calendar/components/Day/Day.styled';
interface DayProps {
  value: number;
}
export function Day({ value }: DayProps) {
  return (
    <StyledDayWrapper
      width={calcWidth(15)}
      height={calcHeight(18)}
      isBackgroundVisibly={false}
    >
      <StyledDayText size={calcFontSize(10)}>{value}</StyledDayText>
    </StyledDayWrapper>
  );
}
