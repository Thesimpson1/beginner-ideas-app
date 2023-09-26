import React from 'react';
import { FlatList } from 'react-native';
import { useAppSelector } from 'app/redux/hooks';
import { CardTitleType } from 'app/types';

import { StyledAnimatedWrapper } from 'app/utils/common-styled-components';
import { Card } from 'app/components/Card/Card';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import {
  StyledHomeScreenContainer,
  StyledHomeText,
  StyledHomeTextWrapper,
  StyledTopWrapper,
  StyledUserText,
} from 'app/screens/Home/Home.styled';
import { setIcon } from 'app/screens/Home/utils/utils';

const homeData: Array<CardTitleType> = [
  CardTitleType.CALCULATOR,
  CardTitleType.CALENDAR,
  CardTitleType.NOTES,
];
const renderItem = ({ item }: { item: CardTitleType }) => {
  const icon = setIcon(item);
  return (
    <>
      <Card title={item} icon={icon} />
    </>
  );
};
export function HomeScreen() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <StyledAnimatedWrapper>
      <StyledHomeScreenContainer>
        <StyledTopWrapper>
          <StyledHomeTextWrapper>
            <StyledUserText>{user}</StyledUserText>
            <SimpleButton onPress={() => {}} title={'Sign out'} size={14} />
          </StyledHomeTextWrapper>
          <StyledHomeText>Home</StyledHomeText>
        </StyledTopWrapper>
        <FlatList data={homeData} renderItem={renderItem} />
      </StyledHomeScreenContainer>
    </StyledAnimatedWrapper>
  );
}
