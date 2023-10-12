import React, { useState } from 'react';
import DateTimePicker, {
  AndroidMode,
} from '@react-native-community/datetimepicker';

import { BellIcon, RightArrowIcon } from 'app/assets/icon';
import { CircleButton } from 'app/components/CircleButton/CircleButton';
import { colors, MainColorName } from 'app/constants/color';
import {
  StyledBottomContainer,
  StyledBottomLeftText,
  StyledBottomRightContainer,
  StyledBottomRightText,
  StyledButtonsContainer,
  StyledDataPickerWrapper,
  StyledEndFinishNumber,
  StyledEndFinishNumberContainer,
  StyledTimerCircleContainer,
  StyledTimerCircleContentWrapper,
  StyledTimerNumbers,
  StyledTimerScreenContainer,
} from 'app/screens/Timer/Timer.styled';

const TimerIcon = () => <BellIcon />;
const TimerRightArrowIcon = () => <RightArrowIcon />;
export function TimerScreen() {
  const [date, setDate] = useState(new Date());
  const [timePickerMode, setTimePickerMode] = useState<AndroidMode>('time');
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsShowTimePicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    setIsShowTimePicker(true);
    setTimePickerMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <StyledTimerScreenContainer>
      <StyledTimerCircleContainer>
        <StyledTimerCircleContentWrapper isShowTimePicker={isShowTimePicker}>
          <StyledTimerNumbers>{'4:55:20'}</StyledTimerNumbers>
          <StyledEndFinishNumberContainer>
            <TimerIcon />
            <StyledEndFinishNumber>{'22:22'}</StyledEndFinishNumber>
          </StyledEndFinishNumberContainer>
        </StyledTimerCircleContentWrapper>
        <StyledDataPickerWrapper isShowTimePicker={isShowTimePicker}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            locale="en_GB"
            display={'spinner'}
            mode={timePickerMode}
            is24Hour={true}
            onChange={onChange}
          />
        </StyledDataPickerWrapper>
      </StyledTimerCircleContainer>
      <StyledButtonsContainer>
        <CircleButton onPress={() => {}} title={'Cancel'} />
        <CircleButton
          onPress={() => {}}
          title={isShowTimePicker ? 'Pause' : 'Continue'}
          color={
            isShowTimePicker
              ? colors[MainColorName.ORANGE]
              : colors[MainColorName.GREEN]
          }
        />
      </StyledButtonsContainer>
      <StyledBottomContainer>
        <StyledBottomLeftText>{'When finish'}</StyledBottomLeftText>
        <StyledBottomRightContainer>
          <StyledBottomRightText>{'Radar'}</StyledBottomRightText>
          <TimerRightArrowIcon />
        </StyledBottomRightContainer>
      </StyledBottomContainer>
    </StyledTimerScreenContainer>
  );
}
