import { renderHook } from '@testing-library/react-native';
import { MockCardItem } from 'app/mocks';

import { useSearchLogic } from 'app/screens/Notes/screens/NoteScreen/components/Search/hooks/useSearchLogic';

describe('Test useSearchLogic', () => {
  const mockData = [MockCardItem];

  it('case 1  with text = "" should works correct', () => {
    const useSearchLogic0 = renderHook(() =>
      useSearchLogic({ data: mockData, text: '' })
    );
    expect(useSearchLogic0.result.current.dataAfterSearch).toStrictEqual(
      mockData
    );
  });
  it('case 2 with text[0]= title[0] should works correct', () => {
    const useSearchLogic1 = renderHook(() =>
      useSearchLogic({ data: mockData, text: 'M' })
    );
    expect(useSearchLogic1.result.current.dataAfterSearch).toStrictEqual(
      mockData
    );
  });
  it('case 3 with  text[0] != title[0] should works correct', () => {
    const useSearchLogic2 = renderHook(() =>
      useSearchLogic({ data: mockData, text: 'C' })
    );
    expect(useSearchLogic2.result.current.dataAfterSearch).toStrictEqual([]);
  });
});
