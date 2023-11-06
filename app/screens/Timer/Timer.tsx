import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { useSharedValue } from 'react-native-reanimated';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { clearTimeout } from '@testing-library/react-native/build/helpers/timers';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';
import { getSounds } from 'app/redux/timer/slice';
import moment from 'moment';

import { BellIcon, RightArrowIcon } from 'app/assets/icon';
import { CircleButton } from 'app/components/CircleButton/CircleButton';
import { CircleProgressBar } from 'app/components/CircleProgressBar/CircleProgressBar';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import { colors, MainColorName } from 'app/constants/color';
import { ChangeSoundModal } from 'app/screens/Timer/components/ChangeSoundModal/ChangeSoundModal';
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
  StyledTimerCircleContentWrapper,
  StyledTimerNumbers,
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
  const [isShowChangeSoundsModal, setIsShowChangeSoundsModal] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  const [changedDate, setChangedDate] = useState(0);
  const [isRunTimer, setIsRunTimer] = useState(false);
  const [isRunAndroidTimer, setIsRunAndroidTimer] = useState(false);
  const [isRunSound, setIsRunSound] = useState(false);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const { currentSound } = useAppSelector((state: RootState) => state.timer);
  const dispatch = useAppDispatch();
  const paused = useSharedValue(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(true);
  const { secondsMinutesAndHours, getTimeWhenTimerFinish } =
    useGetSecondsMinutesHours({ changedDate });
  const { minutes, seconds, hours } = secondsMinutesAndHours;
  const showModal = () => {
    setIsShowChangeSoundsModal(true);
  };
  const isAndroid = Platform.OS === 'android';
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
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    selectedDate && setDate(selectedDate);
    //logic for android
    if (isAndroid) {
      if (event.type === 'dismissed') {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else {
        setIsRunAndroidTimer(true);
      }
    }
  };
  //logic for android
  useEffect(() => {
    if (isRunAndroidTimer) {
      startTimer();
      setIsRunAndroidTimer(false);
    }
  }, [isRunAndroidTimer]); // eslint-disable-line react-hooks/exhaustive-deps
  ///
  const setAndroidPicker = () => {
    return DateTimePickerAndroid.open({
      testID: 'dateTimePicker',
      value: date,
      display: 'spinner',
      mode: 'time',
      is24Hour: true,
      timeZoneName: 'Europe/Berlin',
      onChange: onChange,
    });
  };

  useEffect(() => {
    dispatch(getSounds());
    if (isAndroid) {
      setAndroidPicker();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pauseTimer = () => {
    setIsRunTimer(false);
    paused.value = true;
  };
  const cancelTimer = () => {
    setChangedDate(0);
    setAnimationTime(0);
    setIsShowTimePicker(true);
    paused.value = false;
    isAndroid && setAndroidPicker();
  };
  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (changedDate !== 0 && isRunTimer) {
      timeOut = setTimeout(() => {
        setChangedDate((prevState) => {
          const newReturnValue = prevState - 1000;
          if (newReturnValue === 0) {
            setIsRunSound(true);
            setIsRunTimer(false);
            setAnimationTime(0);
          }
          return newReturnValue;
        });
      }, 910);
    }
    if (isRunSound) {
      setIsShowTimePicker(true);
      currentSound && playSampleSound(currentSound);
      setIsRunSound(false);
      ////logic for android
      if (isAndroid) {
        setTimeout(() => stopSampleSound(), 5000);
        setAndroidPicker();
      }
    }
    return () => clearTimeout(timeOut);
  }, [changedDate, isRunTimer, isRunSound]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {!isAndroid && (
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
          )}
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
      <StyledBottomContainer onPress={showModal}>
        <StyledBottomLeftText>{'When finish'}</StyledBottomLeftText>
        <StyledBottomRightContainer>
          <StyledBottomRightText>{currentSound?.title}</StyledBottomRightText>
          <TimerRightArrowIcon />
        </StyledBottomRightContainer>
      </StyledBottomContainer>
      <ChangeSoundModal
        isVisible={isShowChangeSoundsModal}
        onClose={setIsShowChangeSoundsModal}
      />
    </StyledTimerScreenContainer>
  );
}
