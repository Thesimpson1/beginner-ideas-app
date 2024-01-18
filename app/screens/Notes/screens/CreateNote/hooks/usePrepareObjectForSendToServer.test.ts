import { renderHook } from '@testing-library/react-native';
import moment from 'moment/moment';

import { usePrepareObjectForSendToServer } from 'app/screens/Notes/screens/CreateNote/hooks/usePrepareObjectForSendToServer';

describe('Use Prepare Object For Send To Server', () => {
  let mockNote = '';
  let mockKey = '';
  const dateMock = moment().format('YYYY-MM-DD');
  it('Should correct create object for send to server when note and key = ""', async () => {
    const { result } = renderHook(() =>
      usePrepareObjectForSendToServer({ note: mockNote, key: mockKey })
    );
    const { date, note, title, subTitle, key } = result.current;

    expect(date).toBe(dateMock);
    expect(note).toBe(mockNote);
    expect(title).toBe('');
    expect(subTitle).toBe('');
    expect(key).toBe(moment().toString());
  });
  it('Should correct create object for send to server when note fit on one row', async () => {
    mockNote = 'Hello mock';
    const { result } = renderHook(() =>
      usePrepareObjectForSendToServer({ note: mockNote, key: mockKey })
    );
    const { date, note, title, subTitle, key } = result.current;

    expect(date).toBe(dateMock);
    expect(note).toBe(mockNote);
    expect(title).toBe('Hello mock');
    expect(subTitle).toBe('');
    expect(key).toBe(moment().toString());
  });
  it('Should correct create object for send to server when note fit on 2 rows', async () => {
    mockNote = `Hello mock
    Hello subtitle`;
    const { result } = renderHook(() =>
      usePrepareObjectForSendToServer({ note: mockNote, key: mockKey })
    );
    const { date, note, title, subTitle, key } = result.current;

    expect(date).toBe(dateMock);
    expect(note).toBe(mockNote);
    expect(title).toBe('Hello mock');
    expect(subTitle).toBe('    Hello subtitle');
    expect(key).toBe(moment().toString());
  });
  it('Should correct create object for send to server when note fit on 3 rows and key was passed by props', async () => {
    mockNote = `Hello mock
    Hello subtitle
    ssssss
    fvgfvg
    `;
    mockKey = 'SomeMockKey';
    const { result } = renderHook(() =>
      usePrepareObjectForSendToServer({ note: mockNote, key: mockKey })
    );
    const { note, title, subTitle, key } = result.current;

    expect(note).toBe(mockNote);
    expect(title).toBe('Hello mock');
    expect(subTitle).toBe('    Hello subtitle');
    expect(key).toBe(mockKey);
  });
});
