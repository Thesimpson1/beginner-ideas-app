import styled from 'styled-components/native';

import {
  StyledAnimatedWrapper,
  StyledTextH1,
  StyledTextH2,
} from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledTimerScreenContainer = styled(StyledAnimatedWrapper)`
  background-color: ${colors[MainColorName.BLUE]};
  padding: ${calcHeight(20)}px ${calcWidth(15)}px;
`;
export const StyledLabel = styled(StyledTextH1)`
  font-size: ${calcFontSize(22)}px;
  color: ${colors[MainColorName.WHITE]};
  margin-left: ${calcWidth(15)}px;
`;
