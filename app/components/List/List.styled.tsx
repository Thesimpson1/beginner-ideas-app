import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledListWrapper = styled.View`
  background-color: ${colors[MainColorName.LIGHT_BLUE]};
  margin-top: ${calcHeight(20)}px;
  border-radius: ${calcHeight(10)}px;
`;
export const StyledListItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
`;
export const StyledListItemTextWrapper = styled.View<{ isLastIndex: boolean }>`
  border-bottom-width: ${({ isLastIndex }) => (isLastIndex ? 0 : 1)}px;
  border-color: ${colors[MainColorName.DARK_BLUE]};
  justify-content: center;
  flex: 1;
`;
export const StyledListItemText = styled(StyledTextH3)`
  color: ${colors.WHITE};
  margin: ${calcHeight(10)}px ${calcWidth(10)}px;
  font-size: ${calcFontSize(16)}px;
`;
export const StyledListItemIcon = styled.TouchableOpacity`
  width: ${calcHeight(30)}px;
  align-items: center;
`;
