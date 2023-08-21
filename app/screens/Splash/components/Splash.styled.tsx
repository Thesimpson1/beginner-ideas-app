import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

export const StyledSplashComponentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledLottieView = styled(LottieView).attrs({
  resizeMode: 'cover',
  autoPlay: true,
  loop: false,
  source: require('app/assets/lottie-animated-image/splash-screen.json'),
  testID: 'LottieViewTestID',
})`
  width: 300px;
  height: 300px;
`;
