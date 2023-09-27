import React, { JSXElementConstructor, ReactElement } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackScreenName } from 'app/types';

import { NoteIcon } from 'app/assets/icon';
import {
  StyledCardTitleText,
  StyledCardWrapper,
  StyledIconWrapper,
} from 'app/components/Card/Card.styled';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';

interface CardPropsI {
  icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  title?: HomeStackScreenName;
  testID?: string;
}
export function Card({
  icon = <NoteIcon testID={'NoteIconTest'} />,
  title = HomeStackScreenName.HOME,
  testID = 'CardTestID',
}: CardPropsI) {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const onPress = () => navigation.navigate(title);
  const Icon = () => icon;
  return (
    <StyledCardWrapper onPress={onPress} testID={testID}>
      <StyledIconWrapper>
        <Icon />
      </StyledIconWrapper>
      <StyledCardTitleText testID={'StyledCardTitleTextTestID'}>
        {title}
      </StyledCardTitleText>
    </StyledCardWrapper>
  );
}
