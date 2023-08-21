import React from 'react';

import {
  StyledLottieView,
  StyledSplashComponentContainer,
} from 'app/screens/Splash/components/Splash.styled';

export function Splash() {
  return (
    <StyledSplashComponentContainer testID={'SplashWrapperTestID'}>
      <StyledLottieView
        source={require('app/assets/lottie-animated-image/splash-screen.json')}
      />
    </StyledSplashComponentContainer>
  );
}
