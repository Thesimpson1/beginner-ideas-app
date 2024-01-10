import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Animated, { SharedValue, useSharedValue } from 'react-native-reanimated';

import { SearchIcon } from 'app/assets/icon';
import { calcHeight, width } from 'app/utils/scaling-system';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import { useGetAnimatedStyles } from 'app/screens/Notes/screens/NoteScreen/components/Search/hooks/useGetAnimatedStyles';
import { useSearchLogic } from 'app/screens/Notes/screens/NoteScreen/components/Search/hooks/useSearchLogic';
import {
  StyledCancelWrapper,
  StyledEmptyWrapper,
  StyledSearchContainer,
  StyledSearchWrapper,
} from 'app/screens/Notes/screens/NoteScreen/components/Search/Search.styled';
import { CardItemI } from 'app/screens/Notes/types';

interface SearchPropsI {
  offset: SharedValue<number>;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  setText: (text: string) => void;
  data: Array<CardItemI>;
  text: string;
  isRunSearchAnimation: boolean;
  setDataAfterSearch: Dispatch<SetStateAction<CardItemI[]>>;
  isEmptyScreen: boolean;
}
const Icon = () => <SearchIcon testID={'CreateNoteIconTestID'} />;
export function Search({
  offset,
  setIsFocus,
  setText,
  text,
  data,
  setDataAfterSearch,
  isRunSearchAnimation,
  isEmptyScreen,
}: SearchPropsI) {
  const searchWidth = useSharedValue('100%');
  const cancelButtonWidth = useSharedValue(0);
  const cancelButtonHeight = useSharedValue(0);
  const cancelButtonOpacity = useSharedValue(0);
  const isBlur = useSharedValue(false);
  const ref = useRef({ blur: () => {} });
  const {
    searchWidthAnimatedStyle,
    cancelButtonWidthAnimatedStyle,
    textAnimatedStyle,
    wrapperAnimatedStyle,
  } = useGetAnimatedStyles({
    offset,
    searchWidth,
    cancelButtonWidth,
    cancelButtonHeight,
    cancelButtonOpacity,
    isBlur,
  });

  const { dataAfterSearch } = useSearchLogic({ text, data });
  useEffect(() => {
    setDataAfterSearch(dataAfterSearch);
  }, [text, data]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFocus = () => {
    isBlur.value = false;
    searchWidth.value = '80%';
    cancelButtonWidth.value = width / 5;
    cancelButtonHeight.value = calcHeight(80);
    cancelButtonOpacity.value = 1;
    setIsFocus(true);
  };
  const onBlur = () => {
    isBlur.value = true;
    searchWidth.value = '100%';
    cancelButtonWidth.value = 0;
    cancelButtonHeight.value = 0;
    cancelButtonOpacity.value = 0;
    setIsFocus(false);
    setText('');
  };

  return (
    <StyledSearchWrapper isEmptyScreen={isEmptyScreen}>
      <StyledSearchContainer
        style={[
          isRunSearchAnimation && wrapperAnimatedStyle,
          searchWidthAnimatedStyle,
        ]}
      >
        <Animated.View style={isRunSearchAnimation && textAnimatedStyle}>
          <Icon />
        </Animated.View>

        <Animated.View style={isRunSearchAnimation && textAnimatedStyle}>
          <StyledEmptyWrapper
            //@ts-ignore
            ref={ref}
            autoCapitalize={'none'}
            value={text}
            onFocus={onFocus}
            onBlur={onBlur}
            selectionColor={colors[MainColorName.ORANGE]}
            placeholderTextColor={colors[MainColorName.GRAY_BLUE]}
            onChangeText={setText}
            autoCorrect={false}
            placeholder={'Search'}
          />
        </Animated.View>
      </StyledSearchContainer>
      <StyledCancelWrapper style={cancelButtonWidthAnimatedStyle}>
        <SimpleButton onPress={() => ref.current.blur()} title={'Cancel'} />
      </StyledCancelWrapper>
    </StyledSearchWrapper>
  );
}
