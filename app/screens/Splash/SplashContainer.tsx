import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { StyledWrapper } from 'app/utils/common-styled-components';
import { Splash } from 'app/screens/Splash/components/Splash';

type SplashContainerPropsType = {
  children: ReactNode;
  isReady: boolean;
};

export function SplashContainer({
  children,
  isReady,
}: SplashContainerPropsType) {
  return (
    <StyledWrapper testID={'SplashContainerTestID'}>
      {isReady ? <View>{children}</View> : <Splash />}
    </StyledWrapper>
  );
}
