import React, { useEffect, useState } from 'react';
import ToastMessage from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { StyledSplashContainer } from 'app/App.styled';
import { getUserInfo } from 'app/redux/auth/slice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';

import { StyledAnimatedWrapper } from 'app/utils/common-styled-components';
import { toastMessageConfig } from 'app/components/Toasts/Toast';
import { MainStack } from 'app/navigation/app/MainStack.navigator';
import { SplashContainer } from 'app/screens/Splash/SplashContainer';

export const RootNavigator = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  const onReady = () => {
    return setTimeout(() => setIsReady(true), 3000);
  };
  const isReallyReady = isReady && (user || user === null);

  return (
    <NavigationContainer onReady={onReady}>
      <StyledSplashContainer>
        <SplashContainer isReady={!!isReallyReady}>
          <StyledAnimatedWrapper>
            <MainStack />
            <ToastMessage config={toastMessageConfig} />
          </StyledAnimatedWrapper>
        </SplashContainer>
      </StyledSplashContainer>
    </NavigationContainer>
  );
};
