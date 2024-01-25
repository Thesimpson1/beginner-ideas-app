import { renderHook } from '@testing-library/react-native';
import { MockNoteValue1, MockNoteValue2 } from 'app/mocks';
import moment from 'moment';

import { useGetChangedData } from 'app/screens/Notes/hooks/useGetChangedData';
jest.mock('react-native-reanimated', () => {
  const actualNav = jest.requireActual('react-native-reanimated');
  return {
    ...actualNav,
  };
});

describe('Test useGetChangedData', () => {
  const mockData = [
    { ...MockNoteValue1, key: 'key' },
    { ...MockNoteValue2, key: 'key' },
  ];
  it("should return 'Last 30 Days'", () => {
    const monthAgo = moment().subtract(31, 'days').format('YYYY-MM-DD');
    mockData[0].date = monthAgo;
    mockData[1].date = '2022-12-24';
    const { result } = renderHook(() =>
      useGetChangedData({
        data: mockData,
      })
    );
    const useGetChangedData1 = result.current;

    expect(useGetChangedData1.newData[0].filteredData[0].date).toBe(monthAgo);
    expect(useGetChangedData1.newData[0].title).toBe('Last 30 Days');
    expect(useGetChangedData1.newData[1].title).toBe('2022');
    expect(useGetChangedData1.amountOfCards).toStrictEqual([1, 2]);
  });
  it("should return 'Today and Yesterday'", () => {
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    mockData[0].date = today;
    mockData[1].date = yesterday;
    const { result } = renderHook(() =>
      useGetChangedData({
        data: mockData,
      })
    );
    const useGetChangedData1 = result.current;

    expect(useGetChangedData1.newData[0].filteredData[0].date).toBe(today);
    expect(useGetChangedData1.newData[0].title).toBe('Today');
    expect(useGetChangedData1.newData[1].title).toBe('Yesterday');
    expect(useGetChangedData1.amountOfCards).toStrictEqual([1, 1]);
  });
});
