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
import { useGetSecondsMinutesHours } from 'app/screens/Timer/hooks/useGetSecondsMinuteHours';
import {
  StyledBottomContainer,
  StyledBottomLeftText,
  StyledBottomRightContainer,
  StyledBottomRightText,
  StyledButtonsContainer,
  StyledDataPickerWrapper,
  StyledEndFinishNumber,
  StyledEndFinishNumberContainer,
  StyledNumbersWrapper,
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
  const { secondsMinutesAndHours } = useGetSecondsMinutesHours({ changedDate });
  const { minutes, seconds, hours } = secondsMinutesAndHours;
  const onChange = (event, selectedDate) => {
    const currentDate = moment(selectedDate).format('HH:mm');
    // setIsShowTimePicker(false);
    setDate(selectedDate);
  };
  const startTimer = () => {
    setChangedDate(36000000);
  };
  const cancelTimer = () => {
    setChangedDate(0);
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
  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <StyledTimerScreenContainer>
      <CircleProgressBar>
        <StyledTimerCircleContentWrapper isShowTimePicker={isShowTimePicker}>
          <StyledNumbersWrapper>
            <StyledTimerNumbers>{`${hours}:`}</StyledTimerNumbers>
            <StyledTimerNumbers>{`${minutes}:`}</StyledTimerNumbers>
            <StyledTimerNumbers>{seconds}</StyledTimerNumbers>
          </StyledNumbersWrapper>
          {/*<StyledTimerNumbers >{secondsMinutesAndHours}</StyledTimerNumbers>*/}
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
        <CircleButton onPress={cancelTimer} title={'Cancel'} />
        <CircleButton
          onPress={startTimer}
          title={isShowTimePicker ? 'Start' : 'Pause'}
          color={
            isShowTimePicker
              ? colors[MainColorName.GREEN]
              : colors[MainColorName.ORANGE]
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
