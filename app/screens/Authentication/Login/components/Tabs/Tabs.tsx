import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  ListRenderItemInfo,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import {
  StyledButtonWrapper,
  StyledFlatListContainer,
  StyledTabsContainer,
} from 'app/screens/Authentication/Login/components/Tabs/Tabs.styled';

interface TabsPropsI {
  buttonList: Array<string>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}
type ListRenderItem<ItemT> = (
  info: ListRenderItemInfo<ItemT>
) => React.ReactElement | null;

export function Tabs({
  buttonList,
  currentIndex,
  setCurrentIndex,
}: TabsPropsI) {
  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    const onPress = () => setCurrentIndex(index);
    return (
      <StyledButtonWrapper
        isCurrentIndex={index === currentIndex}
        testID={'StyledButtonWrapperTestID'}
      >
        <SimpleButton
          title={item}
          onPress={onPress}
          onPressTestID={'TabsSimpleButton'}
          key={Math.random().toString()}
        />
      </StyledButtonWrapper>
    );
  };
  return (
    <StyledTabsContainer testID={'StyledTabsContainerTestID'}>
      <StyledFlatListContainer data={buttonList} renderItem={renderItem} />
    </StyledTabsContainer>
  );
}
