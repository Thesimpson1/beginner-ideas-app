import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledRightMenuWrapper = styled(Animated.View)<{
  top: number;
  right: number;
}>`
  position: absolute;
  top: ${({ top }) => calcHeight(top)}px;
  right: ${({ right }) => calcHeight(right)}px;
  background-color: ${colors[MainColorName.GRAY_BLUE]};
  border-radius: ${calcWidth(15)}px;
  z-index: 2;
`;
export const StyledRightMenuDropdownWrapper = styled(StyledRightMenuWrapper)`
  width: ${calcWidth(200)}px;
`;
export const StyledRotatedArrowWrapper = styled.View`
  transform: rotateZ(90deg);
`;
