import React from 'react';
import { Platform } from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { fireEvent } from '@testing-library/react-native';
import { mockInitialTimerState } from 'app/mocks';
import { SoundsItem } from 'app/redux/timer/slice';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { initDate, TimerScreen } from 'app/screens/Timer/Timer';

jest.mock('app/screens/Timer/hooks/useGetSecondsMinuteHours', () => {
  const actual = jest.requireActual(
    'app/screens/Timer/hooks/useGetSecondsMinuteHours'
  );
  return {
    ...actual,
    useGetSecondsMinutesHours: () => {
      return {
        secondsMinutesAndHours: {
          seconds: '10',
          hours: '2',
          minutes: '30',
        },
        getTimeWhenTimerFinish: '20:20',
      };
    },
  };
});

const mockedCanGoBack = jest.fn();
const mockedGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      canGoBack: mockedCanGoBack,
      goBack: mockedGoBack,
    }),
  };
});

const mockPlaySampleSound = jest.fn();
const mockStopSampleSound = jest.fn();

jest.mock('react-native-notification-sounds', () => ({
  ...jest.requireActual('react-native-notification-sounds'),
  stopSampleSound: () => mockStopSampleSound(),
  playSampleSound: () => mockPlaySampleSound(),
}));
const DateTimePickerEventMock = {
  type: 'set',
  nativeEvent: {
    timestamp: 20220202,
    utcOffset: 2002020,
  },
} as DateTimePickerEvent;

