import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Animated, { SharedValue } from 'react-native-reanimated';

import { SearchIcon } from 'app/assets/icon';
import { colors, MainColorName } from 'app/constants/color';
import { useGetAnimatedStyles } from 'app/screens/Notes/components/Search/hooks/useGetAnimatedStyles';
import { useSearchLogic } from 'app/screens/Notes/components/Search/hooks/useSearchLogic';
import {
  StyledEmptyWrapper,
  StyledSearchContainer,
} from 'app/screens/Notes/components/Search/Search.styled';
import { CardItemI } from 'app/screens/Notes/Notes';

interface SearchPropsI {
  offset: SharedValue<number>;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  setText: (text: string) => void;
  data: Array<CardItemI>;
  text: string;
  setDataAfterSearch: Dispatch<SetStateAction<CardItemI[]>>;
}
const Icon = () => <SearchIcon testID={'CreateNoteIconTestID'} />;
export function Search({
  offset,
  setIsFocus,
  setText,
  text,
  data,
  setDataAfterSearch,
}: SearchPropsI) {
  const { textAnimatedStyle, wrapperAnimatedStyle } = useGetAnimatedStyles({
    offset,
  });
  const { dataAfterSearch } = useSearchLogic({ text, data });
  useEffect(() => {
    setDataAfterSearch(dataAfterSearch);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledSearchContainer style={wrapperAnimatedStyle}>
      <Animated.View style={textAnimatedStyle}>
        <Icon />
      </Animated.View>

      <Animated.View style={textAnimatedStyle}>
        <StyledEmptyWrapper
          autoCapitalize={'none'}
          value={text}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          selectionColor={colors[MainColorName.ORANGE]}
          placeholderTextColor={colors[MainColorName.GRAY_BLUE]}
          onChangeText={setText}
          autoCorrect={false}
          placeholder={'Search'}
        />
      </Animated.View>
    </StyledSearchContainer>
  );
}
