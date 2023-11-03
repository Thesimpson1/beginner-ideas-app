import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
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
const Icon = () => <CheckMarkIcon testID={'CheckMarkIconTestID'} />;
export function List({ current, data = [], setCurrent }: ListPropsI) {
  const renderItem = ({ item, index }: RenderItemI) => {
    const { title } = item;
    const onPress = () => setCurrent(index);
    return (
      <StyledListItemWrapper testID={'StyledListItemWrapperTestID'}>
        <StyledListItemIcon
          onPress={onPress}
          testID={'StyledListItemIconTestID'}
        >
          {current === index && <Icon />}
        </StyledListItemIcon>
        <StyledListItemTextWrapper
          isLastIndex={index === data?.length - 1}
          testID={'StyledListItemTextWrapperTestID'}
        >
          <TouchableOpacity
            onPress={onPress}
            testID={'TouchableOpacityTextTestID'}
          >
            <StyledListItemText testID={'StyledListItemTextTestID'}>
              {title}
            </StyledListItemText>
          </TouchableOpacity>
        </StyledListItemTextWrapper>
      </StyledListItemWrapper>
    );
  };

  return (
    <StyledListWrapper testID={'StyledListWrapperTestID'}>
      <FlatList data={data} renderItem={renderItem} testID={'FlatListTestID'} />
    </StyledListWrapper>
  );
}
