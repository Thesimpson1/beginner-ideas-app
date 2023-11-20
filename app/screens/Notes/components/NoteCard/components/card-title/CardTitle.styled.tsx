import styled from 'styled-components/native';

import { StyledTextH2 } from 'app/utils/common-styled-components';
import { calcFontSize } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledFlatListTitleContainer = styled.View<{
  isDisabled: boolean;
}>`
  flex-direction: row;
  display: ${({ isDisabled }) => (isDisabled ? 'none' : 'flex')};
`;
export const StyledTitle = styled(StyledTextH2)<{
  isHighlight: boolean;
}>`
  font-size: ${calcFontSize(16)}px;
  color: ${({ isHighlight }) =>
    isHighlight ? colors[MainColorName.ORANGE] : colors[MainColorName.WHITE]};
`;
