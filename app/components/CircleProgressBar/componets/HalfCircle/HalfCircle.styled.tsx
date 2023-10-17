import styled from 'styled-components/native';

import { RADIUS } from 'app/components/CircleProgressBar/constants';
import { colors, MainColorName } from 'app/constants/color';

export const StyledHalfCircleWrapper = styled.View`
  width: ${RADIUS}px;
  height: ${RADIUS * 2}px;
  overflow: hidden;
`;
export const StyledHalfCircle = styled.View<{
  color: string;
}>`
  width: ${RADIUS * 2}px;
  height: ${RADIUS * 2}px;
  border-radius: ${RADIUS}px;
  border-width: 10px;
  border-color: ${({ color }) => color};
  background-color: ${colors[MainColorName.BLUE]};
`;
