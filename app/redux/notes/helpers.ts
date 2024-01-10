import { PushNoteActionPayloadI } from 'app/redux/notes/slice';
import moment from 'moment';

interface CreateValidObjectForDisplayI {
  data: PushNoteActionPayloadI;
}

export const createValidObjectForDisplay = ({
  data,
}: CreateValidObjectForDisplayI) => {
  let filteredNotes = [];

  if (data) {
    const notes = Object.values(data);
    const notesKeys = Object.keys(data);

    filteredNotes = notes
      .map((item, index) => {
        return { ...item, key: notesKeys[index] };
      })
      .sort((a, b) => {
        return +moment(new Date(a.key)) - +moment(new Date(b.key));
      });
  }

  return filteredNotes;
};
