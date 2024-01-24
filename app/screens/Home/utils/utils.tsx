import React from 'react';
import { HomeStackScreenName } from 'app/types';

import {
  CalculatorIcon,
  CalendarIcon,
  NoteIcon,
  TimerIcon,
} from 'app/assets/icon';

export const setIcon = (title?: HomeStackScreenName) => {
  let icon = <NoteIcon testID={'DefaultNoteIconTestID'} />;
  switch (title) {
    case HomeStackScreenName.CALCULATOR:
      icon = <CalculatorIcon testID={'CalculatorIconTestID'} />;
      break;
    case HomeStackScreenName.CALENDAR:
      icon = <CalendarIcon testID={'CalendarIconTestID'} />;
      break;
    case HomeStackScreenName.NOTES_SCREEN:
      icon = <NoteIcon testID={'NoteIconTestID'} />;
      break;
    case HomeStackScreenName.TIMER:
      icon = <TimerIcon testID={'TimerIconTestID'} />;
      break;
  }
  return icon;
};
