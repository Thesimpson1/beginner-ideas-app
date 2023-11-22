import styled from 'styled-components/native';

import { calcWidth } from 'app/utils/scaling-system';

export const StyledMenuIcon = styled.TouchableOpacity`
  margin-right: ${calcWidth(10)}px;
`;
export const StyledHeaderRightComponentWrapper = styled.View`
  position: relative;
`;
