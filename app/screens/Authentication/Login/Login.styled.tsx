import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  height,
} from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledLoginScreenContainer = styled.View`
  height: ${height}px;
  justify-content: space-between;
`;
export const StyledLoginScreenTopContainer = styled.View`
  background-color: ${colors.BLUE};
  border-bottom-left-radius: ${calcWidth(40)}px;
  border-bottom-right-radius: ${calcWidth(40)}px;
  flex: 2;
  justify-content: flex-end;
`;
export const StyledLoginScreenCenterContainer = styled.View`
  flex: 4;
`;
export const StyledLoginScreenBottomContainer = styled.View`
  background-color: ${colors.BLUE};
  border-top-left-radius: ${calcWidth(40)}px;
  border-top-right-radius: ${calcWidth(40)}px;
  flex: 1;
`;
export const StyledLoginScreenCenterTitle = styled(StyledTextH3)`
  font-size: 24px;
  color: ${colors.BLUE};
  align-self: center;
  margin: ${calcFontSize(30)}px 0;
`;
export const StyledSimpleButtonContainer = styled.View`
  align-self: center;
  flex-direction: row;
  margin-top: ${calcHeight(20)}px;
`;
export const StyledLine = styled.View`
  height: ${calcHeight(2)}px;
  width: ${calcWidth(50)}px;
  margin: 0 ${calcWidth(10)}px;
  align-self: center;
  opacity: 0.4;
  background-color: ${colors[MainColorName.BLACK]};
`;
