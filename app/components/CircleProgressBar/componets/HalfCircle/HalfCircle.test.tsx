import React from 'react';
import { render } from '@testing-library/react-native';

import { HalfCircleWrapper } from 'app/components/CircleProgressBar/componets/HalfCircle/HalfCircle';
import { colors, MainColorName } from 'app/constants/color';

describe('Half Circle Wrapper', () => {
  it('Should render component with required props', () => {
    const { getByTestId } = render(
      <HalfCircleWrapper color={colors[MainColorName.GRAY_BLUE]} />
    );

    const StyledHalfCircleWrapperTestID = getByTestId(
      'StyledHalfCircleWrapperTestID'
    ).props;
    const StyledHalfCircleTestID = getByTestId('StyledHalfCircleTestID').props;

    expect(StyledHalfCircleWrapperTestID).toBeTruthy();
    expect(StyledHalfCircleTestID.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
  });
  it('Should render correct', () => {
    const { getByTestId } = render(
      <HalfCircleWrapper color={colors[MainColorName.GREEN]} />
    );

    const StyledHalfCircleWrapperTestID = getByTestId(
      'StyledHalfCircleWrapperTestID'
    ).props;
    const StyledHalfCircleTestID = getByTestId('StyledHalfCircleTestID').props;

    expect(StyledHalfCircleWrapperTestID).toBeTruthy();
    expect(StyledHalfCircleTestID.style.borderBottomColor).toBe(
      colors[MainColorName.GREEN]
    );
  });
});
