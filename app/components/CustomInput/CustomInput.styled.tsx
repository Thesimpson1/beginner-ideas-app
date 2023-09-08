import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';

import { StyledTextH3 } from 'app/utils/common-styled-components';
import { calcFontSize, calcHeight, calcWidth } from 'app/utils/scaling-system';
import { colors } from 'app/constants/color';

export const StyledCustomInputContainer = styled.View``;
export const StyledCustomInput = styled.TextInput`
  height: ${calcHeight(40)}px;
  font-size: 16px;
  padding-left: ${calcWidth(10)}px;
  flex: 1;
`;
export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4,
};
export const StyledDropShadow = styled(Shadow).attrs({
  offset: [17, 1],
  distance: 3,
})`
  background-color: ${colors.WHITE};
  border-radius: ${calcWidth(13)}px;
  flex-direction: row;
  align-items: center;
  margin: 0 ${calcWidth(15)}px;
`;
export const StyledLeftIconWrapper = styled.View`
  padding-left: ${calcWidth(10)}px;
`;
export const StyledRightIconWrapper = styled.TouchableOpacity`
  padding-right: ${calcWidth(10)}px;
`;
export const StyledErrorWrapper = styled.View`
  padding-left: ${calcWidth(50)}px;
`;
export const StyledErrorText = styled(StyledTextH3)`
  color: ${colors.RED};
  font-size: ${calcFontSize(14)}px;
  height: ${calcHeight(16)}px;
`;
