import styled from 'styled-components/native';

import { RADIUS } from 'app/components/CircleProgressBar/constants';
import { colors, MainColorName } from 'app/constants/color';

export const StyledHalfCircleWrapper = styled.View`
  width: ${RADIUS * 2}px;
  height: ${RADIUS}px;
  overflow: hidden;
`;
export const StyledHalfCircle = styled.View<{
  backgroundColor: string;
}>`
  width: ${RADIUS * 2}px;
  height: ${RADIUS * 2}px;
  border-radius: ${RADIUS}px;
  border-width: 20px;
  border-color: ${({ backgroundColor }) => backgroundColor};
  background-color: ${colors[MainColorName.BLUE]};
`;
