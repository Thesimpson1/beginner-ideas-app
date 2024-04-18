import styled from 'styled-components/native';

import { calcFontSize, calcWidth } from 'app/utils/scaling-system';

export const StyledInputWrapper = styled.TextInput`
  font-size: ${calcFontSize(20)}px;
  font-family: Inter-Regular;
  padding: ${calcWidth(20)}px 0 ${calcWidth(10)}px ${calcWidth(10)}px;
`;
