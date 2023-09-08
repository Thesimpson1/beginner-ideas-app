import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { EyeIcon, PasswordIcon } from 'app/assets/icon';
import {
  shadow,
  StyledCustomInput,
  StyledCustomInputContainer,
  StyledDropShadow,
  StyledErrorText,
  StyledErrorWrapper,
  StyledLeftIconWrapper,
  StyledRightIconWrapper,
} from 'app/components/CustomInput/CustomInput.styled';
import { colors } from 'app/constants/color';

interface CustomInputPropsI {
  onChangeText: (value: string) => void;
  value: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  isPassword?: boolean;
  icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  error?: string;
}
export function CustomInput({
  onChangeText,
  onBlur = () => {},
  value,
  placeholder,
  icon = <PasswordIcon testID={'PasswordIconTest'} />,
  isPassword = false,
  error,
}: CustomInputPropsI) {
  const [isDisplayPassword, setIsDisplayPassword] = useState(true);
  const onEyeClick = () => setIsDisplayPassword((prevState) => !prevState);
  const Icon = () => icon;
  return (
    <StyledCustomInputContainer testID={'StyledCustomInputContainerTest'}>
      <StyledDropShadow style={{ ...shadow }}>
        <StyledLeftIconWrapper testID={'StyledLeftIconWrapperTest'}>
          <Icon />
        </StyledLeftIconWrapper>
        <StyledCustomInput
          onChangeText={onChangeText}
          autoCapitalize={'none'}
          autoCorrect={false}
          onBlur={onBlur}
          placeholderTextColor={colors.BLUE}
          placeholder={placeholder}
          value={value}
          secureTextEntry={isPassword && isDisplayPassword}
          testID={'StyledCustomInputTest'}
        />
        {isPassword && (
          <StyledRightIconWrapper
            onPress={onEyeClick}
            testID={'StyledRightIconWrapperTest'}
          >
            <EyeIcon testID={'EyeIconTest'} />
          </StyledRightIconWrapper>
        )}
      </StyledDropShadow>
      <StyledErrorWrapper>
        <StyledErrorText testID={'StyledErrorTextTest'}>
          {error}
        </StyledErrorText>
      </StyledErrorWrapper>
    </StyledCustomInputContainer>
  );
}
