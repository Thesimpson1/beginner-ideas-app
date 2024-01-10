import styled from 'styled-components/native';

import { StyledTextH2 } from 'app/utils/common-styled-components';
import { calcFontSize } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledNoNotesWrapper = styled.View<{
  isNoNotes: boolean;
}>`
  display: ${({ isNoNotes }) => !isNoNotes && 'none'};
  flex: 1;
  justify-content: center;
`;

export const StyledNoNotesText = styled(StyledTextH2)`
  font-size: ${calcFontSize(18)}px;
  color: ${colors[MainColorName.WHITE]};
  align-self: center;
`;
