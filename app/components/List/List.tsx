import React, { JSXElementConstructor, ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackScreenName } from 'app/types';

import { CheckMarkIcon, NoteIcon } from 'app/assets/icon';
import {
  StyledCardTitleText,
  StyledCardWrapper,
  StyledIconWrapper,
} from 'app/components/Card/Card.styled';
import {
  StyledList,
  StyledListItemIcon,
  StyledListItemText,
  StyledListItemTextWrapper,
  StyledListItemWrapper,
  StyledListWrapper,
} from 'app/components/List/List.styled';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';

interface CardPropsI {
  icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  testID?: string;
}
const data = [
  { title: 'first' },
  { title: 'second' },
  { title: 'therd' },
  { title: 'fourth' },
  { title: 'sixth' },
];
export function List({
  icon = <CheckMarkIcon testID={'CheckMarkIconTest'} />,
  testID = 'CardTestID',
}: CardPropsI) {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  // const onPress = () => navigation.navigate(title);
  const Icon = () => icon;
  const renderItem = ({ item, index }) => {
    const { title } = item;
    return (
      <StyledListItemWrapper>
        <StyledListItemIcon>
          <Icon />
        </StyledListItemIcon>
        <StyledListItemTextWrapper isLastIndex={index === data.length - 1}>
          <TouchableOpacity>
            <StyledListItemText>{title}</StyledListItemText>
          </TouchableOpacity>
        </StyledListItemTextWrapper>
      </StyledListItemWrapper>
    );
  };

  return (
    <StyledListWrapper>
      <StyledList data={data} renderItem={renderItem} />
    </StyledListWrapper>
  );
}
