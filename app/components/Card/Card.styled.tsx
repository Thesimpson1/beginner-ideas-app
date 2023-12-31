import styled from 'styled-components/native';

import { StyledTextH1 } from 'app/utils/common-styled-components';
import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCardWrapper = styled.TouchableOpacity`
  background-color: ${colors[MainColorName.GRAY_BLUE]};
  height: ${110}px;
  margin: ${calcHeight(12)}px 0;
  padding: 0 ${calcWidth(15)}px;
  border-radius: ${calcWidth(15)}px;
  flex-direction: row;
  align-items: center;
`;
export const StyledIconWrapper = styled.View`
  margin: ${calcHeight(10)}px ${calcWidth(10)}px;
`;

export const StyledCardTitleText = styled(StyledTextH1)`
  font-size: 20px;
  color: ${colors[MainColorName.BLACK]};
`;
