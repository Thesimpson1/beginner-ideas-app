import React from 'react';

import {
  StyledHalfCircle,
  StyledHalfCircleWrapper,
} from 'app/components/CircleProgressBar/componets/HalfCircle/HalfCircle.styled';

interface HalfCircleWrapperI {
  backgroundColor: string;
}
export function HalfCircleWrapper({ backgroundColor }: HalfCircleWrapperI) {
  return (
    <StyledHalfCircleWrapper>
      <StyledHalfCircle backgroundColor={backgroundColor} />
    </StyledHalfCircleWrapper>
  );
}
