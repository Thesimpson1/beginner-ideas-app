import { createValidObjectForDisplay } from 'app/redux/notes/helpers';

jest.mock('app/redux/notes/helpers', () => {
  const originalModule = jest.requireActual('app/redux/notes/helpers');

  return {
    __esModule: true,
    ...originalModule,
  };
});
const MockValue1 = {
  date: '2024-01-12',
  note: 'MockNote',
  subTitle: 'MockSubTitle',
  title: 'MockTitle',
  user: 'MockUser',
};
const MockValue2 = {
  date: '2024-02-12',
  note: 'MockNote',
  subTitle: 'MockSubTitle',
  title: 'MockTitle',
  user: 'MockUser',
};
const MockNotes = {
  'Fri Jan 12 2024 16:55:01 GMT+0100': { ...MockValue1 },
  'Fri Jan 13 2024 16:55:01 GMT+0100': { ...MockValue2 },
};

describe('Notes helpers', () => {
  it('createValidObjectForDisplay has to return correct object dependently of  props', () => {
    const functionResultWithPeriod0 = createValidObjectForDisplay({
      data: MockNotes,
    });

    expect(functionResultWithPeriod0).toStrictEqual([
      { ...MockValue2, key: 'Fri Jan 13 2024 16:55:01 GMT+0100' },
      { ...MockValue1, key: 'Fri Jan 12 2024 16:55:01 GMT+0100' },
    ]);
    const functionResultWithPeriod1 = createValidObjectForDisplay({
      data: undefined,
    });
    expect(functionResultWithPeriod1).toStrictEqual([]);
  });
});
