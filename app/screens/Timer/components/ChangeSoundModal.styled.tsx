import { View } from 'react-native';
import styled from 'styled-components/native';

import { calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledModal = styled(View)`
  flex: 1;
  border-radius: ${calcWidth(30)}px;
  margin-top: ${calcHeight(40)}px;
  background-color: ${colors[MainColorName.DARK_BLUE]};
  padding: ${calcHeight(15)}px;
`;
export const StyledButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
