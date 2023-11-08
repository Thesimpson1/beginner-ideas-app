import { useMemo } from 'react';
import moment from 'moment/moment';

interface SecondsMinutesHoursI {
  changedDate: number;
}
export const useGetSecondsMinutesHours = ({
  changedDate,
}: SecondsMinutesHoursI) => {
  const secondsMinutesAndHours = useMemo(() => {
    let time = changedDate / 1000;
    let seconds = '00',
      minutes = '00',
      hours = '00';
    //hours

    if (time >= 3600) {
      const amountOfHours = Math.floor(time / 3600);
      if (amountOfHours < 10) {
        hours = `0${amountOfHours}`;
      } else {
        hours = `${amountOfHours}`;
      }
      time = time - amountOfHours * 3600;
    }
    //minutes
    if (time >= 60 && time < 3600) {
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
    return { seconds, hours, minutes };
  }, [changedDate]);

  const getTimeWhenTimerFinish = useMemo(() => {
    return moment()
      .add(`${secondsMinutesAndHours.hours}:${secondsMinutesAndHours.minutes}`)
      .format('HH:mm');
  }, [secondsMinutesAndHours.hours, secondsMinutesAndHours.minutes]);

  return {
    secondsMinutesAndHours,
    getTimeWhenTimerFinish,
  };
};
