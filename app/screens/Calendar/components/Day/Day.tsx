import React from 'react';
import { Text } from 'react-native';

import { StyledMainWrapperWithAnimation } from 'app/utils/common-styled-components';
import {calcFontSize, calcHeight, calcWidth} from 'app/utils/scaling-system';
import {
  StyledDayText,
  StyledDayWrapper,
} from 'app/screens/Calendar/components/Day/Day.styled';

export function Day() {
  return (
    <StyledDayWrapper
      width={calcWidth(20)}
      height={calcHeight(20)}
      isBackgroundVisibly={false}
    >
      <StyledDayText size={calcFontSize(12)}>19</StyledDayText>
    </StyledDayWrapper>
  );
}
