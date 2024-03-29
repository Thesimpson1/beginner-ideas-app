import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackScreenName, NotesStackScreenName } from 'app/types';

import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import {
  StyledLeftHeaderDefaultWrapper,
  StyledLeftHeaderWrapper,
  StyledRightArrowIconWrapper,
  StyledRightHeaderWrapper,
  StyledStackScreenHeaderWrapper,
  StyledTitleHeaderText,
  StyledTitleHeaderWrapper,
} from 'app/navigation/navigation-headers/StackScreenHeader/StackScreenHeader.styled';
import { colors, MainColorName } from 'app/constants/color';

interface StackNavigationOptions {
  headerTitle: NotesStackScreenName | HomeStackScreenName;
  headerRight?: React.ReactElement;
  headerLeft?: React.ReactElement;
}
export interface StackScreenHeaderPropsI {
  options: StackNavigationOptions;
}

export function StackScreenHeader({ options }: StackScreenHeaderPropsI) {
  const { headerTitle, headerRight, headerLeft } = options;
  const navigation =
    useNavigation<
      StackNavigationProp<MainNotesParamList | HomeStackParamList>
    >();
  const renderHeaderLeft = useCallback(() => {
    if (headerLeft) {
      return headerLeft;
    }

    return (
      <StyledLeftHeaderDefaultWrapper
        testID={'StyledLeftHeaderDefaultWrapperTestID'}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <StyledRightArrowIconWrapper />
        <SimpleButton title={'Back'} color={colors[MainColorName.BLUE]} />
      </StyledLeftHeaderDefaultWrapper>
    );
  }, [headerLeft, navigation]);
  return (
    <StyledStackScreenHeaderWrapper
      testID={'StyledStackScreenHeaderWrapperTestID'}
    >
      <StyledLeftHeaderWrapper testID={'StyledLeftHeaderWrapperTestID'}>
        {renderHeaderLeft()}
      </StyledLeftHeaderWrapper>
      <StyledTitleHeaderWrapper>
        <StyledTitleHeaderText testID={'StyledTitleHeaderTextTestID'}>
          {headerTitle}
        </StyledTitleHeaderText>
      </StyledTitleHeaderWrapper>
      <StyledRightHeaderWrapper testID={'StyledRightHeaderWrapperTestID'}>
        {headerRight ? headerRight : null}
      </StyledRightHeaderWrapper>
    </StyledStackScreenHeaderWrapper>
  );
}
