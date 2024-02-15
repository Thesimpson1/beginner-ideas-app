import { setIsChangeTitle } from 'app/screens/Notes/screens/NoteScreen/components/NoteCard/utils/utils';

jest.mock(
  'app/screens/Notes/screens/NoteScreen/components/NoteCard/utils/utils',
  () => {
    const originalModule = jest.requireActual(
      'app/screens/Notes/screens/NoteScreen/components/NoteCard/utils/utils'
    );

    return {
      __esModule: true,
      ...originalModule,
    };
  }
);

describe('NoteCard utils', () => {
  it('setIsChangeTitle should work correct', () => {
    //have to be falsy result
    const functionResult0 = setIsChangeTitle({ text: '', index: -2, item: '' });
    expect(functionResult0).toBeFalsy();
    //have to be truthy result
    const functionResult1 = setIsChangeTitle({
      text: 't',
      index: 0,
      item: 't',
    });
    expect(functionResult1).toBe(true);
    //have to be falsy result
    const functionResult2 = setIsChangeTitle({ text: 't', index: 0, item: '' });
    expect(functionResult2).toBeFalsy();
    //have to be falsy result
    const functionResult3 = setIsChangeTitle({
      text: 'tt',
      index: 0,
      item: 'a',
    });
    expect(functionResult3).toBeFalsy();
    //have to be truthy result
    const functionResult4 = setIsChangeTitle({
      text: 'tt',
      index: 0,
      item: 't',
    });
    expect(functionResult4).toBe(true);
    //have to be falsy result
    const functionResult5 = setIsChangeTitle({ text: '', index: 0, item: '' });
    expect(functionResult5).toBeFalsy();
  });
});
