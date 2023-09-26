import React from 'react';
import { CardTitleType } from 'app/types';

import { CalculatorIcon, CalendarIcon, NoteIcon } from 'app/assets/icon';

export const setIcon = (title: CardTitleType) => {
  let icon = <NoteIcon />;
  switch (title) {
    case CardTitleType.CALCULATOR:
      icon = <CalculatorIcon />;
      break;
    case CardTitleType.CALENDAR:
      icon = <CalendarIcon />;
      break;
    case CardTitleType.NOTES:
      icon = <NoteIcon />;
      break;
  }
  return icon;
};
