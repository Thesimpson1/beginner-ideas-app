import styled from 'styled-components/native';

import { calcHeight, calcWidth, height, width } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledMenuIcon = styled.TouchableOpacity`
  margin-right: ${calcWidth(10)}px;
`;
export const StyledHeaderRightComponentWrapper = styled.View`
  position: relative;
`;
export const StyledShadowModalWrapper = styled.Pressable<{
  isVisible: boolean;
}>`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  background-color: ${colors[MainColorName.BLACK]};
  opacity: 0.3;
  right: 0;
  top: ${calcHeight(27)}px;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;
