import styled from 'styled-components/native';

import {
  StyledAnimatedSimpleViewWrapper,
  StyledAnimatedWrapper,
  StyledTextH3,
  StyledTextH4,
} from 'app/utils/common-styled-components';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  width,
} from 'app/utils/scaling-system';
import { colors, MainColorName } from 'app/constants/color';

export const StyledTimerScreenContainer = styled(StyledAnimatedWrapper)`
  background-color: ${colors[MainColorName.BLUE]};
  padding: ${calcHeight(30)}px ${calcWidth(15)}px;
`;
export const StyledTimerCircleContainer = styled.View`
  border-width: 1px;
  width: ${width - calcWidth(30)}px;
  height: ${width - calcWidth(30)}px;
  border-radius: ${width - calcWidth(30)}px;
  justify-content: center;
  align-items: center;
`;
export const StyledTimerCircleContentWrapper = styled(
  StyledAnimatedSimpleViewWrapper
)<{
  isShowTimePicker?: boolean;
}>`
  display: ${({ isShowTimePicker }) => (isShowTimePicker ? 'none' : 'flex')};
  align-items: center;
`;
export const StyledDataPickerWrapper = styled(StyledAnimatedSimpleViewWrapper)<{
  isShowTimePicker?: boolean;
}>`
  display: ${({ isShowTimePicker }) => (isShowTimePicker ? 'flex' : 'none')};
  margin-bottom: ${calcHeight(50)}px;
`;
export const StyledTimerNumbers = styled(StyledTextH4)<{
  color?: string;
}>`
  color: ${({ color }) => (color ? color : colors[MainColorName.WHITE])};
  font-size: ${calcFontSize(62)}px;
`;
export const StyledNumbersWrapper = styled.View`
  flex-direction: row;
  justify-content: left;
  width: ${calcWidth(240)}px;
  margin-left: ${calcWidth(10)}px;
`;
export const StyledEndFinishNumberContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${calcWidth(10)}px;
`;
export const StyledEndFinishNumber = styled(StyledTextH3)`
  color: ${colors[MainColorName.GRAY_BLUE]};
  font-size: ${calcFontSize(32)}px;
  margin-left: ${calcWidth(5)}px;
`;
export const StyledButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const StyledBottomContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors[MainColorName.LIGHT_BLUE]};
  margin-top: ${calcWidth(30)}px;
  padding: 0 ${calcWidth(10)}px;
  height: ${calcHeight(50)}px;
  border-radius: ${calcWidth(10)}px;
`;
export const StyledBottomRightContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledBottomRightText = styled(StyledEndFinishNumber)`
  margin-left: 0;
  font-size: ${calcFontSize(22)}px;
`;
export const StyledBottomLeftText = styled(StyledTextH3)`
  font-size: ${calcFontSize(22)}px;
  color: ${colors[MainColorName.WHITE]};
`;
