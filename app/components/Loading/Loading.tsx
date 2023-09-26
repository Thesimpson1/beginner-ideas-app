import React from 'react';
import { ActivityIndicator } from 'react-native';

import { StyledLoadingWrapper } from 'app/components/Loading/Loading.styled';

export function Loading() {
  return (
    <StyledLoadingWrapper testID={'StyledLoadingWrapperTestID'}>
      <ActivityIndicator
        size={'large'}
        testID={'ActivityLoadingIndicatorTestID'}
      />
    </StyledLoadingWrapper>
  );
}