describe('Timer Screen', () => {
  const testDate = new Date('1995-12-17T03:24:00');
  const mockSounds = [{ title: 'Test1' }, { title: 'Test2' }] as SoundsItem[];
  it('Should render without current', () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <TimerScreen />
    );

    const StyledTimerScreenContainerTestID = getByTestId(
      'StyledTimerScreenContainerTestID'
    );
    const StyledDataPickerWrapperTestID = getByTestId(
      'StyledDataPickerWrapperTestID'
    );
    const DateTimePickerTestID = getByTestId('DateTimePickerTestID');
    const CancelTimerTestID = getByTestId('CancelTimerTestID');

    const RightButtonOnPressTestID = getByTestId('RightButtonOnPressTestID');
    const RightButtonColorTestID = getAllByTestId(
      'StyledCircleButtonTitleTest'
    )[1];
    const StyledBottomContainerTestID = getByTestId(
      'StyledBottomContainerTestID'
    );
    const StyledBottomRightTextTestID = getByTestId(
      'StyledBottomRightTextTestID'
    );
    const ModalTestID = getByTestId('ModalTestID');

    expect(StyledTimerScreenContainerTestID.props).toBeTruthy();

    expect(StyledDataPickerWrapperTestID.props.isShowTimePicker).toBe(true);
    expect(StyledDataPickerWrapperTestID.props.style.display).toBe('flex');
    //test data picker
    expect(DateTimePickerTestID.props.date).toBe(initDate.getTime());
    fireEvent(DateTimePickerTestID, 'onChange', {
      nativeEvent: { timestamp: testDate },
    });
    expect(DateTimePickerTestID.props.date).toBe(testDate.getTime());

    //cancel button before start
    expect(CancelTimerTestID.props.accessibilityState.disabled).toBe(true);
    expect(CancelTimerTestID.props.style.opacity).toBe(0.5);
    //right button
    expect(RightButtonColorTestID.props.style.color).toBe('#38BCA5');
    expect(RightButtonColorTestID.props.children).toBe('Start');
    fireEvent.press(RightButtonOnPressTestID);
    expect(StyledDataPickerWrapperTestID.props.isShowTimePicker).toBe(false);
    expect(RightButtonColorTestID.props.style.color).toBe('#FF9900');
    expect(RightButtonColorTestID.props.children).toBe('Pause');
    fireEvent.press(RightButtonOnPressTestID);
    expect(RightButtonColorTestID.props.style.color).toBe('#FF9900');
    expect(RightButtonColorTestID.props.children).toBe('Continue');
    //cancel button after start
    expect(CancelTimerTestID.props.accessibilityState.disabled).toBe(false);
    fireEvent.press(CancelTimerTestID);
    expect(CancelTimerTestID.props.accessibilityState.disabled).toBe(true);
    expect(RightButtonColorTestID.props.style.color).toBe('#38BCA5');
    expect(RightButtonColorTestID.props.children).toBe('Start');

    expect(StyledBottomRightTextTestID.props.children).toBeUndefined();
    expect(ModalTestID.props.visible).toBe(false);
    fireEvent.press(StyledBottomContainerTestID);
    expect(ModalTestID.props.visible).toBe(true);
    const SimpleButtonClosedTestID = getByTestId('SimpleButtonClosedTestID');
    fireEvent.press(SimpleButtonClosedTestID);
    expect(ModalTestID.props.visible).toBe(false);
  });
  it('Should render with current sounds correct', () => {
    mockInitialTimerState.notificationSounds = mockSounds;
    const { getByTestId } = renderWithProviders(<TimerScreen />, {
      preloadedState: {
        timer: mockInitialTimerState,
      },
    });

    const RightButtonOnPressTestID = getByTestId('RightButtonOnPressTestID');

    fireEvent.press(RightButtonOnPressTestID);

    const StyledTimerCircleContentWrapperTestID = getByTestId(
      'StyledTimerCircleContentWrapperTestID'
    );
    const StyledTimerNumbersHoursTestID = getByTestId(
      'StyledTimerNumbersHoursTestID'
    );
    const StyledTimerNumbersMinutesTestID = getByTestId(
      'StyledTimerNumbersMinutesTestID'
    );
    const StyledTimerNumbersSecondsTestID = getByTestId(
      'StyledTimerNumbersSecondsTestID'
    );
    const StyledEndFinishNumberTestID = getByTestId(
      'StyledEndFinishNumberTestID'
    );

    expect(StyledTimerCircleContentWrapperTestID.props.isShowTimePicker).toBe(
      false
    );
    expect(StyledTimerCircleContentWrapperTestID.props.style.display).toBe(
      'flex'
    );

    expect(StyledTimerNumbersHoursTestID.props.children).toBe('2:');
    expect(StyledTimerNumbersMinutesTestID.props.children).toBe('30:');
    expect(StyledTimerNumbersSecondsTestID.props.children).toBe('10');
    expect(StyledEndFinishNumberTestID.props.children).toBe('20:20');
  });
  it('Should render correct when android first case', () => {
    Platform.OS = 'android';
    mockInitialTimerState.notificationSounds = mockSounds;
    mockInitialTimerState.currentSound = mockSounds[0];
    const mockAndroidPicker = jest
      .spyOn(DateTimePickerAndroid, 'open')
      .mockImplementation(({ onChange }) => {
        onChange && onChange(DateTimePickerEventMock, initDate);
      });
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <TimerScreen />,
      {
        preloadedState: {
          timer: mockInitialTimerState,
        },
      }
    );

    const CancelTimerTestID = getByTestId('CancelTimerTestID');

    const RightButtonColorTestID = getAllByTestId(
      'StyledCircleButtonTitleTest'
    )[1];
    const StyledBottomRightTextTestID = getByTestId(
      'StyledBottomRightTextTestID'
    );

    //test data picker
    expect(mockAndroidPicker).toHaveBeenCalledTimes(1);
    //cancel button before start
    expect(CancelTimerTestID.props.accessibilityState.disabled).toBe(false);
    expect(CancelTimerTestID.props.style.opacity).toBe(0.5);
    //right button
    expect(RightButtonColorTestID.props.style.color).toBe('#FF9900');
    expect(RightButtonColorTestID.props.children).toBe('Pause');

    fireEvent.press(CancelTimerTestID);
    expect(mockAndroidPicker).toHaveBeenCalledTimes(2);
    expect(StyledBottomRightTextTestID.props.children).toBe('Test1');
  });
  it('Should render correct when android second case', async () => {
    Platform.OS = 'android';
    const testDate1 = new Date('2013-11-07T20:30:00');
    mockedCanGoBack.mockImplementation(() => true);
    DateTimePickerEventMock.type = 'dismissed';
    const mockAndroidPicker = jest
      .spyOn(DateTimePickerAndroid, 'open')
      .mockImplementation(({ onChange }) => {
        onChange && onChange(DateTimePickerEventMock, testDate1);
      });
    renderWithProviders(<TimerScreen />, {
      preloadedState: {
        timer: mockInitialTimerState,
      },
    });

    expect(mockAndroidPicker).toHaveBeenCalledTimes(3);
    expect(mockedCanGoBack).toHaveBeenCalledTimes(1);
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
  it('Should render correct when android third case', async () => {
    Platform.OS = 'android';
    const testDate1 = new Date('2013-11-07T20:30:00');
    DateTimePickerEventMock.type = 'dismissed';

    const mockAndroidPicker = jest
      .spyOn(DateTimePickerAndroid, 'open')
      .mockImplementation(({ onChange }) => {
        onChange && onChange(DateTimePickerEventMock, testDate1);
      });
    mockedCanGoBack.mockImplementation(() => false);
    renderWithProviders(<TimerScreen />, {
      preloadedState: {
        timer: mockInitialTimerState,
      },
    });

    expect(mockAndroidPicker).toHaveBeenCalledTimes(4);
    expect(mockedCanGoBack).toHaveBeenCalledTimes(2);
    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });
});
