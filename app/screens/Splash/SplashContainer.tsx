import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { Splash } from 'app/screens/Splash/components/Splash';
import { StyledSplashContainer } from 'app/screens/Splash/SplashContainer.styled';

type SplashContainerPropsType = {
  children: ReactNode;
  isReady: boolean;
};

export function SplashContainer({
  children,
  isReady,
}: SplashContainerPropsType) {
  return (
    <StyledSplashContainer>
      {isReady ? <View>{children}</View> : <Splash />}
    </StyledSplashContainer>
  );
}
