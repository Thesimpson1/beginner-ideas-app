import { PushNoteActionPayloadI } from 'app/redux/notes/slice';

interface CreateValidObjectForDisplayI {
  data: PushNoteActionPayloadI;
}

export const createValidObjectForDisplay = ({
  data,
}: CreateValidObjectForDisplayI) => {
  const notes = Object.values(data).reverse();
  const notesKeys = Object.keys(data).reverse();
  return notes.map((item, index) => {
    return { ...item, key: notesKeys[index] };
  });
};
