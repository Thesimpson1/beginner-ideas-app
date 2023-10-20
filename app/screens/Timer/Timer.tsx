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
  DateTimePickerEvent,
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
  const [animationTime, setAnimationTime] = useState(0);
  const [changedDate, setChangedDate] = useState(0);
  const [isRunTimer, setIsRunTimer] = useState(false);

  const paused = useSharedValue(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(true);
  const { secondsMinutesAndHours, getTimeWhenTimerFinish } =
    useGetSecondsMinutesHours({ changedDate });
  const { minutes, seconds, hours } = secondsMinutesAndHours;
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    selectedDate && setDate(selectedDate);
  };

  const startTimer = () => {
    if (changedDate === 0) {
      const minutesFromPicker = moment(date).get('minutes');
      const hoursFromPicker = moment(date).get('hours');
      let currentDate = 0;
      if (hoursFromPicker > 0) {
        currentDate = hoursFromPicker * 3600000;
      }
      if (minutesFromPicker > 0) {
        currentDate = currentDate + minutesFromPicker * 60000;
      }
      setIsShowTimePicker(false);
      setAnimationTime(currentDate);
      setChangedDate(currentDate);
    }
    setIsRunTimer(true);
    paused.value = false;
  };
  const pauseTimer = () => {
    setIsRunTimer(false);
    paused.value = true;
  };
  const cancelTimer = () => {
    setChangedDate(0);
    setAnimationTime(0);
    setIsShowTimePicker(true);
    paused.value = false;
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
      }, 940);
    }
    if (changedDate === 0) {
      setIsShowTimePicker(true);
    }
    return () => clearTimeout(timeOut);
  }, [changedDate, isRunTimer]);

  const { rightButtonNameColor, rightButtonOnPress, rightButtonName } =
    getRightButtonInfo({
      isShowTimePicker,
      isRunTimer,
      startTimer,
      pauseTimer,
    });

  return (
    <StyledTimerScreenContainer>
      <CircleProgressBar
        isShowTimePicker={isShowTimePicker}
        animationDuration={animationTime}
        pause={paused}
      >
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
            mode={'time'}
            is24Hour={true}
            timeZoneName={'Europe/Berlin'}
            onChange={onChange}
          />
        </StyledDataPickerWrapper>
      </CircleProgressBar>

      <StyledButtonsContainer>
        <CircleButton
          onPress={cancelTimer}
          title={'Cancel'}
          isDisabled={isShowTimePicker}
        />
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
