import { act, renderHook } from '@testing-library/react-native';
import moment from 'moment/moment';

import { useGetNoteLogicAndInfo } from 'app/screens/Notes/screens/CreateNote/hooks/useGetNoteLogicAndInfo';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});
describe('Use Get Note Logic And Info', () => {
  let mockRoute = {
    params: {
      note: 'MockNote',
      key: 'MockKey',
    },
  };
  let mockUser = 'User';
  let mockText = 'MockText';
  const mockSetText = jest.fn();
  const dateMock = moment().format('YYYY-MM-DD');

  it('Should correct works', async () => {
    const mockPayload = {
      payload: {
        date: dateMock,
        key: 'MockKey',
        note: mockText,
        subTitle: '',
        title: mockText,
        user: mockUser,
      },
      type: 'notes/updateNote',
    };
    const { result } = renderHook(() =>
      useGetNoteLogicAndInfo({
        // @ts-ignore
        route: mockRoute,
        user: mockUser,
        setText: mockSetText,
        text: mockText,
      })
    );
    const { onPress } = result.current;
    act(() => onPress());
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockSetText).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockPayload);
    expect(mockSetText).toHaveBeenCalledWith('MockNote');
  });
  it('Should correct works with another props', async () => {
    const mockPayload = {
      payload: {
        date: dateMock,
        key: 'MockKey',
        note: mockText,
        subTitle: '',
        title: mockText,
        user: mockUser,
      },
      type: 'notes/updateNote',
    };
    const { result } = renderHook(() =>
      useGetNoteLogicAndInfo({
        // @ts-ignore
        route: {},
        user: null,
        setText: mockSetText,
        text: mockText,
      })
    );
    const { onPress } = result.current;
    act(() => onPress());
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockSetText).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockPayload);
    expect(mockSetText).toHaveBeenCalledWith('MockNote');
  });
});
