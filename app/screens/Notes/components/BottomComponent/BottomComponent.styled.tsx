import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import {calcFontSize, calcHeight, calcWidth, width} from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledBottomComponentContainer = styled.View`
  height: ${calcHeight(60)}px;
  flex-direction: row;
  position: absolute;
  background-color: ${colors[MainColorName.BLUE]};
  bottom: 0;
  width: ${width}px;
  padding-right: ${calcWidth(20)}px;
  opacity: 0.9;
`;
export const StyledEmptyWrapper = styled.View`
  flex: 4;
`;
export const StyledBottomBodyWrapper = styled.View`
  flex-direction: row;
  margin-top: ${calcHeight(10)}px;
  justify-content: space-between;
  align-self: center;
  flex: 5;
  margin-bottom: ${calcHeight(20)}px;
`;
export const StyledBottomComponentText = styled(StyledTextH3)`
  font-size: ${calcFontSize(12)}px;
  color: ${colors[MainColorName.WHITE]};
  align-self: center;
`;
