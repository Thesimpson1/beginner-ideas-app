import styled from 'styled-components/native';

import {
  StyledAnimatedWrapper,
  StyledTextH1,
} from 'app/utils/common-styled-components';
import { calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCalculatorRoundButtonContainer = styled.TouchableOpacity<{
  backgroundColor?: string;
  isLong: boolean;
}>`
  width: ${({ isLong }) => (isLong ? calcWidth(150) : calcWidth(70))}px;
  height: ${calcWidth(70)}px;
  border-radius: ${calcWidth(70)}px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors[MainColorName.WHITE]};
  justify-content: center;
  align-items: center;
`;
export const StyledCalculatorRoundButtonText = styled(StyledTextH1)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors[MainColorName.BLACK])};
  font-size: 42px;
`;
