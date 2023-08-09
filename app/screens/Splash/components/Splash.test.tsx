import React from 'react';
import { render } from '@testing-library/react-native';

import { Splash } from 'app/screens/Splash/components/Splash';

describe('Splash', () => {
  it('Should render component', () => {
    const { getByTestId } = render(<Splash />);

    expect(getByTestId('LottieViewTestID').type).toBe('LottieAnimationView');

    expect(getByTestId('SplashWrapperTestID')).toBeTruthy();
  });
});
