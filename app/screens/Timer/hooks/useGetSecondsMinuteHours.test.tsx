import { renderHook } from '@testing-library/react-native';
import moment from 'moment';

import { useGetSecondsMinutesHours } from 'app/screens/Timer/hooks/useGetSecondsMinuteHours';

describe('Test useGetSecondsMinutesHours', () => {
  it('useGetSecondsMinutesHours has to be correct', () => {
    //only seconds
    const { result, rerender } = renderHook(
      (changedDate: number) => useGetSecondsMinutesHours({ changedDate }),
      { initialProps: 2000 }
    );
    const currentDisplayedValue1 = result.current;
    const getTimeWhenTimerFinishTest = moment()
      .add(
        `${currentDisplayedValue1.secondsMinutesAndHours.hours}:${currentDisplayedValue1.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue1.secondsMinutesAndHours.seconds).toBe('02');
    expect(currentDisplayedValue1.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest
    );

    rerender(11000);
    const currentDisplayedValue2 = result.current;
    const getTimeWhenTimerFinishTest2 = moment()
      .add(
        `${currentDisplayedValue2.secondsMinutesAndHours.hours}:${currentDisplayedValue2.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue2.secondsMinutesAndHours.seconds).toBe('11');
    expect(currentDisplayedValue2.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest2
    );
    //only minutes
    rerender(60000);
    const currentDisplayedValue3 = result.current;
    const getTimeWhenTimerFinishTest3 = moment()
      .add(
        `${currentDisplayedValue3.secondsMinutesAndHours.hours}:${currentDisplayedValue3.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue3.secondsMinutesAndHours.minutes).toBe('01');
    expect(currentDisplayedValue3.secondsMinutesAndHours.seconds).toBe('00');
    expect(currentDisplayedValue3.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest3
    );

    rerender(660000);
    const currentDisplayedValue4 = result.current;
    const getTimeWhenTimerFinishTest4 = moment()
      .add(
        `${currentDisplayedValue4.secondsMinutesAndHours.hours}:${currentDisplayedValue4.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue4.secondsMinutesAndHours.minutes).toBe('11');
    expect(currentDisplayedValue4.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest4
    );
    //only hours
    rerender(3660000);
    const currentDisplayedValue5 = result.current;
    const getTimeWhenTimerFinishTest5 = moment()
      .add(
        `${currentDisplayedValue5.secondsMinutesAndHours.hours}:${currentDisplayedValue5.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue5.secondsMinutesAndHours.hours).toBe('01');
    expect(currentDisplayedValue5.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest5
    );

    rerender(36000000);
    const currentDisplayedValue6 = result.current;
    const getTimeWhenTimerFinishTest6 = moment()
      .add(
        `${currentDisplayedValue6.secondsMinutesAndHours.hours}:${currentDisplayedValue6.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue6.secondsMinutesAndHours.hours).toBe('10');
    expect(currentDisplayedValue6.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest6
    );
    //hours, minutes and seconds
    rerender(36072000);
    const currentDisplayedValue7 = result.current;
    const getTimeWhenTimerFinishTest7 = moment()
      .add(
        `${currentDisplayedValue7.secondsMinutesAndHours.hours}:${currentDisplayedValue7.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue7.secondsMinutesAndHours.hours).toBe('10');
    expect(currentDisplayedValue7.secondsMinutesAndHours.minutes).toBe('01');
    expect(currentDisplayedValue7.secondsMinutesAndHours.seconds).toBe('12');
    expect(currentDisplayedValue7.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest7
    );
    //minutes and seconds
    rerender(722000);
    const currentDisplayedValue8 = result.current;
    const getTimeWhenTimerFinishTest8 = moment()
      .add(
        `${currentDisplayedValue8.secondsMinutesAndHours.hours}:${currentDisplayedValue8.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue8.secondsMinutesAndHours.hours).toBe('00');
    expect(currentDisplayedValue8.secondsMinutesAndHours.minutes).toBe('12');
    expect(currentDisplayedValue8.secondsMinutesAndHours.seconds).toBe('02');
    expect(currentDisplayedValue8.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest8
    );
    //no time
    rerender(0);
    const currentDisplayedValue9 = result.current;
    const getTimeWhenTimerFinishTest9 = moment()
      .add(
        `${currentDisplayedValue9.secondsMinutesAndHours.hours}:${currentDisplayedValue9.secondsMinutesAndHours.minutes}`
      )
      .format('HH:mm');

    expect(currentDisplayedValue9.secondsMinutesAndHours.hours).toBe('00');
    expect(currentDisplayedValue9.secondsMinutesAndHours.minutes).toBe('00');
    expect(currentDisplayedValue9.secondsMinutesAndHours.seconds).toBe('00');
    expect(currentDisplayedValue9.getTimeWhenTimerFinish).toBe(
      getTimeWhenTimerFinishTest9
    );
  });
});
