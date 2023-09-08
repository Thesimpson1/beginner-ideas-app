import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize } from 'app/utils/scaling-system';
import { colors } from 'app/constants/color';

export const StyledSimpleButtonWrapper = styled.TouchableOpacity``;
export const StyledSimpleButtonTitle = styled(StyledTextH3)<{
  color?: string;
  fontSize?: number;
}>`
  color: ${({ color }) => (color ? color : colors.WHITE)};
  font-size: ${({ fontSize }) =>
    fontSize ? calcFontSize(fontSize) : calcFontSize(16)}px;
`;
