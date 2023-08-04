import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Fallback } from 'app/components/ErrorBoundary/component/Fallback';

describe('Fallback', () => {
  const onPressMock = jest.fn();
  it('Should render component and checks button', () => {
    const { getByText } = render(<Fallback onPress={onPressMock} />);

    expect(getByText('Something went wrong!!!')).toBeTruthy();

    expect(getByText('Please try again later')).toBeTruthy();

    fireEvent.press(getByText('Try again'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
