import React from 'react';

import { calcFontSize } from 'app/utils/scaling-system';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import { StyledRightDoneButtonWrapper } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton.styled';

interface RightDoneButtonPropsI {}
export const RightDoneButton = ({}: RightDoneButtonPropsI) => {
  return (
    <StyledRightDoneButtonWrapper>
      <SimpleButton
        onPress={() => {}}
        title={'Done'}
        size={calcFontSize(12)}
        color={colors[MainColorName.BLUE]}
      />
    </StyledRightDoneButtonWrapper>
  );
};
