import styled from 'styled-components/native';

import { colors, MainColorName } from 'app/constants/color';

export const StyledLoadingWrapper = styled.View`
  position: absolute;

  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors[MainColorName.WHITE]};
  opacity: 0.6;
  z-index: 2;
`;
