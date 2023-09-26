import React, { JSXElementConstructor, ReactElement } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardTitleType } from 'app/types';

import { NoteIcon } from 'app/assets/icon';
import {
  StyledCardTitleText,
  StyledCardWrapper,
  StyledIconWrapper,
} from 'app/components/Card/Card.styled';
import { MainStackParamList } from 'app/navigation/app/MainStack.navigator';

interface CardPropsI {
  icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  title: CardTitleType;
  testID?: 'CardTestID';
}
export function Card({
  icon = <NoteIcon testID={'NoteIconTest'} />,
  title,
}: CardPropsI) {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const onPress = () => navigation.navigate(title);
  const Icon = () => icon;
  return (
    <StyledCardWrapper onPress={onPress}>
      <StyledIconWrapper>
        <Icon />
      </StyledIconWrapper>
      <StyledCardTitleText>{title}</StyledCardTitleText>
    </StyledCardWrapper>
  );
}
