import React, { useState } from 'react';

import { SearchIcon } from 'app/assets/icon';
import { colors, MainColorName } from 'app/constants/color';
import {
  StyledEmptyWrapper,
  StyledSearchContainer,
} from 'app/screens/Notes/components/Search/Search.styled';

interface SearchPropsI {}
const Icon = () => <SearchIcon testID={'CreateNoteIconTestID'} />;
export function Search({}: SearchPropsI) {
  const [text, setText] = useState('');
  return (
    <StyledSearchContainer>
      <Icon />
      <StyledEmptyWrapper
        autoCapitalize={'none'}
        value={text}
        selectionColor={colors[MainColorName.ORANGE]}
        placeholderTextColor={colors[MainColorName.GRAY_BLUE]}
        onChangeText={setText}
        autoCorrect={false}
        placeholder={'Search'}
      />
    </StyledSearchContainer>
  );
}
