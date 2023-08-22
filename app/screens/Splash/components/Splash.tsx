import React from 'react';

import { StyledCenteredWrapper } from 'app/utils/common-styled-components';
import { StyledLottieView } from 'app/screens/Splash/components/Splash.styled';

export function Splash() {
  return (
    <StyledCenteredWrapper testID={'SplashWrapperTestID'}>
      <StyledLottieView
        source={require('app/assets/lottie-animated-image/splash-screen.json')}
      />
    </StyledCenteredWrapper>
  );
}
