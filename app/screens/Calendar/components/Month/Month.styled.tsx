import styled from 'styled-components/native';

import { StyledTextH1, StyledTextH2 } from 'app/utils/common-styled-components';
import {calcHeight, calcWidth} from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledMonthWrapper = styled.View<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  
  padding: ${calcWidth(5)}px;
`;
export const StyledMonthTitle = styled(StyledTextH1)<{
  size: number;
  color: string;
}>`
  color: ${({ color }) => color && color};
  font-size: ${({ size }) => size && size}px;
`;
