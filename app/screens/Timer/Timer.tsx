import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';
import { getSounds } from 'app/redux/timer/slice';

import { BellIcon, RightArrowIcon } from 'app/assets/icon';
import { CircleButton } from 'app/components/CircleButton/CircleButton';
import { CircleProgressBar } from 'app/components/CircleProgressBar/CircleProgressBar';
import { HomeStackParamList } from 'app/navigation/app/HomeStack.navigator';
import { ChangeSoundModal } from 'app/screens/Timer/components/ChangeSoundModal/ChangeSoundModal';
import { useGetSecondsMinutesHours } from 'app/screens/Timer/hooks/useGetSecondsMinuteHours';
import { useRunTimerLogic } from 'app/screens/Timer/hooks/useRunTimerLogic';
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
import {
  getCurrentDate,
  getRightButtonInfo,
} from 'app/screens/Timer/utils/utils';

const TimerIcon = () => <BellIcon />;
const TimerRightArrowIcon = () => <RightArrowIcon />;
export const initDate = new Date();

export function TimerScreen() {
  const [date, setDate] = useState(initDate);
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
  const isAndroid = Platform.OS === 'android';

  const showModal = () => {
    setIsShowChangeSoundsModal(true);
  };

  const startTimer = () => {
    if (changedDate === 0) {
      const { currentDate } = getCurrentDate({ date });
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
      if (event?.type === 'dismissed') {
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

  const setAndroidPicker = () => {
    return DateTimePickerAndroid.open({
      testID: 'DateTimeAndroidPicker',
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
  useRunTimerLogic({
    changedDate,
    setChangedDate,
    isRunTimer,
    setIsRunTimer,
    isRunSound,
    setIsRunSound,
    setAndroidPicker,
    setIsShowTimePicker,
    setAnimationTime,
    isAndroid,
    currentSound,
  });

  //style and text for right button
  const { rightButtonNameColor, rightButtonOnPress, rightButtonName } =
    getRightButtonInfo({
      isShowTimePicker,
      isRunTimer,
      startTimer,
      pauseTimer,
    });
  return (
    <StyledTimerScreenContainer testID={'StyledTimerScreenContainerTestID'}>
      <CircleProgressBar
        isShowTimePicker={isShowTimePicker}
        animationDuration={animationTime}
        pause={paused}
      >
        <StyledTimerCircleContentWrapper
          isShowTimePicker={isShowTimePicker}
          testID={'StyledTimerCircleContentWrapperTestID'}
        >
          <StyledNumbersWrapper>
            <StyledTimerNumbers
              testID={'StyledTimerNumbersHoursTestID'}
            >{`${hours}:`}</StyledTimerNumbers>
            <StyledTimerNumbers
              testID={'StyledTimerNumbersMinutesTestID'}
            >{`${minutes}:`}</StyledTimerNumbers>
            <StyledTimerNumbers testID={'StyledTimerNumbersSecondsTestID'}>
              {seconds}
            </StyledTimerNumbers>
          </StyledNumbersWrapper>
          <StyledEndFinishNumberContainer>
            <TimerIcon />
            <StyledEndFinishNumber testID={'StyledEndFinishNumberTestID'}>
              {getTimeWhenTimerFinish}
            </StyledEndFinishNumber>
          </StyledEndFinishNumberContainer>
        </StyledTimerCircleContentWrapper>
        <StyledDataPickerWrapper
          isShowTimePicker={isShowTimePicker}
          testID={'StyledDataPickerWrapperTestID'}
        >
          {!isAndroid && (
            <DateTimePicker
              testID="DateTimePickerTestID"
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
          onPressTestID={'CancelTimerTestID'}
        />
        <CircleButton
          onPress={rightButtonOnPress}
          title={rightButtonName}
          color={rightButtonNameColor}
          onPressTestID={'RightButtonOnPressTestID'}
        />
      </StyledButtonsContainer>
      <StyledBottomContainer
        onPress={showModal}
        testID={'StyledBottomContainerTestID'}
      >
        <StyledBottomLeftText>{'When finish'}</StyledBottomLeftText>
        <StyledBottomRightContainer>
          <StyledBottomRightText testID={'StyledBottomRightTextTestID'}>
            {currentSound?.title}
          </StyledBottomRightText>
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
