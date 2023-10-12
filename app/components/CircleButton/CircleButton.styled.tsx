import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCircleButtonWrapper = styled.TouchableOpacity<{
  backgroundColor: string;
  isDisabled?: boolean;
}>`
  width: ${calcWidth(80)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  align-self: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  height: ${calcWidth(80)}px;
  border-radius: ${calcWidth(80)}px;
`;
export const StyledSecondCircleButtonWrapper = styled.View`
  width: ${calcWidth(75)}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: ${calcWidth(75)}px;
  border-radius: ${calcWidth(75)}px;
  border-width: 2px;
  border-color: ${colors[MainColorName.BLUE]};
`;
export const StyledCircleButtonTitle = styled(StyledTextH3)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors.WHITE)};
  font-size: ${calcFontSize(14)}px;
`;
