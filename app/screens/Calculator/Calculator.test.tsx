import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { CalculatorScreen } from 'app/screens/Calculator/Calculator';

describe('Calculator screen', () => {
  it('Should render correct', () => {
    const screen = renderWithProviders(<CalculatorScreen />);
    const StyledCalculatorContentContainerTestID = screen.getByTestId(
      'StyledCalculatorContentContainerTestID'
    );
    const RenderItemWrapperTestID = screen.getAllByTestId(
      'RenderItemWrapperTestID'
    )[0];
    const StyledCalculatorRoundButtonContainerTestID = screen.getAllByTestId(
      'StyledCalculatorRoundButtonContainerTestID'
    )[6];
    const StyledCalculatorRoundButtonTextTestID = screen.getByTestId(
      'StyledCalculatorRoundButtonTextTestID1'
    );
    expect(StyledCalculatorContentContainerTestID.props.children).toBeTruthy();
    expect(RenderItemWrapperTestID.props.children).toBeTruthy();
    expect(
      StyledCalculatorRoundButtonContainerTestID.props.children
    ).toBeTruthy();
    expect(StyledCalculatorRoundButtonTextTestID.props.children).toBe('0');
    fireEvent.press(StyledCalculatorRoundButtonContainerTestID);
    expect(StyledCalculatorRoundButtonTextTestID.props.children).toBe('9');
  });
});
