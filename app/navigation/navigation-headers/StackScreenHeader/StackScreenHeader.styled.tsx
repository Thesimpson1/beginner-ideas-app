import styled from 'styled-components/native';

import { RightArrowBlueIcon } from 'app/assets/icon';
import { StyledTextH2 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledStackScreenHeaderWrapper = styled.View`
  background-color: ${colors[MainColorName.GRAY_BLUE]};
  height: ${calcHeight(75)}px;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: ${calcHeight(5)}px;
`;
export const StyledLeftHeaderWrapper = styled.View`
  flex: 1;
  height: ${calcHeight(25)}px;
  flex-direction: row;
  align-items: center;
`;
export const StyledLeftHeaderDefaultWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const StyledRightHeaderWrapper = styled.View`
  flex: 1;
  align-items: flex-end;
  height: ${calcHeight(25)}px;
  justify-content: center;
`;
export const StyledTitleHeaderWrapper = styled.View`
  flex: 1;
  align-items: center;
  height: ${calcHeight(25)}px;
  justify-content: center;
`;
export const StyledTitleHeaderText = styled(StyledTextH2)`
  font-size: ${calcFontSize(14)}px;
  color: ${colors[MainColorName.BLACK]};
`;
export const StyledRightArrowIconWrapper = styled(RightArrowBlueIcon)`
  transform: rotate(180deg);
`;
