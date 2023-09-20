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
  height: 100%;
  flex: 1;
  background-color: red;
`;

export const StyledLoginScreenCenterTitle = styled(StyledTextH3)`
  font-size: 24px;
  color: ${colors.BLUE};
  align-self: center;
  margin: ${calcFontSize(30)}px 0;
`;
