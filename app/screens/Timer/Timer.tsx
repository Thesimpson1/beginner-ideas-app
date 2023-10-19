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
  StyledTimerNumbersDots,
  StyledTimerScreenContainer,
} from 'app/screens/Timer/Timer.styled';

interface GetRightButtonInfoI {
  isShowTimePicker: boolean;
  isRunTimer: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
}

const TimerIcon = () => <BellIcon />;
const TimerRightArrowIcon = () => <RightArrowIcon />;
const getRightButtonInfo = ({
  isShowTimePicker,
  isRunTimer,
  startTimer,
  pauseTimer,
}: GetRightButtonInfoI) => {
  switch (true) {
    case isShowTimePicker: {
      return {
        rightButtonNameColor: colors[MainColorName.GREEN],
        rightButtonName: 'Start',
        rightButtonOnPress: startTimer,
      };
    }
    case !isShowTimePicker && isRunTimer: {
      return {
        rightButtonNameColor: colors[MainColorName.ORANGE],
        rightButtonName: 'Pause',
        rightButtonOnPress: pauseTimer,
      };
    }
    case !isShowTimePicker && !isRunTimer: {
      return {
        rightButtonNameColor: colors[MainColorName.ORANGE],
        rightButtonName: 'Continue',
        rightButtonOnPress: startTimer,
      };
    }
    default: {
      return {
        rightButtonNameColor: colors[MainColorName.GREEN],
        rightButtonName: 'Start',
        rightButtonOnPress: startTimer,
      };
    }
  }
};
export function TimerScreen() {
  const [date, setDate] = useState(new Date());
  const [changedDate, setChangedDate] = useState(0);
  const [isRunTimer, setIsRunTimer] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState<AndroidMode>('time');
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const { secondsMinutesAndHours, getTimeWhenTimerFinish } =
    useGetSecondsMinutesHours({ changedDate });
  const { minutes, seconds, hours } = secondsMinutesAndHours;
  const onChange = (event, selectedDate) => {
    const currentDate = moment(selectedDate).format('HH:mm');
    // setIsShowTimePicker(false);
    setDate(selectedDate);
  };
  const startTimer = () => {
    if (changedDate === 0) {
      setChangedDate(36000000);
    }
    setIsRunTimer(true);
  };
  const pauseTimer = () => {
    setIsRunTimer(false);
  };
  const cancelTimer = () => {
    setChangedDate(0);
  };
  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (changedDate !== 0 && isRunTimer) {
      timeOut = setTimeout(() => {
        setChangedDate((prevState) => {
          const newReturnValue = prevState - 1000;
          if (newReturnValue === 0) {
            setIsRunTimer(false);
          }
          return newReturnValue;
        });
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [changedDate, isRunTimer]);

  const showMode = (currentMode: AndroidMode) => {
    setIsShowTimePicker(true);
    setTimePickerMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };

  const { rightButtonNameColor, rightButtonOnPress, rightButtonName } =
    getRightButtonInfo({
      isShowTimePicker,
      isRunTimer,
      startTimer,
      pauseTimer,
    });
  return (
    <StyledTimerScreenContainer>
      <CircleProgressBar>
        <StyledTimerCircleContentWrapper isShowTimePicker={isShowTimePicker}>
          <StyledNumbersWrapper>
            <StyledTimerNumbers>{`${hours}:`}</StyledTimerNumbers>
            <StyledTimerNumbers>{`${minutes}:`}</StyledTimerNumbers>
            <StyledTimerNumbers>{seconds}</StyledTimerNumbers>
          </StyledNumbersWrapper>
          <StyledEndFinishNumberContainer>
            <TimerIcon />
            <StyledEndFinishNumber>
              {getTimeWhenTimerFinish}
            </StyledEndFinishNumber>
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
          onPress={rightButtonOnPress}
          title={rightButtonName}
          color={rightButtonNameColor}
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
