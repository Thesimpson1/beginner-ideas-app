import React from 'react';
import { HomeStackScreenName } from 'app/types';

import { CalculatorIcon, CalendarIcon, NoteIcon } from 'app/assets/icon';

export const setIcon = (title: HomeStackScreenName) => {
  let icon = <NoteIcon />;
  switch (title) {
    case HomeStackScreenName.CALCULATOR:
      icon = <CalculatorIcon />;
      break;
    case HomeStackScreenName.CALENDAR:
      icon = <CalendarIcon />;
      break;
    case HomeStackScreenName.NOTES:
      icon = <NoteIcon />;
      break;
  }
  return icon;
};
