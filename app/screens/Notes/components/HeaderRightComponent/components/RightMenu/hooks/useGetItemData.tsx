import React from 'react';
import { HomeStackScreenName } from 'app/types';

import {
  CalculatorIcon,
  CalendarIcon,
  ChooseIcon,
  NoteIcon,
  NotesCalendarIcon,
  SortVerticalIcon,
  TimerIcon,
} from 'app/assets/icon';
import { ItemDataItemI } from 'app/screens/Notes/components/HeaderRightComponent/components/RightMenu/RightMenu';
import { MenuDataTypes } from 'app/screens/Notes/types';
interface UseGetItemDataI {
  index: number;
}

const SORT_ITEM_DATA = [
  {
    title: 'Sort',
    Icon: () => <SortVerticalIcon testID={'SortVerticalIconTestID'} />,
    type: MenuDataTypes.SORT_ITEM_DATA,
  },
  {
    title: 'By creating date',
    type: MenuDataTypes.SORT_ITEM_DATA,
  },
  {
    title: 'By names',
    type: MenuDataTypes.SORT_ITEM_DATA,
  },
];
const DATE_SORT_ITEM_DATA = [
  {
    title: 'Date sort',
    Icon: () => <NotesCalendarIcon testID={'SortVerticalIconTestID'} />,
    type: MenuDataTypes.DATE_SORT_ITEM_DATA,
  },
  {
    title: 'On',
    type: MenuDataTypes.DATE_SORT_ITEM_DATA,
  },
  {
    title: 'Off',
    type: MenuDataTypes.DATE_SORT_ITEM_DATA,
  },
];

export const useGetItemData = ({ index }: UseGetItemDataI) => {
  let itemData: Array<ItemDataItemI> = [];

  switch (true) {
    case index === 1: {
      itemData = SORT_ITEM_DATA;
      break;
    }
    case index === 2: {
      itemData = DATE_SORT_ITEM_DATA;
      break;
    }
  }

  return { itemData };
};
