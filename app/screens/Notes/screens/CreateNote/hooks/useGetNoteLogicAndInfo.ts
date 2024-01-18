import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { useAppDispatch } from 'app/redux/hooks';
import { updateNote } from 'app/redux/notes/slice';
import { NotesStackScreenName } from 'app/types';

import { MainNotesParamList } from 'app/navigation/app/Notes.navigator';
import { usePrepareObjectForSendToServer } from 'app/screens/Notes/screens/CreateNote/hooks/usePrepareObjectForSendToServer';

export interface UsePrepareObjectForSendToServerI {
  route: RouteProp<MainNotesParamList, NotesStackScreenName.CREATE_NOTE>;
  user: string | null;
  setText: (e: string) => void;
  text: string;
}
export const useGetNoteLogicAndInfo = ({
  route,
  user,
  setText,
  text,
}: UsePrepareObjectForSendToServerI) => {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState('');
  const dataForSend = usePrepareObjectForSendToServer({ note: text, key });
  useEffect(() => {
    if (route?.params) {
      setText(route?.params.note);
      setKey(route?.params.key);
    }
  }, [route?.params]); // eslint-disable-line react-hooks/exhaustive-deps
  const onPress = () => {
    dispatch(
      updateNote({
        ...dataForSend,
        user: user ? user : '',
      })
    );
    setKey(dataForSend.key);
  };
  return { onPress, dataForSend };
};
