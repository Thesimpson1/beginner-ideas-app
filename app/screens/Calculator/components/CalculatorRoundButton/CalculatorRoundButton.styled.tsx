import styled from 'styled-components/native';

import { StyledTextH1 } from 'app/utils/common-styled-components';
import { calcFontSize, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCalculatorRoundButtonContainer = styled.TouchableOpacity<{
  backgroundColor?: string;
  isLong: boolean;
  isClicked?: boolean;
}>`
  width: ${({ isLong }) => (isLong ? calcWidth(150) : calcWidth(70))}px;
  height: ${calcWidth(70)}px;
  border-radius: ${calcWidth(70)}px;
  opacity: ${({ isClicked }) => (isClicked ? 0.5 : 1)};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors[MainColorName.WHITE]};
  justify-content: center;
  align-items: center;
  margin: ${calcWidth(5)}px;
`;
export const StyledCalculatorRoundButtonText = styled(StyledTextH1)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors[MainColorName.BLACK])};
  font-size: ${calcFontSize(28)}px;
`;
