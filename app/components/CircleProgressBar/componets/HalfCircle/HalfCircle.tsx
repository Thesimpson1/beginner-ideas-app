import React from 'react';

import {
  StyledHalfCircle,
  StyledHalfCircleWrapper,
} from 'app/components/CircleProgressBar/componets/HalfCircle/HalfCircle.styled';

interface HalfCircleWrapperI {
  color: string;
}

export function HalfCircleWrapper({ color }: HalfCircleWrapperI) {
  return (
    <StyledHalfCircleWrapper testID={'StyledHalfCircleWrapperTestID'}>
      <StyledHalfCircle color={color} testID={'StyledHalfCircleTestID'} />
    </StyledHalfCircleWrapper>
  );
}
