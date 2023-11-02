import React, { useEffect, useState } from 'react';
import { Modal, Text } from 'react-native';
import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';
import { setCurrentSound } from 'app/redux/timer/slice';

import { List } from 'app/components/List/List';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import {
  StyledButtonsWrapper,
  StyledModal,
} from 'app/screens/Timer/components/ChangeSoundModal.styled';

interface ChangeSoundModalI {
  onClose: (value: boolean) => void;
  isVisible: boolean;
}
export function ChangeSoundModal({ isVisible, onClose }: ChangeSoundModalI) {
  const [isPlayCurrentSound, setIsPlayCurrentSound] = useState(false);

  const { currentSound, notificationSounds } = useAppSelector(
    (state: RootState) => state.timer
  );
  const getIndex = () => {
    let currentIndex = 0;
    if (currentSound && notificationSounds) {
      notificationSounds.forEach((item, index) => {
        if (item.title === currentSound.title) {
          currentIndex = index;
        }
      });
    }
    return currentIndex;
  };
  const [current, setCurrent] = useState(getIndex());

  const dispatch = useAppDispatch();
  const onClosePress = () => {
    stopSampleSound();
    onClose(false);
  };
  const onPress = () => {
    stopSampleSound();
    return (
      notificationSounds &&
      dispatch(setCurrentSound(notificationSounds[current])) &&
      onClose(false)
    );
  };

  useEffect(() => {
    if (notificationSounds && isVisible) {
      if (currentSound !== notificationSounds[current] || isPlayCurrentSound) {
        setIsPlayCurrentSound(true);
        stopSampleSound();
        setTimeout(() => playSampleSound(notificationSounds[current]), 100);
      }
    }
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <StyledModal>
        <StyledButtonsWrapper>
          <SimpleButton
            onPress={onClosePress}
            title={'Closed'}
            color={colors[MainColorName.ORANGE]}
          />
          <SimpleButton
            onPress={() => {}}
            title={'When finish '}
            isDisabled={true}
          />
          <SimpleButton
            onPress={onPress}
            title={'Set'}
            color={colors[MainColorName.ORANGE]}
          />
        </StyledButtonsWrapper>
        <List
          current={current}
          setCurrent={setCurrent}
          data={notificationSounds ? notificationSounds : undefined}
        />
      </StyledModal>
    </Modal>
  );
}
