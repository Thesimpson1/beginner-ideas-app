import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
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
} from 'app/screens/Timer/components/ChangeSoundModal/ChangeSoundModal.styled';
import { getIndex, handlePlayingSounds } from 'app/screens/Timer/utils/utils';

interface ChangeSoundModalI {
  onClose: (value: boolean) => void;
  isVisible: boolean;
}

export function ChangeSoundModal({ isVisible, onClose }: ChangeSoundModalI) {
  const [isPlayCurrentSound, setIsPlayCurrentSound] = useState(false);

  const { currentSound, notificationSounds } = useAppSelector(
    (state: RootState) => state.timer
  );
  const [current, setCurrent] = useState(
    getIndex({ currentSound, notificationSounds })
  );

  const dispatch = useAppDispatch();
  const onClosePress = () => {
    stopSampleSound();
    onClose(false);
  };
  const onPress = () => {
    stopSampleSound();
    if (notificationSounds) {
      dispatch(setCurrentSound(notificationSounds[current]));
      onClose(false);
    }
  };

  useEffect(() => {
    if (notificationSounds && isVisible) {
      handlePlayingSounds({
        notificationSounds,
        setIsPlayCurrentSound,
        isPlayCurrentSound,
        currentSound,
        current,
      });
    }
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      testID={'ModalTestID'}
    >
      <StyledModal>
        <StyledButtonsWrapper>
          <SimpleButton
            onPressTestID={'SimpleButtonClosedTestID'}
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
            onPressTestID={'SimpleButtonSetTestID'}
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
