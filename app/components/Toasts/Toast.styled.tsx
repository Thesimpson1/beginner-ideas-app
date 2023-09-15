import { ErrorToast } from 'react-native-toast-message';
import styled from 'styled-components/native';

import { calcFontSize } from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledErrorToast = styled(ErrorToast).attrs({
  text1Style: { fontSize: calcFontSize(16), fontWeight: 'normal' },
})`
  border-left-color: ${colors[MainColorName.RED]};
`;
export const StyledBaseToast = styled(ErrorToast).attrs({
  text1Style: { fontSize: calcFontSize(16), fontWeight: 'normal' },
})`
  border-left-color: ${colors[MainColorName.GREEN]};
`;
