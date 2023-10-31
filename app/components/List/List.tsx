import React from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SoundsItem } from 'app/redux/timer/slice';

import { CheckMarkIcon } from 'app/assets/icon';
import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItemTextWrapper,
  StyledListItemWrapper,
  StyledListWrapper,
} from 'app/components/List/List.styled';

interface ListPropsI {
  current: number;
  data?: Array<SoundsItem>;
  setCurrent: (index: number) => void;
}
interface RenderItemI {
  item: SoundsItem;
  index: number;
}
// const data = [
//   { title: 'first' },
//   { title: 'second' },
//   { title: 'therd' },
//   { title: 'fourth' },
//   { title: 'sixth' },
// ];
export function List({ current, data = [], setCurrent }: ListPropsI) {
  const Icon = () => <CheckMarkIcon testID={'CheckMarkIconTest'} />;

  const renderItem = ({ item, index }: RenderItemI) => {
    const { title } = item;
    const onPress = () => setCurrent(index);
    return (
      <StyledListItemWrapper>
        <StyledListItemIcon onPress={onPress}>
          {current === index && <Icon />}
        </StyledListItemIcon>
        <StyledListItemTextWrapper isLastIndex={index === data?.length - 1}>
          <TouchableOpacity onPress={onPress}>
            <StyledListItemText>{title}</StyledListItemText>
          </TouchableOpacity>
        </StyledListItemTextWrapper>
      </StyledListItemWrapper>
    );
  };

  return (
    <StyledListWrapper>
      <FlatList data={data} renderItem={renderItem} />
    </StyledListWrapper>
  );
}
