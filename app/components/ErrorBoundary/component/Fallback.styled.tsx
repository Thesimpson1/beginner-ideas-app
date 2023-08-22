import styled from 'styled-components/native';

import { StyledTextH2 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight } from 'app/utils/scaling-system';

export const StyledTextContainer = styled.View`
  margin: ${calcHeight(50)}px ${calcHeight(50)}px;
`;
export const StyledText = styled(StyledTextH2)`
  font-size: ${calcFontSize(30)}px;
  text-align: center;
`;
