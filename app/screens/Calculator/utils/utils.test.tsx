import React from 'react';
import { HomeStackScreenName } from 'app/types';

import { CalculatorIcon, CalendarIcon, NoteIcon } from 'app/assets/icon';
import { validate } from 'app/screens/Authentication/Login/utils/utils';
import { setIcon } from 'app/screens/Home/utils/utils';

jest.mock('app/screens/Home/utils/utils', () => {
  const originalModule = jest.requireActual('app/screens/Home/utils/utils');

  return {
    __esModule: true,
    ...originalModule,
  };
});
describe('Home utils', () => {
  it('set icon', () => {
    const functionResult0 = setIcon();
    expect(functionResult0).toStrictEqual(
      <NoteIcon testID={'DefaultNoteIconTestID'} />
    );
    const functionResult1 = setIcon(HomeStackScreenName.CALCULATOR);
    expect(functionResult1).toStrictEqual(
      <CalculatorIcon testID={'CalculatorIconTestID'} />
    );
    const functionResult2 = setIcon(HomeStackScreenName.CALENDAR);
    expect(functionResult2).toStrictEqual(
      <CalendarIcon testID={'CalendarIconTestID'} />
    );
    const functionResult3 = setIcon(HomeStackScreenName.NOTES);
    expect(functionResult3).toStrictEqual(
      <NoteIcon testID={'NoteIconTestID'} />
    );
  });
});
