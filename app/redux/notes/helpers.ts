import { PushNoteActionPayloadI } from 'app/redux/notes/slice';
import moment from 'moment';

interface CreateValidObjectForDisplayI {
  data: PushNoteActionPayloadI;
}

export const createValidObjectForDisplay = ({
  data,
}: CreateValidObjectForDisplayI) => {
  const notes = Object.values(data);
  const notesKeys = Object.keys(data);

  const filteredNotes = notes
    .map((item, index) => {
      return { ...item, key: notesKeys[index] };
    })
    .sort((a, b) => {
      return +moment(a.key) - +moment(b.key);
    });
  return filteredNotes;
};
