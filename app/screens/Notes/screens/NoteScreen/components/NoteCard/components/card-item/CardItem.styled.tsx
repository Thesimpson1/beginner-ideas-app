
import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';
export const StyledRenderItemWrapper = styled.TouchableOpacity<{
  isDisplayBottomBorder: boolean;
}>`
  padding: ${calcWidth(10)}px 0;
  border-bottom-width: ${({ isDisplayBottomBorder }) =>
    isDisplayBottomBorder ? calcWidth(1) : 0}px;
  border-color: ${colors[MainColorName.GRAY_BLUE]};
`;
export const StyledSubTitleWrapper = styled.View`
  flex-direction: row;
`;
export const StyledSubTitle = styled(StyledTextH3)<{
  isAdditionalSpaceAfter?: boolean;
}>`
  font-size: ${calcFontSize(14)}px;
  color: ${colors[MainColorName.GRAY_BLUE]};
  margin-right: ${({ isAdditionalSpaceAfter }) =>
    isAdditionalSpaceAfter ? calcWidth(10) : 0}px;
`;
export const StyledTitle = styled(StyledTextH2)<{
  isSearch: boolean;
}>`
  font-size: ${calcFontSize(16)}px;
  color: ${colors[MainColorName.WHITE]};
  display: ${({ isSearch }) => (isSearch ? 'none' : 'flex')};
`;
