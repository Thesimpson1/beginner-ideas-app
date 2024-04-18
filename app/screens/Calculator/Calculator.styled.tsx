import styled from 'styled-components/native';

import {
  StyledMainWrapperWithAnimation,
  StyledTextH1,
} from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCalculatorScreenContainer = styled(
  StyledMainWrapperWithAnimation
)`
  align-items: center;
`;
export const StyledCalculatorContentContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: ${calcHeight(50)}px;
`;
export const StyledVisibleNumberContainer = styled.View`
  flex: 2;
  justify-content: flex-end;
  margin-bottom: ${calcHeight(20)}px;
`;
export const StyledCalculatorRoundButtonText = styled(StyledTextH1)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors[MainColorName.WHITE])};
  font-size: ${calcFontSize(62)}px;
`;
