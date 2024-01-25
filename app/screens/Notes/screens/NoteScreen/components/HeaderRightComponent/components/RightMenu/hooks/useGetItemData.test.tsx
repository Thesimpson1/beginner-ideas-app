import { render, renderHook } from '@testing-library/react-native';

import { useGetItemData } from 'app/screens/Notes/screens/NoteScreen/components/HeaderRightComponent/components/RightMenu/hooks/useGetItemData';
import { MenuDataTypes } from 'app/screens/Notes/types';
jest.mock('react-native-reanimated', () => {
  const actualNav = jest.requireActual('react-native-reanimated');
  return {
    ...actualNav,
  };
});

describe('Test useGetItemData', () => {
  it('should works correct with index = 0', () => {
    const { result } = renderHook(() =>
      useGetItemData({
        index: 0,
      })
    );
    const useGetItemData1 = result.current;

    expect(useGetItemData1.itemData).toStrictEqual([]);
  });
  it('should works correct with index = 1', () => {
    const { result } = renderHook(() =>
      useGetItemData({
        index: 1,
      })
    );
    const useGetItemData1 = result.current;

    expect(useGetItemData1.itemData[0].title).toBe('Sort');
    expect(useGetItemData1.itemData[0].type).toBe(MenuDataTypes.SORT_ITEM_DATA);
    expect(useGetItemData1.itemData[0].Icon).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(useGetItemData1.itemData[0].Icon());
    const SortVerticalIconTestID = getByTestId('SortVerticalIconTestID');
    expect(SortVerticalIconTestID).toBeTruthy();
  });
  it('should works correct with index = 2', () => {
    const { result } = renderHook(() =>
      useGetItemData({
        index: 2,
      })
    );
    const useGetItemData1 = result.current;

    expect(useGetItemData1.itemData[0].title).toBe('Date sort');
    expect(useGetItemData1.itemData[0].Icon).toBeTruthy();
    // @ts-ignore
    const { getByTestId } = render(useGetItemData1.itemData[0].Icon());
    const NotesCalendarIconTestID = getByTestId('NotesCalendarIconTestID');
    expect(NotesCalendarIconTestID).toBeTruthy();
    expect(useGetItemData1.itemData[0].type).toBe(
      MenuDataTypes.DATE_SORT_ITEM_DATA
    );
  });
});
