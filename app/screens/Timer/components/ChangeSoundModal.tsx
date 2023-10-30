import React from 'react';
import { Modal, Text } from 'react-native';

import { List } from 'app/components/List/List';
import { StyledListWrapper } from 'app/components/List/List.styled';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import {
  StyledButtonsWrapper,
  StyledModal,
} from 'app/screens/Timer/components/ChangeSoundModal.styled';

export function ChangeSoundModal() {
  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <StyledModal>
        <StyledButtonsWrapper>
          <SimpleButton
            onPress={() => {}}
            title={'Closed'}
            color={colors[MainColorName.ORANGE]}
          />
          <SimpleButton
            onPress={() => {}}
            title={'When finish '}
            isDisabled={true}
          />
          <SimpleButton
            onPress={() => {}}
            title={'Set'}
            color={colors[MainColorName.ORANGE]}
          />
        </StyledButtonsWrapper>
        <List />
      </StyledModal>
    </Modal>
  );
}
