import database, { firebase } from '@react-native-firebase/database';
import { PushNoteActionPayloadI } from 'app/redux/notes/slice';

interface CreateReferencePropsI {
  user: string;
}
interface PushNotePropsI extends CreateReferencePropsI {
  note: string;
}
interface UpdateNotePropsI extends PushNotePropsI {
  key: string;
}
interface DeleteNotePropsI extends CreateReferencePropsI {
  key: string;
}
export const createReference = ({ user }: CreateReferencePropsI) =>
  firebase
    .app()
    .database('https://beginner-ideas-app-default-rtdb.firebaseio.com')
    .ref(`/${user}/notes`);

export const readNotes = ({ user }: CreateReferencePropsI) =>
  database()
    .ref(`/${user}/notes`)
    .once('value')
    .then((snapshot) => {
      // console.log('User data: ', snapshot.val());
      return snapshot.val();
    });
export const pushNote = ({
  user,
  note,
  title,
  subTitle,
  date,
}: PushNoteActionPayloadI) =>
  database()
    .ref(`/${user}/notes`)
    .push()
    .set({
      note,
      title,
      subTitle,
      date,
    })
    .then(() => console.log('Data pushed.'));
export const updateNote = ({ user, note, key }: UpdateNotePropsI) =>
  database()
    .ref(`/${user}/notes/${key}`)
    .update({
      note,
    })
    .then(() => console.log('Data updated.'));

export const deleteNote = ({ user, key }: DeleteNotePropsI) =>
  database().ref(`/${user}/notes/${key}`).remove();
