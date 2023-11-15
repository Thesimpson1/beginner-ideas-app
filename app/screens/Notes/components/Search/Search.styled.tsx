import styled from 'styled-components/native';

import { calcFontSize, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledSearchContainer = styled.View`
  flex-direction: row;
  padding: ${calcWidth(10)}px;
  margin: ${calcWidth(15)}px 0;
  background-color: ${colors[MainColorName.LIGHT_BLUE]};
  align-items: center;
  border-radius: ${calcWidth(10)}px;
`;
export const StyledEmptyWrapper = styled.TextInput`
  margin-left: ${calcWidth(5)}px;
  font-size: ${calcFontSize(16)}px;
  color: ${colors[MainColorName.WHITE]};
`;
