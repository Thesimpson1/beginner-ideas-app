import styled from 'styled-components/native';

import { StyledTextH2, StyledTextH3 } from 'app/utils/common-styled-components';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledHomeScreenContainer = styled.View`
  background-color: ${colors[MainColorName.BLUE]};
  padding: ${calcHeight(130)}px ${calcWidth(15)}px 0;
  flex: 1;
`;
export const StyledHomeTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const StyledTopWrapper = styled.View`
  flex-direction: column;
  margin-bottom: ${calcHeight(30)}px;
`;
export const StyledHomeText = styled(StyledTextH3)`
  font-size: 14px;
  color: ${colors[MainColorName.WHITE]};
  padding-top: ${calcHeight(5)}px;
`;
export const StyledUserText = styled(StyledTextH2)`
  font-size: 24px;
  max-width: ${300}px;
  color: ${colors[MainColorName.WHITE]};
`;
