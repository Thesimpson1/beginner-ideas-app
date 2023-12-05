import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import {
  StyledAnimatedWrapper,
  StyledTextH1,
} from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledTimerScreenContainer = styled(StyledAnimatedWrapper)`
  background-color: ${colors[MainColorName.BLUE]};
  padding: ${calcHeight(20)}px ${calcWidth(15)}px 0 ${calcWidth(15)}px;
` as typeof Animated.View;
export const StyledCardWithTitleWrapper = styled.View<{
  isLastIndex: boolean;
}>`
  margin-bottom: ${({ isLastIndex }) => (isLastIndex ? calcHeight(80) : 0)}px;
`;
export const StyledLabel = styled(StyledTextH1)`
  font-size: ${calcFontSize(22)}px;
  color: ${colors[MainColorName.WHITE]};
  margin-left: ${calcWidth(15)}px;
`;
