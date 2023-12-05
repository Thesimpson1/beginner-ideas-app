import { FlatList, TextProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import styled from 'styled-components/native';

import { colors } from 'app/constants/color';

export const StyledWrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
`;
export const StyledCenteredWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const StyledAnimatedWrapper = styled(Animated.View).attrs({
  entering: FadeIn.duration(500),
})`
  flex: 1;
` as typeof Animated.View;
export const StyledAnimatedSimpleViewWrapper = styled(Animated.View).attrs({
  entering: FadeIn.duration(500),
})``;
export const StyledTextH1 = styled.Text<TextProps>`
  font-family: Inter-Bold;
`;
export const StyledTextH2 = styled.Text<TextProps>`
  font-family: Inter-SemiBold;
`;
export const StyledTextH3 = styled.Text<TextProps>`
  font-family: Inter-Regular;
`;
export const StyledTextH4 = styled.Text<TextProps>`
  font-family: Inter-Thin;
`;
