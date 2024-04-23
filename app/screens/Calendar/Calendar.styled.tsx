import styled from 'styled-components/native';

import { StyledTextH1 } from 'app/utils/common-styled-components';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledYearWrapper = styled.View`
  margin: ${calcWidth(5)}px ${calcWidth(5)}px;
`;
export const StyledYearTitle = styled(StyledTextH1)<{
  size: number;
  color: string;
}>`
  color: ${({ color }) => color && color};
  font-size: ${({ size }) => size && size}px;
  padding: ${calcWidth(5)}px;
`;
export const StyledLine = styled.View`
  height: ${calcHeight(1)}px;

  margin: ${calcWidth(5)}px ${calcWidth(10)}px ${calcWidth(20)}px
    ${calcWidth(10)}px;
  background-color: ${colors[MainColorName.GRAY_BLUE]};
`;
