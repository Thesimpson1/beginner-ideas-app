import styled from 'styled-components/native';

import { StyledTextH2 } from 'app/utils/common-styled-components';
import { colors, MainColorName } from 'app/constants/color';

export const StyledDayWrapper = styled.View<{
  width: number;
  height: number;
  isBackgroundVisibly: boolean;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ isBackgroundVisibly }) =>
    isBackgroundVisibly && colors[MainColorName.RED]};
  justify-content: center;
  align-items: center;
  border-radius: ${({ width }) => width}px;
`;
export const StyledDayText = styled(StyledTextH2)<{
  size: number;
}>`
  color: ${colors.WHITE};
  font-size: ${({ size }) => size && size}px;
`;
