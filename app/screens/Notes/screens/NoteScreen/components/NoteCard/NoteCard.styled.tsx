import { View } from 'react-native';
import styled from 'styled-components/native';

import { calcWidth } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledCardContainer = styled.View`
  background-color: ${colors[MainColorName.LIGHT_BLUE]};
  margin: ${calcWidth(10)}px 0;
  padding: 0 ${calcWidth(20)}px;
  border-radius: ${calcWidth(10)}px;
` as typeof View;
