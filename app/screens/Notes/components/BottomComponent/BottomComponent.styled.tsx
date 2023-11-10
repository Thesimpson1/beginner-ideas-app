import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledBottomComponentContainer = styled.View`
  height: ${calcHeight(40)}px;
  flex-direction: row;
`;

export const StyledEmptyWrapper = styled.View`
  flex: 3;
`;
export const StyledBottomBodyWrapper = styled.View`
  flex-direction: row;
  margin-top: ${calcHeight(10)}px;
  justify-content: space-between;
  align-self: center;
  flex: 4;
`;
export const StyledBottomComponentText = styled(StyledTextH3)`
  font-size: ${calcFontSize(12)}px;
  color: ${colors[MainColorName.WHITE]};
  align-self: center;
`;
