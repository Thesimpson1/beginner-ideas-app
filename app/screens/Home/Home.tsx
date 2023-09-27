import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserInfo, logout } from 'app/redux/auth/slice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { HomeStackScreenName } from 'app/types';

import { StyledAnimatedWrapper } from 'app/utils/common-styled-components';
import { Card } from 'app/components/Card/Card';
import { Loading } from 'app/components/Loading/Loading';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import {
  StyledHomeScreenContainer,
  StyledHomeText,
  StyledHomeTextWrapper,
  StyledTopWrapper,
  StyledUserText,
} from 'app/screens/Home/Home.styled';
import { setIcon } from 'app/screens/Home/utils/utils';

const homeData: Array<HomeStackScreenName> = [
  HomeStackScreenName.CALCULATOR,
  HomeStackScreenName.CALENDAR,
  HomeStackScreenName.NOTES,
];
const renderItem = ({ item }: { item: HomeStackScreenName }) => {
  const icon = setIcon(item);
  return (
    <>
      <Card title={item} icon={icon} testID={'CardFromHomeTestID'} />
    </>
  );
};
export function HomeScreen() {
  const { user, isLogout } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [localUser] = useState(user === '' ? 'Guest' : user);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const onSignOut = () => {
    dispatch(logout());
  };
  const redirectToLogin = () => {
    setIsShowLoading(true);
    dispatch(getUserInfo());
  };
  // when user logged out, then redirect to login screen
  useEffect(() => {
    if (!user && !isShowLoading) {
      if (localUser !== 'Guest') {
        return navigation.navigate(HomeStackScreenName.LOGIN_FROM_HOME);
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [isShowLoading, localUser, navigation, user]);
  //when logout was run , show loading
  useEffect(() => {
    if (isLogout) {
      setIsShowLoading(true);
    }
    if (!isLogout || (localUser === 'Guest' && user === null)) {
      setTimeout(() => setIsShowLoading(false), 3000);
    }
  }, [isLogout, isShowLoading, localUser, navigation, user]);
  const simpleButtonTitle = localUser === 'Guest' ? 'Sign in' : 'Sign out';
  const simpleButtonPress = () =>
    localUser === 'Guest' ? redirectToLogin() : onSignOut();

  return (
    <StyledAnimatedWrapper>
      <StyledHomeScreenContainer testID={'StyledHomeScreenContainerTestID'}>
        <StyledTopWrapper>
          <StyledHomeTextWrapper>
            <StyledUserText testID={'StyledUserTextTestID'}>
              {localUser}
            </StyledUserText>
            <SimpleButton
              onPress={simpleButtonPress}
              title={simpleButtonTitle}
              size={14}
              onPressTestID={'HomeRightButtonTestID'}
            />
          </StyledHomeTextWrapper>
          <StyledHomeText>Home</StyledHomeText>
        </StyledTopWrapper>
        <FlatList data={homeData} renderItem={renderItem} />
      </StyledHomeScreenContainer>
      {isShowLoading && <Loading />}
    </StyledAnimatedWrapper>
  );
}
