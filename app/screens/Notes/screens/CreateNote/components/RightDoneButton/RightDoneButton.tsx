import React from 'react';

import { calcFontSize } from 'app/utils/scaling-system';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import { StyledRightDoneButtonWrapper } from 'app/screens/Notes/screens/CreateNote/components/RightDoneButton/RightDoneButton.styled';

interface RightDoneButtonPropsI {
  onClickButton: () => void;
  isDisabled: boolean;
}
export const RightDoneButton = ({
  onClickButton,
  isDisabled,
}: RightDoneButtonPropsI) => {
  return (
    <StyledRightDoneButtonWrapper>
      <SimpleButton
        onPress={onClickButton}
        title={'Done'}
        isDisabled={isDisabled}
        size={calcFontSize(12)}
        color={colors[MainColorName.DARK_BLUE]}
      />
    </StyledRightDoneButtonWrapper>
  );
};
