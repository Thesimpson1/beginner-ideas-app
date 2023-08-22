import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import { calcHeight, calcWidth } from 'app/utils/scaling-system';

export const StyledLottieView = styled(LottieView).attrs({
  resizeMode: 'cover',
  autoPlay: true,
  loop: false,
  source: require('app/assets/lottie-animated-image/splash-screen.json'),
  testID: 'LottieViewTestID',
})`
  width: ${calcWidth(300)}px;
  height: ${calcHeight(300)}px;
`;
