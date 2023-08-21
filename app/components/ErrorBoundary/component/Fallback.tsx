import React from 'react';
import { Button, Modal } from 'react-native';

import { MainErrorIcon } from 'app/assets/icon';
import {
  StyledFallbackContainer,
  StyledText,
  StyledTextContainer,
} from 'app/components/ErrorBoundary/component/Fallback.styled';

type FallbackPropsType = {
  onPress: () => void;
};

export function Fallback({ onPress }: FallbackPropsType) {
  return (
    <Modal visible={true}>
      <StyledFallbackContainer>
        <MainErrorIcon width={100} height={100} />
        <StyledTextContainer>
          <StyledText>Something went wrong!!!</StyledText>
          <StyledText>Please try again later</StyledText>
        </StyledTextContainer>

        <Button title={'Try again'} onPress={onPress} />
      </StyledFallbackContainer>
    </Modal>
  );
}
