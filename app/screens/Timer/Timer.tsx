import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import DateTimePicker, {
  AndroidMode,
} from '@react-native-community/datetimepicker';
import { clearTimeout } from '@testing-library/react-native/build/helpers/timers';
import moment from 'moment';

import { BellIcon, RightArrowIcon } from 'app/assets/icon';
import { height } from 'app/utils/scaling-system';
import { CircleButton } from 'app/components/CircleButton/CircleButton';
import { CircleProgressBar } from 'app/components/CircleProgressBar/CircleProgressBar';
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
  const [changedDate, setChangedDate] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(0);
  const [timePickerMode, setTimePickerMode] = useState<AndroidMode>('time');
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = moment(selectedDate).format('HH:mm');

    // setIsShowTimePicker(false);
    setDate(selectedDate);
  };
  const startAnimation = () => {
    setChangedDate(36000000);
  };
  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (changedDate !== 0) {
      timeOut = setTimeout(() => {
        setDisplayedValue(changedDate / 1000);
        setChangedDate((prevState) => prevState - 1000);
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [changedDate]);

  const showMode = (currentMode: AndroidMode) => {
    setIsShowTimePicker(true);
    setTimePickerMode(currentMode);
  };
  const secondsMinutesAndHours = useMemo(() => {
    let time = changedDate / 1000;
    let seconds = '00',
      minutes = '00',
      hours = '0';
    //hours

    if (time > 3600) {
      const amountOfHours = Math.floor(time / 3600);
      hours = `${amountOfHours}`;
      time = time - amountOfHours * 3600;
    }
    //minutes
    if (time > 60 && time < 3600) {
      const amountOfMinutes = Math.floor(time / 60);
      if (amountOfMinutes < 10) {
        minutes = `0${amountOfMinutes}`;
      } else {
        minutes = `${amountOfMinutes}`;
      }
      time = time - amountOfMinutes * 60;
    }
    //seconds
    if (time < 60) {
      if (time < 10) {
        seconds = `0${time}`;
      } else {
        seconds = `${time}`;
      }
    }
    return `${hours}:${minutes}:${seconds}`;
  }, [changedDate]);
  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <StyledTimerScreenContainer>
      <CircleProgressBar>
        <StyledTimerCircleContentWrapper isShowTimePicker={isShowTimePicker}>
          <Text>{secondsMinutesAndHours}</Text>
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
            timeZoneName={'Europe/Berlin'}
            onChange={onChange}
          />
        </StyledDataPickerWrapper>
      </CircleProgressBar>

      <StyledButtonsContainer>
        <CircleButton onPress={() => {}} title={'Cancel'} />
        <CircleButton
          onPress={startAnimation}
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
