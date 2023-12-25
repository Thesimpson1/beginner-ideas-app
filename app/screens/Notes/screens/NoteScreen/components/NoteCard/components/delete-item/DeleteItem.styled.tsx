import { Animated as JSTreatAnimated } from 'react-native';
import styled from 'styled-components/native';

import { calcWidth } from 'app/utils/scaling-system';

export const StyledDeleteComponentWrapper = styled(JSTreatAnimated.View)`
  background-color: red;
  width: ${calcWidth(60)}px;
  justify-content: center;
  align-items: center;
`;
