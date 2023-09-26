import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from 'app/components/Loading/Loading';

describe('Loading component', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(<Loading />);

    const StyledLoadingWrapperTestID = getByTestId(
      'StyledLoadingWrapperTestID'
    ).props;
    const ActivityLoadingIndicatorTestID = getByTestId(
      'ActivityLoadingIndicatorTestID'
    ).props;

    expect(StyledLoadingWrapperTestID.children).toBeTruthy();
    expect(ActivityLoadingIndicatorTestID.size).toBe('large');
  });
});
