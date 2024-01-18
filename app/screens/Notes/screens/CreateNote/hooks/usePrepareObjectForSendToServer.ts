import moment from 'moment';

interface UsePrepareObjectForSendToServerI {
  note: string;
  key: string;
}
export interface DataForSendI {
  date: string;
  title: string;
  subTitle: string;
  note: string;
  key: string;
}
export const usePrepareObjectForSendToServer = ({
  note,
  key,
}: UsePrepareObjectForSendToServerI): DataForSendI => {
  const date = moment().format('YYYY-MM-DD');

  let title = '';
  let subTitle = '';
  let currentKey = '';
  if (note) {
    note.split('\n').forEach((item) => {
      if (title && subTitle) {
        return;
      } else {
        if (!title) {
          title = item;
          return;
        }
        if (!subTitle) {
          subTitle = item;
          return;
        }
      }
    });
  }
  if (key) {
    currentKey = key;
  } else {
    currentKey = moment().toString();
  }
  return { date, note, title, subTitle, key: currentKey };
};
