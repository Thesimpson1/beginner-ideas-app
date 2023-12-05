import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledMenuItemsWrapper = styled.Pressable<{
  isLastItem: boolean;
}>`
  flex-direction: row;
  border-bottom-width: ${({ isLastItem }) => (isLastItem ? 0 : 1)}px;
  border-color: ${colors[MainColorName.LIGHT_BLUE]};
  padding: 0 ${calcWidth(10)}px 0 ${calcWidth(5)}px;
  align-items: center;
  height: ${calcHeight(50)}px;
  width: ${calcWidth(200)}px;
`;
export const StyledArrowWrapper = styled.View`
  width: ${calcWidth(20)}px;
`;
export const StyledIconAndTextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;
export const StyledRightMenuText = styled(StyledTextH3)`
  color: ${colors[MainColorName.WHITE]};
  font-size: ${calcFontSize(16)}px;
`;
