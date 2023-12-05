import styled from 'styled-components/native';

import { calcFontSize, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCreateNoteScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors[MainColorName.BLUE]};
`;
export const StyledInputWrapper = styled.TextInput`
  font-size: ${calcFontSize(20)}px;
  font-family: Inter-Regular;
  padding: ${calcWidth(20)}px 0 ${calcWidth(10)}px ${calcWidth(10)}px;
`;
