import { PushNoteActionPayloadI } from 'app/redux/notes/slice';
import moment from 'moment';

import { CardItemI } from 'app/screens/Notes/types';

export interface CreateValidObjectForDisplayI {
  data?: { [key: string]: PushNoteActionPayloadI };
}
export const createValidObjectForDisplay = ({
  data,
}: CreateValidObjectForDisplayI) => {
  let filteredNotes: Array<CardItemI> = [];

  if (data) {
    const notes = Object.values(data);
    const notesKeys = Object.keys(data);

    filteredNotes = notes
      .map((item, index) => {
        return { ...item, key: notesKeys[index] };
      })
      .sort((a, b) => {
        return +moment(new Date(a.key)) - +moment(new Date(b.key));
      })
      .reverse();
  }
  return filteredNotes;
};
