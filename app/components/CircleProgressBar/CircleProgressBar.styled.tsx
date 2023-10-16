import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const StyledCircleProgressBarWrapper = styled.View``;
export const StyledTopCircleProgressBarWrapper = styled.View`
  z-index: 1;
`;

export const StyledBottomCircleProgressBarWrapper = styled.View`
  transform: rotate(180deg);
`;
export const StyledAnimatedPart = styled(Animated.View).attrs({})`
  position: absolute;
  top: 0;
`;
