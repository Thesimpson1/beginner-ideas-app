import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCardContainer = styled.View`
  background-color: ${colors[MainColorName.LIGHT_BLUE]};
  margin: ${calcWidth(10)}px 0;
  padding: 0 ${calcWidth(20)}px;
  border-radius: ${calcWidth(10)}px;
`;
export const StyledRenderItemWrapper = styled.TouchableOpacity<{
  isDisplayBottomBorder: boolean;
}>`
  padding: ${calcWidth(10)}px 0;
  border-bottom-width: ${({ isDisplayBottomBorder }) =>
    isDisplayBottomBorder ? calcWidth(1) : 0}px;
  border-color: ${colors[MainColorName.GRAY_BLUE]};
`;
export const StyledTitle = styled(StyledTextH2)`
  font-size: ${calcFontSize(16)}px;
  color: ${colors[MainColorName.WHITE]};
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
