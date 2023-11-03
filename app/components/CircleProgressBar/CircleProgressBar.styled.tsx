import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { calcHeight, calcWidth, height } from 'app/utils/scaling-system';

export const isBigHeight = height > 790;
export const top = isBigHeight
  ? height / 3 - calcHeight(30)
  : height / 2.6 - calcHeight(30);
export const StyledCircleProgressBarWrapper = styled.View`
  max-height: ${isBigHeight ? calcHeight(300) : calcHeight(350)}px;
`;
export const StyledCircleProgressBarContainer = styled.View`
  flex-direction: row;
`;
export const StyledTopCircleProgressBarWrapper = styled.View``;

export const StyledBottomCircleProgressBarWrapper = styled.View`
  transform: rotate(180deg);
  z-index: 1;
`;
//transform: rotate(180deg);
export const StyledAnimatedPart = styled(Animated.View).attrs({})`
  position: absolute;
  top: 0;
`;
export const StyledBottomCircleTextWrapper = styled.View<{
  isShowTimePicker: boolean;
}>`
  align-items: center;
  top: -${({ isShowTimePicker }) => (isShowTimePicker ? top + calcWidth(25) : top)}px;
  z-index: 2;
`;
