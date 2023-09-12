import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors } from 'app/constants/color';

export const StyledRoundButtonWrapper = styled.TouchableOpacity<{
  backgroundColor: string;
  width: number;
}>`
  width: ${({ width }) => calcWidth(width)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  align-self: center;
  height: ${calcHeight(40)}px;
  border-radius: ${calcWidth(30)}px;
`;
export const StyledRoundButtonTitle = styled(StyledTextH3)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors.WHITE)};
  font-size: ${calcFontSize(14)}px;
`;
